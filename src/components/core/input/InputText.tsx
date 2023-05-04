type InputTextProps = {
  type?: 'text' | 'password' | 'number' | 'hidden';
  label: string;
  name: string;
  value?: string | number;
  disabled?: boolean;
  hideLabel?: boolean;
  onChange?: (value: string) => void;
  extraContainerClasses?: string;
};

export function InputText(props: InputTextProps) {
  const { type = 'text', name, label } = props;

  return (
    <div className={`flex flex-col mb-1 ${props.extraContainerClasses ?? ''}`}>
      {type !== 'hidden' && !props.hideLabel && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={props.value === 0 ? '' : props.value}
        disabled={props.disabled}
        className="border border-solid border-gray-400 rounded p-2 text-black"
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
        placeholder={label}
      />
    </div>
  );
}
