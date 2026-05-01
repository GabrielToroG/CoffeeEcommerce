import { IonCheckbox } from '@ionic/react';
import './BaseCheckboxView.css';

type BaseCheckboxViewProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function BaseCheckboxView({
  checked,
  onChange,
  disabled = false,
}: BaseCheckboxViewProps) {
  return (
    <IonCheckbox
      className="base-checkbox"
      checked={checked}
      onIonChange={(event) => onChange(event.detail.checked)}
      disabled={disabled}
    />
  );
}
