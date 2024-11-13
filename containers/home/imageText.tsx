import CustomImage from "@/components/UI/cards/customImage";
import Heading from "@/components/UI/typography/heading";
import React from "react";

const ImageText = () => {
  return (
    <div className="section grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col items-start">
        <Heading
          title=""
          highLightText="أول مساحة عمل في شمال القطاع"
          additionalStyles="mx-0 mb-2 text-3xl"
          details="من رحم المعاناة تولد المعجزات"
        />
        <p className="">
          مساحة العمل هذه، التي أُنشئت في شمال غزة في ظل الحرب الحالية، تعتبر
          بمثابة ملاذ للمبدعين ورواد الأعمال والمبتكرين الطامحين إلى مواصلة
          العمل وتطوير أفكارهم رغم الأوضاع الصعبة. توفر المساحة بيئة تجمع بين
          الأمان والدعم النفسي والمادي، حيث يمكن للشباب استخدام أدوات
          التكنولوجيا الحديثة والتعلم عبر ورش العمل والبرامج التدريبية المتنوعة.
          تسعى المساحة إلى بناء مجتمع متكامل من الشباب الطموح والمثابر، وتشجيعهم
          على التعبير عن أفكارهم والتعاون مع بعضهم البعض لتطوير مشاريع تخدم
          المجتمع المحلي وتساهم في تقديم حلول للتحديات اليومية. كما تحرص المساحة
          على توفير منصات للتواصل مع رواد الأعمال والخبراء في المجالات المختلفة،
          سواء داخل غزة أو خارجها، بهدف نقل الخبرات وتبادل الأفكار. على الرغم من
          الصعوبات الجمة، تسعى هذه المساحة إلى ترسيخ الأمل والإصرار، وتمكين
          الجيل الجديد من أدوات الإبداع والابتكار، وخلق بيئة تحتضن الأفكار
          الجديدة والمشاريع الريادية، وتفتح آفاقًا نحو مستقبل أفضل للمجتمع
          الغزي.
        </p>
      </div>

      <div className="flex justify-center lg:border-primary lg:border-[15px] md:rounded-lg">
        <CustomImage
          src={"/home-landing.jpg"}
          width={1000}
          height={1000}
          alt="CV Image"
          className="shadow-2xl z-10 translate-x-0 translate-y-0 rounded-lg lg:-translate-x-10 lg:-translate-y-10 lg:border"
        />
      </div>
    </div>
  );
};

export default ImageText;
