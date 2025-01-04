import Footer from "@/components/footer";
import Biograph from "@/containers/about/biograph";
import Gallery from "@/containers/about/gallery";
import Landing from "@/containers/about/landing";
import Team from "@/containers/about/team";
import NavbarWrapper from "../navbarWrapper";

export default function About() {
  return (
    <>
      <NavbarWrapper /> {/* Use the server-side wrapper */}
      <Landing />
      <Gallery />
      <div className="container mt-32">
        <Biograph />
        <Team />
      </div>
      <Footer />
    </>
  );
}
