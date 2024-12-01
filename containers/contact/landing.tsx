import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import { PiShootingStarThin } from "react-icons/pi";
import { RefObject } from "react";

// Correct type for props
type LandingProps = {
  contactFormRef: RefObject<HTMLDivElement>; // RefObject type from React
};

const Landing = ({ contactFormRef }: LandingProps) => {
  const scrollIntoView = () => {
    if (contactFormRef.current) {
      const yOffset = -150; // Adjust offset as needed
      const yPosition =
        contactFormRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-start w-full min-h-[90vh] mt-[70px] bg-contact bg-cover bg-bottom before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0000009a] bg-fixed">
      <div className="flex flex-col gap-4 abs-center p-4 py-6 rounded-3xl backdrop-blur- w-full md:w-8/12 lg:w-6/12">
        <Heading
          title=""
          highLightText="انضمّ إلينا الآن!"
          highlightColor="before:bg-blue"
          details="نحن في زاد نرحب بجميع استفساراتكم وآرائكم ونسعى للتواصل معكم لدعم أفكاركم ومشاريعكم. لا تترددوا في التواصل معنا عبر النموذج أدناه أو من خلال وسائل الاتصال المتاحة. نحن هنا لنستمع إليكم ونعمل معًا لتحقيق الإبداع والابتكار."
          className="text-white w-fit"
          additionalStyles="mx-auto"
          detailsStyles="mt-6 mx-auto text-center w-fit w-8/12"
        />
        <div className="w-8/12 mx-auto">
          <Button
            title="انضم الآن"
            icon={<PiShootingStarThin size={22} />}
            className="bg-blue"
            onClick={scrollIntoView}
            hasShiningBar={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
