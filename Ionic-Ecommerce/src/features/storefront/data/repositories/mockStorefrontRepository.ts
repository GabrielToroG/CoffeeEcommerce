import type { StorefrontApiProductDTO } from '../entities/StorefrontApiProductDTO';
import type { StorefrontContentModel } from '../../domain/entities/StorefrontContentModel';
import type { StorefrontProductModel } from '../../domain/entities/StorefrontProductModel';
import type { StorefrontRepository } from '../../domain/repositories/storefrontRepository';
import type { StorefrontDataSourceProtocol } from '../dataSources/storefrontDataSourceProtocol';

const origins = ['Colombia', 'Brasil', 'Etiopia', 'Kenya', 'Costa Rica', 'Peru'];
const notes = [
  ['Chocolate', 'Avellana', 'Caramelo'],
  ['Frutos rojos', 'Cacao', 'Miel'],
  ['Citricos', 'Florales', 'Te negro'],
  ['Panela', 'Naranja', 'Almendra'],
  ['Vainilla', 'Cuerpo cremoso', 'Nuez'],
  ['Ciruela', 'Cacao intenso', 'Especias'],
];

function getProductIndex(productId: string) {
  return productId
    .split('')
    .reduce((total, character) => total + character.charCodeAt(0), 0);
}

function getBrewMethods(product: StorefrontApiProductDTO) {
  const productText = `${product.id} ${product.name}`.toLowerCase();

  if (
    productText.includes('cold') ||
    productText.includes('iced') ||
    productText.includes('helado') ||
    productText.includes('frio')
  ) {
    return ['Frio'];
  }

  return ['Caliente'];
}

function getGrindType(categoryId: string) {
  if (categoryId === 'prepared-coffee') {
    return 'Listo para tomar';
  }

  if (categoryId === 'whole-bean') {
    return 'Grano entero';
  }

  return 'Cafe molido';
}

function getIntensity(product: StorefrontApiProductDTO, productIndex: number) {
  const productText = `${product.id} ${product.name}`.toLowerCase();

  if (
    productText.includes('americano') ||
    productText.includes('latte') ||
    productText.includes('descafeinado')
  ) {
    return 3;
  }

  if (
    productText.includes('cappuccino') ||
    productText.includes('house') ||
    productText.includes('french')
  ) {
    return 5;
  }

  if (
    productText.includes('espresso') ||
    productText.includes('cold') ||
    productText.includes('kenya')
  ) {
    return 8;
  }

  return 6 + (productIndex % 3);
}

function getCommercialBadges(product: StorefrontApiProductDTO, productIndex: number) {
  return [
    product.badge,
    product.originalPrice && product.originalPrice > product.price ? 'Oferta' : null,
    product.rating >= 4.8 ? 'Mejor valorado' : null,
    product.price >= 19990 ? 'Envio gratis' : null,
    productIndex % 3 === 0 ? 'Recomendado' : null,
  ].filter(Boolean) as string[];
}

function mapProduct(product: StorefrontApiProductDTO): StorefrontProductModel {
  const productIndex = getProductIndex(product.id);
  const noteSet = notes[productIndex % notes.length];
  const price = Math.round(product.price);

  return {
    ...product,
    price,
    originalPrice: product.originalPrice ? Math.round(product.originalPrice) : undefined,
    origin: origins[productIndex % origins.length],
    grindType: getGrindType(product.categoryId),
    roastLevel: productIndex % 3 === 0 ? 'Claro' : productIndex % 3 === 1 ? 'Medio' : 'Oscuro',
    tastingNotes: noteSet,
    brewMethods: getBrewMethods(product),
    intensity: getIntensity(product, productIndex),
    stockLabel: productIndex % 5 === 0 ? 'Ultimas unidades' : 'Disponible',
    commercialBadges: getCommercialBadges(product, productIndex),
    freeShippingEligible: price >= 19990,
  };
}

export function createMockStorefrontRepository(
  dataSource: StorefrontDataSourceProtocol,
): StorefrontRepository {
  return {
    async getStorefrontContent(): Promise<StorefrontContentModel> {
      const response = await dataSource.getStorefrontContent();

      return {
        categories: response.categories,
        collections: response.collections.map((collection) => ({
          ...collection,
          products: collection.products.map(mapProduct),
        })),
      };
    },
  };
}
