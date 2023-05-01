type ButtonProps = {
  type?: 'button' | 'submit';
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  extraClasses?: string;
};

export function Button(props: ButtonProps) {
  const { type = 'button', label, disabled, onClick, extraClasses } = props;

  return (
    <button
      disabled={disabled}
      type={type}
      className={`bg-green-700 py-2 px-4 rounded w-full mt-2 text-yellow-300 ${
        disabled ? `opacity-50` : ``
      } ${extraClasses ?? ''}`}
      {...{ onClick }}
    >
      {label}
    </button>
  );
}
