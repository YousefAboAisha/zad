import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail } from "react-icons/md";
import Input from "../inputs/input";
import Button from "../inputs/button";


const Signup = () => {

  

  return (
    <div className="relative flex flex-col rtl p-6">
      <h2 className="font-bold text-xl mx-auto border-primary w-fit border-b-4 pb-1 my-4">
        إنشاء حساب جديد
      </h2>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-4 w-full">
          <Input
            type="text"
            placeholder="الاسم الأول"
            icon={BiUser}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="اسم العائلة"
            icon={BiUser}
            className="w-full"
          />
        </div>

        <Input
          type="email"
          placeholder="example@gmail.com"
          icon={MdAlternateEmail}
          className="w-full"
        />

        <Input
          type="password"
          placeholder="كلمة المرور"
          icon={AiOutlineLock}
          className="w-full"
        />

        <Input
          type="password"
          placeholder="تأكيد كلمة المرور"
          icon={AiOutlineLock}
          className="w-full"
        />

        <label className="flex flex-row gap-2 items-center w-fit">
          <input type={"checkbox"} />
          <span className="font-light select-none">
            أوافق على سياسة الخصوصية والاستخدام
          </span>
        </label>

        <div className="mt-2 flex flex-col gap-4">
          <Button title="إنشاء حساب" className="mt-2" />
          <p className="text-center font-light">
            أو قم بتسجيل الدخول بواسطة حساب جوجل
          </p>
          <Button
            title="حساب جوجل"
            className="!bg-green-50 !text-text_light"
            icon={<FcGoogle size={22} />}
          />
        </div>

        <p className="font-light text-center mt-4">
          إذا كنت تمتلك حساب،قم بـ
          <span
        
            className="text-primary font-normal cursor-pointer"
          >
            تسجيل الدخول
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;