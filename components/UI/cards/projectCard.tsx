import { FaEye, FaGithub } from "react-icons/fa";
import CustomImage from "./CustomImage";
import LinkButton from "../Inputs/LinkButton";
import Tag from "../Typography/Tag";

export type ProjectCardProps = {
  href: string;
  alt: string;
  title: string;
  tags: string[];
  github_link: string;
  live_link: string;
};

const ProjectCard = ({
  href,
  alt,
  title,
  tags,
  github_link,
  live_link,
}: ProjectCardProps) => {
  return (
    <div
      className="group relative flex flex-col border 
     rounded-md shadow-lg full-theme"
    >
      <div className="relative w-full h-[230px] overflow-hidden duration-300 ">
        <CustomImage
          src={href}
          width={1000}
          height={1000}
          alt={alt}
          className="w-auto mx-auto h-full rounded-t-md scale-110 group-hover:scale-125 duration-500"
        />
      </div>

      <div className="flex flex-col gap-4 p-3 background_dark_light dark:background_dark">
        <h2 className="text-lg uppercase font-bold text-text_light dark:text-text_dark">
          {title}
        </h2>

        <div className="flex flex-row gap-1 flex-wrap h-[70px] overflow-auto">
          {tags?.map((elem, index) => {
            return <Tag key={index} title={elem} />;
          })}
        </div>

        <div className="relative w-full flex flex-row mt-2 gap-2">
          <LinkButton
            title="Source code"
            style="w-10/12 rounded-lg"
            icon={<FaGithub size={22} />}
            href={github_link}
            target="_blank"
          />

          <LinkButton
            title=""
            style="w-2/12 rounded-[12px] !bg-transparent border border-primary"
            icon={<FaEye size={22} className="text-primary dark:text-white" />}
            href={live_link}
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;