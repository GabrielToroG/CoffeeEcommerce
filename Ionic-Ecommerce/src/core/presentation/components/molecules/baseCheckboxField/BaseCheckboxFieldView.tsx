import { useId } from 'react';
import { BaseCheckboxView } from '../../atoms/baseCheckbox/BaseCheckboxView';
import './BaseCheckboxFieldView.css';

type BaseCheckboxFieldViewProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helperText?: string;
  disabled?: boolean;
};

export function BaseCheckboxFieldView({
  label,
  checked,
  onChange,
  helperText,
  disabled = false,
}: BaseCheckboxFieldViewProps) {
  const labelId = useId();

  return (
    <label className="base-checkbox-field">
      <span className="base-checkbox-field__control">
        <BaseCheckboxView
          checked={checked}
          onChange={onChange}
          ariaLabelledBy={labelId}
          disabled={disabled}
        />
      </span>
      <span className="base-checkbox-field__content">
        <strong id={labelId}>{label}</strong>
        {helperText ? <span>{helperText}</span> : null}
      </span>
    </label>
  );
}
