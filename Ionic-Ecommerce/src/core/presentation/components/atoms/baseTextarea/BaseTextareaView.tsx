import { IonTextarea } from '@ionic/react';
import './BaseTextareaView.css';

type BaseTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

export function BaseTextareaView({
  value,
  onChange,
  placeholder,
  rows = 4,
}: BaseTextareaProps) {
  return (
    <IonTextarea
      className="base-textarea"
      rows={rows}
      value={value}
      onIonInput={(event) => onChange(String(event.detail.value ?? ''))}
      placeholder={placeholder}
    />
  );
}
