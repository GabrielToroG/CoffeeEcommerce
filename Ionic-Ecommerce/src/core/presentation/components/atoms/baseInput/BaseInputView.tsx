import { IonInput } from '@ionic/react';
import './BaseInputView.css';

type BaseInputProps = {
  inputId?: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabelledBy?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
};

export function BaseInputView({
  inputId,
  value,
  onChange,
  ariaLabelledBy,
  placeholder,
  type = 'text',
}: BaseInputProps) {
  return (
    <IonInput
      id={inputId}
      className="base-input"
      type={type}
      value={value}
      onIonInput={(event) => onChange(String(event.detail.value ?? ''))}
      placeholder={placeholder}
      aria-labelledby={ariaLabelledBy}
    />
  );
}
