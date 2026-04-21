import { useEffect, useState } from 'react';
import type { StorefrontContentModel } from '../../domain/entities/StorefrontContentModel';
import { mockStorefrontRepository } from '../../data/repositories/mockStorefrontRepository';
import { getStorefrontUseCase } from '../../domain/useCases/getStorefrontUseCase';

type UseStorefrontState = {
  storefrontContent: StorefrontContentModel | null;
  isLoading: boolean;
  errorMessage: string | null;
  selectedCategoryId: string | null;
};

const initialState: UseStorefrontState = {
  storefrontContent: null,
  isLoading: true,
  errorMessage: null,
  selectedCategoryId: null,
};

export function useStorefront() {
  const [state, setState] = useState<UseStorefrontState>(initialState);

  useEffect(() => {
    let isMounted = true;

    const loadStorefront = async () => {
      try {
        const storefrontContent = await getStorefrontUseCase(mockStorefrontRepository);

        if (!isMounted) {
          return;
        }

        setState({
          storefrontContent,
          isLoading: false,
          errorMessage: null,
          selectedCategoryId: null,
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setState({
          storefrontContent: null,
          isLoading: false,
          errorMessage: 'No pudimos cargar el catalogo en este momento.',
          selectedCategoryId: null,
        });
      }
    };

    void loadStorefront();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectCategory = (categoryId: string | null) => {
    setState((currentState) => ({
      ...currentState,
      selectedCategoryId: currentState.selectedCategoryId === categoryId ? null : categoryId,
    }));
  };

  return {
    storefrontContent: state.storefrontContent,
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
    selectedCategoryId: state.selectedCategoryId,
    selectCategory,
  };
}
