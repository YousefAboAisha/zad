import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Select from "@/components/UI/inputs/selectInput";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { FormEvent, useState } from "react";
import { BiMailSend, BiPhone, BiStar, BiUser } from "react-icons/bi";
import { FiArrowDown, FiSend } from "react-icons/fi";

const ContactForm = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString()
    setContactData({
      ...contactData,
      date: date,
    });

    // console.log(contactData);
  };

  const [contactData, setContactData] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
    profession: string;
    leasingType: string;
    date: string;
  }>({
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
    leasingType: "",
    date: "",
  });

  return (
    <div className="mt-24 w-full md:w-8/12 lg:w-6/12 mx-auto border p-8 rounded-3xl shadow-sm">
      <form className="flex flex-col gap-4" onSubmit={(e) => submitHandler(e)}>
        <Input
          type="text"
          placeholder="الاسم رباعي"
          icon={BiUser}
          required
          onChange={(e) =>
            setContactData({
              ...contactData,
              name: e.target.value,
            })
          }
          value={contactData.name}
        />

        <Input
          type="email"
          placeholder="البريد الالكتروني"
          icon={BiMailSend}
          required
          onChange={(e) =>
            setContactData({
              ...contactData,
              email: e.target.value,
            })
          }
          value={contactData.email}
        />

        <Input
          type="text"
          placeholder="رقم الهاتف"
          icon={BiPhone}
          required
          onChange={(e) =>
            setContactData({
              ...contactData,
              phoneNumber: e.target.value,
            })
          }
          value={contactData.phoneNumber}
        />

        <Input
          type="text"
          placeholder="التخصص"
          icon={BiStar}
          required
          onChange={(e) =>
            setContactData({
              ...contactData,
              profession: e.target.value,
            })
          }
          value={contactData.profession}
        />

        <Select
          options={leasingPlansOptions}
          title="اختر نوع الاشتراك.."
          icon={<FiArrowDown />}
          required
          onChange={(e) =>
            setContactData({
              ...contactData,
              leasingType: e.target.value,
            })
          }
          value={contactData.leasingType}
        />

        <Button
          title="إرسال"
          className="bg-blue mt-4 w-full md:w-8/12 mx-auto"
          icon={<FiSend />}
        />
      </form>
    </div>
  );
};

export default ContactForm;
