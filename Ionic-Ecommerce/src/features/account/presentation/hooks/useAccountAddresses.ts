import { useState } from 'react';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';

export function useAccountAddresses() {
  const { session, addAddress, setDefaultAddress, isSubmitting, errorMessage } = useAuth();
  const [label, setLabel] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const submitAddress = async () => {
    const wasAdded = await addAddress({
      label,
      fullAddress,
      setAsDefault,
    });

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
    const wasUpdated = await setDefaultAddress(addressId);

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
}
