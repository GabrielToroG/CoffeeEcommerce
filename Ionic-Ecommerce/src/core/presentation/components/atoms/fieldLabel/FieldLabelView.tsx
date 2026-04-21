import './FieldLabelView.css';

type FieldLabelProps = {
  children: string;
};

export function FieldLabelView({ children }: FieldLabelProps) {
  return <span className="field-label">{children}</span>;
}
