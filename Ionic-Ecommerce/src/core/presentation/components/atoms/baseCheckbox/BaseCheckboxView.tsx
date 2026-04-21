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
    <input
      className="base-checkbox"
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      disabled={disabled}
    />
  );
}
