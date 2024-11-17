import Biograph from "@/containers/about/biograph";
import Gallery from "@/containers/about/gallery";
import Landing from "@/containers/about/landing";
// import Map from "@/containers/about/map";
import Team from "@/containers/about/team";

export default function About() {
  return (
    <>
      {/* Landing Image */}
      <Landing />

      {/* Pictures from the place and promo video */}
      <Gallery />

      <div className="container mt-32">
        {/* Biograph, mission & Vision  */}
        <Biograph />

        {/* Zad team: “Photos, names, profession”. */}
        <Team />
      </div>

      {/* Map & Location. */}
      {/* <Map /> */}
    </>
  );
}
