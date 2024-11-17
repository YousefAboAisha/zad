import { IconType } from "react-icons";

type InputProps = {
  placeholder: string;
  additionalStyles?: string;
  icon?: IconType;
  error?: string;
  pattern?: string;
  required?: boolean;
} & React.ComponentProps<"input">;

// eslint-disable-next-line react/display-name
const Input = ({
  placeholder,
  className = "",
  additionalStyles = "",
  icon,
  error,
  pattern,
  required = false,
  ...rest
}: InputProps) => {
  const Icon = icon;

  return (
    <div className={`relative h-[56px] rounded-xl ${className} `}>
      <div className="absolute flex justify-center p-2 rounded-l-md items-center right-1 top-[50%] translate-y-[-50%] h-full border-none outline-none text-grey opacity-70">
        {Icon && <Icon size={24} />}
      </div>

      <input
        {...rest}
        className={`h-full w-full ${
          Icon ? "pr-12" : "px-4"
        } rounded-xl outline-none duration-300 disabled:cursor-not-allowed bg-gray-50 ${
          error ? "border border-[red] animate-shake" : ""
        } ${additionalStyles} ${className}`}
        placeholder={placeholder}
        pattern={pattern}
        required={required}
      />

      {error ? (
        <span className="absolute text-[red] text-[10px] w-fit right-1 top-[52px]">
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
