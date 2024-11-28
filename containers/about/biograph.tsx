import Heading from "@/components/UI/typography/heading";
import Image from "next/image";

const Biograph = () => {
  return (
    <div className="flex flex-col">
      {/* Right Text | Left Image */}
      <div className="cards-grid-2 gap-6 mb-24">
        <div className="flex flex-col justify-center">
          <Heading
            title=""
            highLightText="أهدافنا في زاد"
            details="ما نسعى لتحقيقه من أهداف وإنجازات"
            highlightColor="before:bg-primary"
            className="mb-2"
          />
          <ul className="flex flex-col gap-2 pr-">
            {/* <li>
              تطمح هذه المساحة، المنشأة في شمال غزة وسط ظروف الحرب الحالية، إلى
              أن تكون ملاذاً آمناً وداعماً للمبدعين ورواد الأعمال والمبتكرين
              الشباب.
            </li>
            <li>
              تسعى إلى تمكينهم من مواصلة العمل وتطوير أفكارهم رغم التحديات، من
              خلال توفير بيئة تجمع بين الأمان والدعم النفسي والمادي، وإتاحة
              أدوات التكنولوجيا الحديثة وورش العمل والبرامج التدريبية المتنوعة.
            </li> */}
            <li>
              تهدف المساحة إلى بناء مجتمع متكامل من الشباب الطموح، ودعمهم في
              التعبير عن أفكارهم والتعاون على تطوير مشاريع تخدم المجتمع المحلي
              وتقدم حلولاً للتحديات اليومية.
            </li>
            <li>
              تحرص على توفير منصات للتواصل مع رواد الأعمال والخبراء، سواء في غزة
              أو على المستوى الدولي، لتمكين الشباب من نقل الخبرات وتبادل
              الأفكار.
            </li>
            <li>
              رغم كل الصعوبات، تُركز المساحة على غرس الأمل والإصرار، وتمكين
              الجيل الجديد بأدوات الإبداع والابتكار، وتهيئة بيئة تتبنى الأفكار
              الجديدة والمشاريع الريادية، ساعيةً نحو بناء مستقبل أفضل وأكثر
              إشراقاً للمجتمع الغزي.
            </li>
          </ul>
        </div>

        <div className="relative border-primary border-[15px] rounded-3xl p-3 shadow-xl">
          <Image
            src={"/mission.jpg"}
            alt="Image"
            width={1000}
            height={1000}
            className="rounded-xl w-full h-full"
          />
        </div>
      </div>

      {/* Left Text | Right Image */}
      <div className="cards-grid-2 gap-6">
        <div className="border-blue border-[15px] rounded-3xl p-3 shadow-xl relative order-2 md:order-1">
          <Image
            src={"/vision.jpg"}
            alt="Image"
            width={1000}
            height={1000}
            className="rounded-xl w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center md:order-2 order-1">
          <Heading
            title=""
            highLightText="رؤيتنا في زاد"
            details="ما نتطلع ونسعى للوصول إليه مستقبلاً"
            highlightColor="before:bg-blue"
            className="mb-2"
          />

          <p>
            تطمح هذه المساحة، المنشأة في شمال غزة وسط ظروف الحرب الحالية، إلى أن
            تكون ملاذاً آمناً وداعماً للمبدعين ورواد الأعمال والمبتكرين الشباب.
            تسعى إلى تمكينهم من مواصلة العمل وتطوير أفكارهم رغم التحديات، من
            خلال توفير بيئة تجمع بين الأمان والدعم النفسي والمادي، وإتاحة أدوات
            التكنولوجيا الحديثة وورش العمل والبرامج التدريبية المتنوعة. تهدف
            المساحة إلى بناء مجتمع متكامل من الشباب الطموح، ودعمهم في التعبير عن
            أفكارهم والتعاون على تطوير مشاريع تخدم المجتمع المحلي وتقدم حلولاً
            للتحديات اليومية.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Biograph;
