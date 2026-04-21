import './BaseSelectView.css';

export type BaseSelectViewOption = {
  value: string;
  label: string;
};

type BaseSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: BaseSelectViewOption[];
};

export function BaseSelectView({
  value,
  onChange,
  options,
}: BaseSelectProps) {
  return (
    <select
      className="base-select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
