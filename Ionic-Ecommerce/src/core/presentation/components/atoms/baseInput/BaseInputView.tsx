import './BaseInputView.css';

type BaseInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
};

export function BaseInputView({
  value,
  onChange,
  placeholder,
  type = 'text',
}: BaseInputProps) {
  return (
    <input
      className="base-input"
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}
