type HeadingProps = {
    title: string
    additionalStyles?: string
    highLightText?: string
    details?: string
  }
  
  const Heading = ({
    title,
    additionalStyles,
    highLightText,
    details,
  }: HeadingProps) => {
    return (
      <h4
        className={`group relative text-2xl md:text-3xl lg:text-4xl font-semibold duration-500 uppercase text-text_light dark:text-text_dark z-10 ${additionalStyles}  `}
      >
        {title}
        <div
          className={`relative w-fit before:absolute before:right-0 before:h-2/5 before:backdrop:blur-md before:bottom-0 before:rounded-sm before:bg-primary before:w-4/12 group-hover:before:w-8/12 duration-500 before:duration-500 before:-z-10 ${additionalStyles}`}
        >
          {highLightText}
        </div>
        {details ? (
          <p className="text-lg font-normal mt-4 w-full lg:w-8/12">{details}</p>
        ) : null}
      </h4>
    )
  }
  
  export default Heading