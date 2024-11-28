import Heading from "@/components/UI/typography/heading";
import Image from "next/image";
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
          highlightColor="before:bg-primary"
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
          سواء داخل غزة أو خارجها، بهدف نقل الخبرات وتبادل الأفكار.
        </p>
      </div>

      <div className="flex justify-center bg-primary rounded-xl shadow-2xl w-fit h-fit">
        <Image
          src={"/work.jpg"}
          width={1000}
          height={1000}
          alt="Workspace"
          className="shadow-xl translate-x-0 translate-y-0 rounded-xl lg:-translate-x-6 lg:-translate-y-6 z-10"
        />
      </div>
    </div>
  );
};

export default ImageText;
