import LeasingCard from "@/components/UI/cards/leasingCard";
import Heading from "@/components/UI/typography/heading";
import { leasingData } from "@/data/leasingData";

const LeasingPlans = () => {
  return (
    <div className="bg-secondary mt-24">
      <div className="mt-24 mb-24 container py-10">
        <Heading
          highLightText=""
          title="خطط الإيجار"
          additionalStyles="mb-12 w-fit mx-auto text-white"
        />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
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
