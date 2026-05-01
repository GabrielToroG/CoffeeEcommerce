import './BaseChipView.css';

type BaseChipViewProps = {
  label: string;
  className?: string;
};

export function BaseChipView({
  label,
  className = '',
}: BaseChipViewProps) {
  return (
    <span className={`base-chip ${className}`.trim()} title={label}>
      {label}
    </span>
  );
}
