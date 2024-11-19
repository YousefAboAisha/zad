import FeatureCard from "@/components/UI/cards/featureCard";
import Heading from "@/components/UI/typography/heading";
import { featuresData } from "@/data/featuresData";

const Features = () => {
  return (
    <div className="mt-24">
        <Heading highLightText="مَيّزاتنا" highlightColor="before:bg-primary" title="" className="w-fit" details="أهم ما يميز مساحة العمل"   />
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {featuresData.map((elem, index) => {
          return (
            <FeatureCard
              key={index}
              icon={elem.icon}
              title={elem.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Features;
