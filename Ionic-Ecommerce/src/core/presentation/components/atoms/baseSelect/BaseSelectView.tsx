import { IonSelect, IonSelectOption } from '@ionic/react';
import './BaseSelectView.css';

export type BaseSelectViewOption = {
  value: string;
  label: string;
};

type BaseSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: BaseSelectViewOption[];
  ariaLabelledBy?: string;
};

export function BaseSelectView({
  value,
  onChange,
  options,
  ariaLabelledBy,
}: BaseSelectProps) {
  return (
    <IonSelect
      className="base-select"
      value={value}
      interface="popover"
      onIonChange={(event) => onChange(String(event.detail.value ?? ''))}
      aria-labelledby={ariaLabelledBy}
    >
      {options.map((option) => (
        <IonSelectOption key={option.value} value={option.value}>
          {option.label}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
}
