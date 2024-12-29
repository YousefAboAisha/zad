import { FormEvent, useState } from "react";
import Heading from "@/components/UI/typography/heading";
import Input from "@/components/UI/inputs/input";
import Button from "@/components/UI/inputs/button";
import { CiEdit } from "react-icons/ci";
import { LiaMailBulkSolid, LiaPhoneSolid, LiaStar, LiaUser, LiaUserLockSolid } from "react-icons/lia";

const AddNewCustomerTap = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    setCustomerForm({
      ...customerForm,
      date: date,
    });
  };

  const [customerForm, setCustomerForm] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
    profession: string;
    startDate: string;
    endDate: string;
    paymentMethod: string;
    feeIsPaid: string;
    leasingType: string;
    date: string;
  }>({
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
    feeIsPaid: "no",
    leasingType: "",
    date: "",
  });
  return (
    <div className="container mt-32">
      <form
        className="flex flex-col gap-4 border p-8 rounded-2xl shadow-sm w-full md:w-6/12 mx-auto"
        onSubmit={(e) => submitHandler(e)}
      >
        <Heading
          title=""
          highLightText="تعديل البيانات"
          highlightColor="before:bg-primary"
          className="mb-4 w-fit text-[14px]"
          additionalStyles="text-[28px]"
        />

        <Input
          label="اسم المستخدم"
          type="text"
          placeholder="اسم المستخدم"
          icon={LiaUserLockSolid}
          required
          onChange={(e) =>
            setCustomerForm({
              ...customerForm,
              name: e.target.value,
            })
          }
          value={"yousef_aboesha"}
          className="focus:border-primary"
          disabled
        />

        <Input
          label="الاسم ثلاثي"
          type="text"
          placeholder="يوسف رشاد أبو عيشة"
          icon={LiaUser}
          required
          onChange={(e) =>
            setCustomerForm({
              ...customerForm,
              name: e.target.value,
            })
          }
          value={customerForm.name}
          className="focus:border-primary"
        />
        <Input
          label="البريد الالكتروني"
          type="email"
          placeholder="example@gmail.com"
          icon={LiaMailBulkSolid}
          required
          onChange={(e) =>
            setCustomerForm({
              ...customerForm,
              email: e.target.value,
            })
          }
          value={customerForm.email}
          className="focus:border-primary"
        />
        <Input
          label="رقم الجوال"
          type="text"
          placeholder="0569824542"
          icon={LiaPhoneSolid}
          required
          onChange={(e) =>
            setCustomerForm({
              ...customerForm,
              phoneNumber: e.target.value,
            })
          }
          value={customerForm.phoneNumber}
          className="focus:border-primary"
        />
        <Input
          label="تخصصك الدراسي أو المهني"
          type="text"
          placeholder="هندسة أنظمة الحاسوب"
          icon={LiaStar}
          required
          onChange={(e) =>
            setCustomerForm({
              ...customerForm,
              profession: e.target.value,
            })
          }
          value={customerForm.profession}
          className="focus:border-primary"
        />
        <Button
          title="تعديل"
          className="bg-primary mt-4"
          icon={<CiEdit size={24} />}
          hasShiningBar={false}
        />
      </form>
    </div>
  );
};

export default AddNewCustomerTap;
