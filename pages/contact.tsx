// import AddnewCustomerForm from "@/components/addnewCustomerForm";
import CustomerProfile from "@/components/customerProfile";
// import SuccessMessage from "@/components/UI/cards/successMessage";
// import Landing from "@/containers/contact/landing";
import { useRef } from "react";

export default function Contact() {
  const contactFormRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {/* <Landing contactFormRef={contactFormRef} /> */}
      <div ref={contactFormRef} className="container">
        {/* <ContactForm /> */}
        {/* <AddnewCustomerForm /> */}
        {/* <SuccessMessage /> */}
        <CustomerProfile />
      </div>
    </>
  );
}
