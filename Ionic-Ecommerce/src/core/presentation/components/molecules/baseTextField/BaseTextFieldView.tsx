import { useId } from 'react';
import { BaseInputView } from '../../atoms/baseInput/BaseInputView';
import { BaseTextareaView } from '../../atoms/baseTextarea/BaseTextareaView';
import { FieldLabelView } from '../../atoms/fieldLabel/FieldLabelView';
import './BaseTextFieldView.css';

type BaseTextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  multiline?: boolean;
  rows?: number;
};

export function BaseTextFieldView({
  label,
  value,
  onChange,
  className,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 4,
}: BaseTextFieldProps) {
  const labelId = useId();
  const inputId = useId();
  const wrapperClassName = className ? `base-text-field ${className}` : 'base-text-field';

  return (
    <div className={wrapperClassName}>
      <FieldLabelView id={labelId} htmlFor={inputId}>{label}</FieldLabelView>
      {multiline ? (
        <BaseTextareaView
          inputId={inputId}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ariaLabelledBy={labelId}
        />
      ) : (
        <BaseInputView
          inputId={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ariaLabelledBy={labelId}
        />
      )}
    </div>
  );
}
