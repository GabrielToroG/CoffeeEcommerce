import './FieldLabelView.css';

type FieldLabelProps = {
  children: string;
  id?: string;
};

export function FieldLabelView({ children, id }: FieldLabelProps) {
  return <span id={id} className="field-label">{children}</span>;
}
