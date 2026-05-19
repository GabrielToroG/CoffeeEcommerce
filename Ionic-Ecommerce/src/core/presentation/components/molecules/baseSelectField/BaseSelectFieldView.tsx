import { useId } from 'react';
import { BaseSelectView, type BaseSelectViewOption } from '../../atoms/baseSelect/BaseSelectView';
import { FieldLabelView } from '../../atoms/fieldLabel/FieldLabelView';
import './BaseSelectFieldView.css';

type BaseSelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: BaseSelectViewOption[];
};

export function BaseSelectFieldView({
  label,
  value,
  onChange,
  options,
}: BaseSelectFieldProps) {
  const labelId = useId();
  const inputId = useId();

  return (
    <div className="base-select-field">
      <FieldLabelView id={labelId} htmlFor={inputId}>{label}</FieldLabelView>
      <BaseSelectView
        inputId={inputId}
        value={value}
        onChange={onChange}
        options={options}
        ariaLabelledBy={labelId}
      />
    </div>
  );
}
