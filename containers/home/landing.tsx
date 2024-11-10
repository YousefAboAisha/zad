import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { PiShootingStarThin } from "react-icons/pi";
import { LuMouse } from "react-icons/lu";

const Landing = () => {
  return (
    <div className="relative flex flex-col justify-center items-start rounded-bl-[200px] w-full min-h-[90vh] mt-[70px] bg-home-landing bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0000009a] before:rounded-bl-[200px] bg-fixed">
      <div className="container flex flex-col gap-4">
        <div className="w-10/12 md:w-10/12 lg:w-7/12">
          <Heading
            title="زاد | مساحة عمل"
            details="منصة فرصة هي منصة تعمل عن بُعد وتهدف إلى توفير تجربة تواصل مثالية بين الشركات والطلاب. نحن نوفر بيئة افتراضية حيث يمكن للشركات وأصحاب العمل إيجاد المواهب المناسبة والمؤهلة لمشاريعهم ووظائفهم الحالية والمستقبلية."
            additionalStyles="!text-white"
          />

          <div className="mt-4 lg:mt-8 w-4/12">
            <Link href={"about"}>
              <Button title="ابدأ الآن" icon={<PiShootingStarThin size={22} />} />
            </Link>
          </div>
        </div>
      </div>

      <LuMouse
        className="absolute text-white left-[50%] translate-x-[-50%] bottom-0 animate-bounce"
        size={27}
      />
    </div>
  );
};

export default Landing;
