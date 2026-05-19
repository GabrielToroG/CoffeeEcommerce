import { useState } from 'react';
import type { AccountUseCasesProtocol } from '../../domain/useCases/protocols/accountUseCasesProtocol';

export function createUseAccountAddresses(useCases: AccountUseCasesProtocol) {
  return function useAccountAddresses() {
    const [label, setLabel] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [setAsDefault, setSetAsDefault] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const session = useCases.getLocalAccountSessionUseCase();
    const { isSubmitting, errorMessage } = useCases.getLocalAccountSubmissionStateUseCase();

    const submitAddress = async () => {
      const wasAdded = await useCases.postLocalAccountAddressUseCase(
        label,
        fullAddress,
        setAsDefault,
      );

      if (!wasAdded) {
        setSuccessMessage(null);
        return false;
      }

      setLabel('');
      setFullAddress('');
      setSetAsDefault(false);
      setSuccessMessage('Direccion agregada a tu cuenta.');
      return true;
    };

    const markAsDefault = async (addressId: string) => {
      const wasUpdated = await useCases.patchLocalDefaultAccountAddressUseCase(addressId);

      if (!wasUpdated) {
        setSuccessMessage(null);
        return false;
      }

      setSuccessMessage('Direccion predeterminada actualizada.');
      return true;
    };

    return {
      session,
      label,
      fullAddress,
      setAsDefault,
      successMessage,
      isSubmitting,
      errorMessage,
      setLabel,
      setFullAddress,
      setSetAsDefault,
      submitAddress,
      markAsDefault,
    };
  };
}
