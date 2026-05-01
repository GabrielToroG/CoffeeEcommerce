import { useEffect, useState } from 'react';
import { remoteAdminCatalogRepository } from '../../data/repositories/remoteAdminCatalogRepository';
import type { AdminCatalogOptionsModel } from '../../domain/entities/AdminCatalogOptionsModel';
import type { AdminProductModel } from '../../domain/entities/AdminProductModel';
import { createAdminProductUseCase } from '../../domain/useCases/createAdminProductUseCase';
import { deleteAdminProductUseCase } from '../../domain/useCases/deleteAdminProductUseCase';
import { getAdminCatalogOptionsUseCase } from '../../domain/useCases/getAdminCatalogOptionsUseCase';
import { getAdminProductsUseCase } from '../../domain/useCases/getAdminProductsUseCase';
import { updateAdminProductUseCase } from '../../domain/useCases/updateAdminProductUseCase';

type AdminProductFormState = {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  badge: string;
  imageUrl: string;
  categoryId: string;
  rating: string;
  collectionIds: string[];
};

const initialProductFormState: AdminProductFormState = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  badge: '',
  imageUrl: '',
  categoryId: '',
  rating: '',
  collectionIds: [],
};

function mapProductToForm(product: AdminProductModel): AdminProductFormState {
  return {
    name: product.name,
    description: product.description,
    price: String(product.price),
    originalPrice: product.originalPrice ? String(product.originalPrice) : '',
    badge: product.badge ?? '',
    imageUrl: product.imageUrl,
    categoryId: product.categoryId,
    rating: String(product.rating),
    collectionIds: product.collectionIds,
  };
}

function validateProductForm(productForm: AdminProductFormState) {
  const price = Number(productForm.price);
  const originalPrice = productForm.originalPrice ? Number(productForm.originalPrice) : undefined;
  const rating = Number(productForm.rating);

  if (!Number.isFinite(price) || price <= 0) {
    return 'El precio debe ser mayor a cero.';
  }

  if (!Number.isFinite(rating) || rating <= 0 || rating > 5) {
    return 'El rating debe estar entre 0.1 y 5.';
  }

  if (originalPrice !== undefined && (!Number.isFinite(originalPrice) || originalPrice <= price)) {
    return 'El precio original debe ser mayor al precio actual.';
  }

  return null;
}

export function useAdminCatalog() {
  const [catalogOptions, setCatalogOptions] = useState<AdminCatalogOptionsModel>({
    categories: [],
    collections: [],
  });
  const [products, setProducts] = useState<AdminProductModel[]>([]);
  const [productForm, setProductForm] = useState<AdminProductFormState>(initialProductFormState);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAdminCatalog = async () => {
      try {
        const [options, loadedProducts] = await Promise.all([
          getAdminCatalogOptionsUseCase(remoteAdminCatalogRepository),
          getAdminProductsUseCase(remoteAdminCatalogRepository),
        ]);

        if (!isMounted) {
          return;
        }

        setCatalogOptions(options);
        setProducts(loadedProducts);
        setProductForm((currentForm) => ({
          ...currentForm,
          categoryId: currentForm.categoryId || options.categories[0]?.id || '',
        }));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'No fue posible cargar la administracion.',
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadAdminCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const editingProduct = products.find((product) => product.id === selectedProductId) ?? null;

  const resetForm = (clearFeedback = true) => {
    setSelectedProductId(null);
    setProductForm({
      ...initialProductFormState,
      categoryId: catalogOptions.categories[0]?.id ?? '',
    });

    if (clearFeedback) {
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  };

  const updateField = (field: string, value: string) => {
    setProductForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const toggleCollection = (collectionId: string) => {
    setProductForm((currentForm) => {
      const isSelected = currentForm.collectionIds.includes(collectionId);

      return {
        ...currentForm,
        collectionIds: isSelected
          ? currentForm.collectionIds.filter((currentCollectionId) => currentCollectionId !== collectionId)
          : [...currentForm.collectionIds, collectionId],
      };
    });
  };

  const editProduct = (productId: string) => {
    const product = products.find((currentProduct) => currentProduct.id === productId);

    if (!product) {
      return;
    }

    setSelectedProductId(productId);
    setProductForm(mapProductToForm(product));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const submitProduct = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const currentEditingProductName = editingProduct?.name;
      const validationMessage = validateProductForm(productForm);

      if (validationMessage) {
        setErrorMessage(validationMessage);
        return;
      }

      const productPayload = {
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        badge: productForm.badge.trim() || undefined,
        imageUrl: productForm.imageUrl.trim(),
        categoryId: productForm.categoryId,
        rating: Number(productForm.rating),
        collectionIds: productForm.collectionIds,
      };

      const savedProduct = selectedProductId
        ? await updateAdminProductUseCase(
            remoteAdminCatalogRepository,
            selectedProductId,
            productPayload,
          )
        : await createAdminProductUseCase(remoteAdminCatalogRepository, productPayload);

      setProducts((currentProducts) => {
        const otherProducts = currentProducts.filter((product) => product.id !== savedProduct.id);
        return [...otherProducts, savedProduct].sort((leftProduct, rightProduct) =>
          leftProduct.name.localeCompare(rightProduct.name),
        );
      });

      setSuccessMessage(
        selectedProductId
          ? `Se actualizo "${savedProduct.name || currentEditingProductName || 'el producto'}" en el catalogo.`
          : `Se agrego "${savedProduct.name}" al catalogo.`,
      );
      resetForm(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible guardar el producto.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const removedProductName =
        products.find((product) => product.id === productId)?.name ?? 'el producto';
      await deleteAdminProductUseCase(remoteAdminCatalogRepository, productId);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId),
      );

      if (selectedProductId === productId) {
        resetForm();
      }

      setSuccessMessage(`Se elimino "${removedProductName}" del catalogo.`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible eliminar el producto.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    categories: catalogOptions.categories,
    collections: catalogOptions.collections,
    products,
    productForm,
    selectedProductId,
    editingProduct,
    isLoading,
    isSubmitting,
    errorMessage,
    successMessage,
    updateField,
    toggleCollection,
    editProduct,
    submitProduct,
    removeProduct,
    resetForm,
  };
}
