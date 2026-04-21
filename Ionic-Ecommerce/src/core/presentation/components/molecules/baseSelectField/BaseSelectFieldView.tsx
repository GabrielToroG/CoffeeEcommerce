import { BaseSelectView, type BaseSelectViewOption } from '../../atoms/baseSelect/BaseSelectView';
import { FieldLabelView } from '../../atoms/fieldLabel/FieldLabelView';
import './BaseSelectFieldView.css';

type BaseSelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: BaseSelectViewOption[];
};

export function BaseSelectFieldView({
  label,
  value,
  onChange,
  options,
}: BaseSelectFieldProps) {
  return (
    <label className="base-select-field">
      <FieldLabelView>{label}</FieldLabelView>
      <BaseSelectView value={value} onChange={onChange} options={options} />
    </label>
  );
}
