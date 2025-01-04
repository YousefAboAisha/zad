import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Biograph from "@/containers/about/biograph";
import Gallery from "@/containers/about/gallery";
import Landing from "@/containers/about/landing";
import Team from "@/containers/about/team";

export default function About() {
  return (
    <>
      <Navbar />
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
