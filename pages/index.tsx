import Features from "@/containers/home/features";
import Hero from "@/containers/home/hero";
import ImageText from "@/containers/home/imageText";
import Landing from "@/containers/home/landing";
import LeasingPlans from "@/containers/home/leasingPlans";

export default function Home() {
  return (
    <>
      <Landing />
      <div className="container mx-auto">
        <ImageText/>
        <Features />
      </div>
      <LeasingPlans />
      <div className="container">
        <Hero />
      </div>
    </>
  );
}
