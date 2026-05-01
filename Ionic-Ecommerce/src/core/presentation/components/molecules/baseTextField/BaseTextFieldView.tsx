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
  const wrapperClassName = className ? `base-text-field ${className}` : 'base-text-field';

  return (
    <label className={wrapperClassName}>
      <FieldLabelView>{label}</FieldLabelView>
      {multiline ? (
        <BaseTextareaView
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <BaseInputView
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}
