import { IonInput } from '@ionic/react';
import './BaseInputView.css';

type BaseInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
};

export function BaseInputView({
  value,
  onChange,
  placeholder,
  type = 'text',
}: BaseInputProps) {
  return (
    <IonInput
      className="base-input"
      type={type}
      value={value}
      onIonInput={(event) => onChange(String(event.detail.value ?? ''))}
      placeholder={placeholder}
    />
  );
}
