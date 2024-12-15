import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Select from "@/components/UI/inputs/selectInput";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { FormEvent, useState } from "react";
import { BiMailSend, BiPhone, BiStar, BiUser } from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";
import Heading from "../typography/heading";
import { PiShootingStarThin } from "react-icons/pi";
import { useModal } from "@/context/modalContext";

const Signup = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
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

  const { openModal, closeModal } = useModal();

  return (
    <div className="w-full mx-auto border p-8 rounded-3xl shadow-sm">
      <Heading
        highLightText="انضم إلى زاد"
        title=""
        highlightColor="before:bg-primary"
        className="mb-8 mx-auto"
        additionalStyles="text-[30px] text-center mx-auto"
      />
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
          title="انضمام"
          className="bg-primary mt-2 w-full mx-auto"
          icon={<PiShootingStarThin size={22} />}
        />

        <p className="font-light text-center text-[13px]">
          إذا كنت تمتلك حساباً، قم بـ
          <span
            className="text-primary font-bold cursor-pointer"
            onClick={() => {
              closeModal();
              openModal("signin");
            }}
          >
            تسجيل الدخول
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
