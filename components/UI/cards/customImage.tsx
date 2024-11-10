import Image from "next/image";
import { useState } from "react";

type CustomImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  priority?: boolean;
} & React.ComponentProps<"img">;

const CustomImage = ({
  src,
  width,
  height,
  alt,
  className,
  priority = false,
}: CustomImageProps) => {
  const [Img, setImg] = useState(src);

  return (
    <Image
      src={Img}
      width={width}
      height={height}
      alt={alt}
      onError={() => setImg("/notFound.jpg")}
      // loading="lazy"
      className={className}
      priority={priority}
      blurDataURL="https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png"
      placeholder="blur"
    />
  );
};

export default CustomImage;