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
    <textarea
      className="base-textarea"
      rows={rows}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}
