import Image, { StaticImageData } from "next/image";
import { BsFillStarFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa6";

type FeatureCardProps = {
  profileImage: StaticImageData;
  reviewText: string;
  reviewerName: string;
  profession: string;
};

const CommentCard = ({
  profileImage,
  reviewText,
  reviewerName,
  profession,
}: FeatureCardProps) => {
  return (
    <div className="relative flex flex-col gap-4 p-5 rounded-lg bg-white shadow-md border-b-8 border-primary w-full odd:translate-y-10 ">

      {/* stars div */}
      <div className="flex items-center gap-2">
        <BsFillStarFill fill="#f9ca24" />
        <BsFillStarFill fill="#f9ca24" />
        <BsFillStarFill fill="#f9ca24" />
        <BsFillStarFill fill="#f9ca24" />
        <BsFillStarFill fill="#f9ca24" />
      </div>

      <p>&quot;{reviewText}&quot;</p>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Image
            src={profileImage}
            alt="Profile photo" 
            className="rounded-full mx-auto w-[55px] h-[55px] border-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h5 className="text-sm font-bold">{reviewerName}</h5>
          <span className="text-secondary text-sm">{profession}</span>
        </div>
      </div>

      {/* absolute icon */}
      <FaQuoteLeft className="absolute bottom-6 left-6 opacity-5" size={50} />
    </div>
  );
};

export default CommentCard;
