import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  title: string;
  additionalStyles?: string;
  icon?: JSX.Element;
  loading?: boolean;
} & React.ComponentProps<"button">;

const Button = ({
  title,
  icon,
  additionalStyles = "",
  loading,
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      title={title}
      className={`relative uppercase text-white w-full py-[10px] outline-none flex justify-center gap-3 items-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition shadow-sm rounded-md border-transparent border-[1px] hover:border-[1px] duration-500 ${additionalStyles} ${className}`}
    >
      <span className="flex flex-row gap-2 items-center font-secondary">
        {title}
        {loading ? (
          <AiOutlineLoading3Quarters size={20} className="animate-spin" />
        ) : (
          icon
        )}
      </span>
    </button>
  );
};

export default Button;
