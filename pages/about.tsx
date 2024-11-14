import Biograph from "@/containers/about/biograph";
import Team from "@/containers/about/team";
import Landing from "@/containers/contact/landing";

export default function About() {
  return (
    <>
      {/* Landing Image */}
      <Landing />

      <div className="container mt-24">
        {/* Biograph, mission & Vision  */}
        <Biograph />

        {/* Zad team: “Photos, names, profession”. */}
        <Team />
      </div>

      {/* Pictures from the place and promo video */}

      {/* Map & Location. */}
    </>
  );
}
