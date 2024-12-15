import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import { FormEvent, useState } from "react";
import { BiMailSend, BiUser } from "react-icons/bi";
import Heading from "../typography/heading";
import { PiSignIn } from "react-icons/pi";
import { useModal } from "@/context/modalContext";

const Signin = () => {
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
    email: string;
    password: string;
    date: string;
  }>({
    email: "",
    password: "",
    date: "",
  });

  const { openModal, closeModal } = useModal();

  return (
    <div className="w-full mx-auto border p-8 rounded-3xl shadow-sm">
      <Heading
        highLightText="تسجيل الدخول"
        title=""
        highlightColor="before:bg-primary"
        className="mb-8 mx-auto"
        additionalStyles="text-[30px] text-center mx-auto"
      />
      <form className="flex flex-col gap-4" onSubmit={(e) => submitHandler(e)}>
        <Input
          type="email"
          placeholder="البريد الالكتروني"
          icon={BiUser}
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
          type="password"
          placeholder="كلمة المرور"
          icon={BiMailSend}
          required
          onChange={(e) =>
            setContactData({
              ...contactData,
              password: e.target.value,
            })
          }
          value={contactData.password}
        />

        <Button
          title="تسجيل الدخول"
          className="bg-primary mt-2 w-full mx-auto"
          icon={<PiSignIn size={22} />}
        />

        <p className="font-light text-center text-[13px]">
          إذا كنت لا تمتلك حساب، قم بـ
          <span
            className="text-primary font-bold cursor-pointer"
            onClick={() => {
              closeModal();
              openModal("signup");
            }}
          >
            الانضمام إلينا{" "}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
