import { useEffect, useState } from 'react';
import type { StorefrontContentModel } from '../../domain/entities/StorefrontContentModel';
import type { StorefrontUseCasesProtocol } from '../../domain/useCases/protocols/storefrontUseCasesProtocol';

type UseStorefrontState = {
  storefrontContent: StorefrontContentModel | null;
  isLoading: boolean;
  errorMessage: string | null;
  selectedCategoryId: string | null;
  selectedBrewMethod: string | null;
  selectedRoastLevel: string | null;
  selectedIntensityRange: string | null;
};

const initialState: UseStorefrontState = {
  storefrontContent: null,
  isLoading: true,
  errorMessage: null,
  selectedCategoryId: null,
  selectedBrewMethod: null,
  selectedRoastLevel: null,
  selectedIntensityRange: null,
};

export function createUseStorefront(useCases: StorefrontUseCasesProtocol) {
  return function useStorefront() {
    const [state, setState] = useState<UseStorefrontState>(initialState);

    useEffect(() => {
      let isMounted = true;

      const loadStorefront = async () => {
        try {
          const storefrontContent = await useCases.getLocalStorefrontUseCase();

          if (!isMounted) {
            return;
          }

          setState({
            storefrontContent,
            isLoading: false,
            errorMessage: null,
            selectedCategoryId: null,
            selectedBrewMethod: null,
            selectedRoastLevel: null,
            selectedIntensityRange: null,
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
            selectedBrewMethod: null,
            selectedRoastLevel: null,
            selectedIntensityRange: null,
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

    const selectBrewMethod = (brewMethod: string | null) => {
      setState((currentState) => ({
        ...currentState,
        selectedBrewMethod: currentState.selectedBrewMethod === brewMethod ? null : brewMethod,
      }));
    };

    const selectRoastLevel = (roastLevel: string | null) => {
      setState((currentState) => ({
        ...currentState,
        selectedRoastLevel: currentState.selectedRoastLevel === roastLevel ? null : roastLevel,
      }));
    };

    const selectIntensityRange = (intensityRange: string | null) => {
      setState((currentState) => ({
        ...currentState,
        selectedIntensityRange: currentState.selectedIntensityRange === intensityRange ? null : intensityRange,
      }));
    };

    return {
      storefrontContent: state.storefrontContent,
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      selectedCategoryId: state.selectedCategoryId,
      selectedBrewMethod: state.selectedBrewMethod,
      selectedRoastLevel: state.selectedRoastLevel,
      selectedIntensityRange: state.selectedIntensityRange,
      selectCategory,
      selectBrewMethod,
      selectRoastLevel,
      selectIntensityRange,
    };
  };
}
