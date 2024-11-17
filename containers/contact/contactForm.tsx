import Input from "@/components/UI/inputs/input";
import Select from "@/components/UI/inputs/selectInput";
import { BiMailSend, BiPhone, BiUser } from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";

const ContactForm = () => {
  const options = [
    {
      title: "طالب ثانوية عامة",
      id: 1,
    },
    {
      title: "طالب جامعي",
      id: 2,
    },
    {
      title: "خريج",
      id: 3,
    },
  ];

  return (
    <div className="mt-24 w-full md:w-8/12 lg:w-6/12 mx-auto border p-8 rounded-3xl shadow-sm">
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="الاسم رباعي"
          icon={BiUser}
          className="!rounded-xl !border-none"
        />

        <Input
          type="email"
          placeholder="البريد الالكتروني"
          icon={BiMailSend}
          className="!rounded-xl !border-none"
        />

        <Input
          type="text"
          placeholder="رقم الهاتف"
          icon={BiPhone}
          className="!rounded-xl !border-none"
        />

        <Select
          options={options}
          title="اختر مستواك الدراسي..."
          icon={<FiArrowDown />}
        />
      </div>
    </div>
  );
};

export default ContactForm;
