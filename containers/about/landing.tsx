import Heading from "@/components/UI/typography/heading";

const Landing = () => {
  return (
    <div className="relative flex flex-col justify-center items-start w-full min-h-[90vh] mt-[70px] bg-about bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#00000054] bg-fixed">
      <div className="flex flex-col gap-4 abs-center p-4 py-6 rounded-3xl w-full md:w-8/12 lg:w-6/12 backdrop-blur-[2px]">
        <Heading
          title=""
          highLightText="تعرّف على &quot;زاد&quot; "
          highlightColor="before:bg-blue"
          details="منصة فرصة هي منصة تعمل عن بُعد وتهدف إلى توفير تجربة تواصل مثالية بين الشركات والطلاب. نحن نوفر بيئة افتراضية حيث يمكن للشركات وأصحاب العمل إيجاد المواهب المناسبة والمؤهلة لمشاريعهم ووظائفهم الحالية والمستقبلية."
          className="text-white"
          additionalStyles="mx-auto !w-fit"
          detailsStyles="mt-6 mx-auto text-center w-fit w-8/12"
        />
      </div>
    </div>
  );
};

export default Landing;
