type HeadingProps = {
  title: string;
  additionalStyles?: string;
  highLightText?: string;
  details?: string;
  detailsStyles?: string;
  highlightColor?: "before:bg-primary" | "before:bg-blue";
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({
  title,
  additionalStyles = "",
  highLightText,
  highlightColor,
  details,
  detailsStyles = "",
  className = "",
  ...rest
}: HeadingProps) => {
  return (
    <h4
      className={`group relative text-3xl md:text-3xl lg:text-4xl font-semibold duration-500 uppercase z-10 ${className}`}
      {...rest}
    >
      {title}
      <div
        className={`relative w-fit before:absolute before:right-0 before:h-2/5 before:backdrop:blur-md before:bottom-0 before:rounded-sm before:w-4/12 group-hover:before:w-8/12 duration-500 before:duration-500 before:-z-10 ${highlightColor} ${additionalStyles}`}
      >
        {highLightText}
      </div>
      {details ? (
        <p
          className={`text-sm font-el_messiri font-light my-3 w-full ${detailsStyles}`}
        >
          &quot; {details} &quot;
        </p>
      ) : null}
    </h4>
  );
};

export default Heading;
