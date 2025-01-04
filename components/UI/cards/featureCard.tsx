import Image, { StaticImageData } from "next/image";

type FeatureCardProps = {
  icon: StaticImageData;
  title: string;
};

const FeatureCard = ({ icon, title }: FeatureCardProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 p-6 py-10 rounded-lg border border-light bg-white">
      <Image src={icon} className="w-20 h-20" alt={title} unoptimized priority={true} />
      <p className="text-center text-lg">{title}</p>
    </div>
  );
};

export default FeatureCard;
