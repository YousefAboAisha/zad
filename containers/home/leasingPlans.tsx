import LeasingCard from "@/components/UI/cards/leasingCard";
import Heading from "@/components/UI/typography/heading";
import { leasingData } from "@/data/leasingData";


const LeasingPlans = () => {
  return (
    <div className="mt-24 ">
      <div className="container mt-24 mb-24 py-10">
        <Heading
          title="خطط الإيجار"
          className="w-fit mx-auto text-center"
          additionalStyles="mx-auto"
          details="خطط عدّة لتناسب جميع الأشخاص"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {leasingData.map(({ type, price, color }, index) => {
            return (
              <LeasingCard
                key={index}
                type={type}
                price={price}
                color={color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeasingPlans;
