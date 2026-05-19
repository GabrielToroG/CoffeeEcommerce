import { IonCheckbox } from '@ionic/react';
import './BaseCheckboxView.css';

type BaseCheckboxViewProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabelledBy?: string;
  disabled?: boolean;
};

export function BaseCheckboxView({
  checked,
  onChange,
  ariaLabelledBy,
  disabled = false,
}: BaseCheckboxViewProps) {
  return (
    <IonCheckbox
      className="base-checkbox"
      checked={checked}
      onIonChange={(event) => onChange(event.detail.checked)}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
    />
  );
}
