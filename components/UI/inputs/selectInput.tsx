import { MdKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
  title: string;
  options: {
    title: string;
    value: number;
  }[];
  additionalStyles?: string;
  icon?: JSX.Element;
} & React.ComponentProps<"select">;

const Select = ({
  title,
  options,
  additionalStyles = "",
  className = "",
  ...rest
}: SelectProps) => {
  return (
    <div className="relative bg-gray-50 rounded-xl">
      <div className="absolute flex justify-center p-2 items-center right-1 top-[50%] translate-y-[-50%] h-full border-none outline-none">
        <MdKeyboardArrowDown size={20} />
      </div>

      <select
        className={`relative h-[56px] pr-10 rounded-[8px] outline-none duration-300 w-full focus:valid:border-blue focus:border-blue disabled:cursor-not-allowed bg-transparent cursor-pointer bg-gray-50 rounde-2xl ${additionalStyles} ${className}`}
        {...rest}
        name="studylevel"
        aria-label={title}
      >
        <option value="" defaultChecked hidden className="">
          {title}
        </option>

        {options.map(({ title, value }) => (
          <option key={value} className="p-2" value={value} title={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
