import './FieldLabelView.css';

type FieldLabelProps = {
  children: string;
  id?: string;
  htmlFor?: string;
};

export function FieldLabelView({ children, id, htmlFor }: FieldLabelProps) {
  return (
    <label id={id} htmlFor={htmlFor} className="field-label">
      {children}
    </label>
  );
}
