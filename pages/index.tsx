import Features from "@/containers/home/features";
import Landing from "@/containers/home/landing";
import LeasingPlans from "@/containers/home/leasingPlans";

export default function Home() {
  return (
    <>
      <Landing />
      <div className="container mx-auto">
        <Features />
      </div>
      <LeasingPlans />
    </>
  );
}
