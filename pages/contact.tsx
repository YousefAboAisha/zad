import AddnewCustomerForm from "@/components/addnewCustomerForm";
import Landing from "@/containers/contact/landing";
import { useRef } from "react";

export default function Contact() {
  const contactFormRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Landing contactFormRef={contactFormRef} />
      <div ref={contactFormRef} className="container">
        {/* <ContactForm /> */}
      <AddnewCustomerForm />
      </div>
    </>
  );
}
