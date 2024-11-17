import ContactForm from "@/containers/contact/contactForm";
import Landing from "@/containers/contact/landing";

export default function Contact() {
  return (
    <>
      <Landing />
      <div id="contactForm" className="container">
        <ContactForm />
      </div>
    </>
  );
}
