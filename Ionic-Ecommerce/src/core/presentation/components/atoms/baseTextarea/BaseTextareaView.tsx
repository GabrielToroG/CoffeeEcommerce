import { IonTextarea } from '@ionic/react';
import './BaseTextareaView.css';

type BaseTextareaProps = {
  inputId?: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabelledBy?: string;
  placeholder?: string;
  rows?: number;
};

export function BaseTextareaView({
  inputId,
  value,
  onChange,
  ariaLabelledBy,
  placeholder,
  rows = 4,
}: BaseTextareaProps) {
  return (
    <IonTextarea
      id={inputId}
      className="base-textarea"
      rows={rows}
      value={value}
      onIonInput={(event) => onChange(String(event.detail.value ?? ''))}
      placeholder={placeholder}
      aria-labelledby={ariaLabelledBy}
    />
  );
}
