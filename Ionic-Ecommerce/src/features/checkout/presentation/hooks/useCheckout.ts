import { useEffect, useState } from 'react';
import type { AuthAddressModel } from '../../../auth/domain/entities/AuthAddressModel';
import type { AuthUserModel } from '../../../auth/domain/entities/AuthUserModel';
import { localCheckoutRepository } from '../../data/repositories/localCheckoutRepository';
import type { CheckoutFormModel } from '../../domain/entities/CheckoutFormModel';
import { submitCheckoutUseCase } from '../../domain/useCases/submitCheckoutUseCase';

const customAddressOption = 'custom-address';

const initialForm: CheckoutFormModel = {
  customerName: '',
  email: '',
  address: '',
  paymentMethod: 'tarjeta',
};

export function useCheckout(onSuccess: () => void, user: AuthUserModel | null) {
  const [form, setForm] = useState<CheckoutFormModel>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(customAddressOption);

  const savedAddresses = user?.addresses ?? [];

  useEffect(() => {
    if (!user) {
      return;
    }

    const preferredAddress =
      user.addresses.find((address) => address.isDefault) ??
      user.addresses.find((address) => address.fullAddress === user.address) ??
      user.addresses[0] ??
      null;

    setForm((currentForm) => ({
      ...currentForm,
      customerName: currentForm.customerName || user.fullName,
      email: currentForm.email || user.email,
      address: currentForm.address || preferredAddress?.fullAddress || user.address || '',
    }));

    setSelectedAddressId((currentSelectedAddressId) => {
      if (currentSelectedAddressId !== customAddressOption) {
        return currentSelectedAddressId;
      }

      return preferredAddress?.id ?? customAddressOption;
    });
  }, [user]);

  const isFormComplete =
    form.customerName.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.address.trim().length > 0 &&
    form.paymentMethod.trim().length > 0;

  const isUsingCustomAddress =
    savedAddresses.length === 0 || selectedAddressId === customAddressOption;

  const updateField = <Key extends keyof CheckoutFormModel>(
    field: Key,
    value: CheckoutFormModel[Key],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const selectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);

    if (addressId === customAddressOption) {
      setForm((currentForm) => ({
        ...currentForm,
        address: '',
      }));
      return;
    }

    const selectedAddress = savedAddresses.find(
      (address: AuthAddressModel) => address.id === addressId,
    );

    if (!selectedAddress) {
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      address: selectedAddress.fullAddress,
    }));
  };

  const submitOrder = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await submitCheckoutUseCase(localCheckoutRepository, form);

      setIsSuccess(true);
      onSuccess();
      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible completar tu compra.',
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    savedAddresses,
    selectedAddressId,
    isUsingCustomAddress,
    isFormComplete,
    isSubmitting,
    errorMessage,
    isSuccess,
    updateField,
    selectAddress,
    submitOrder,
    customAddressOption,
  };
}
