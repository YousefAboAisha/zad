import { BiLock, BiUser } from "react-icons/bi";
import { PiSignIn } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useModal } from "@/context/modalContext";
import Heading from "../typography/heading";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import { useState } from "react";

const Signin = () => {
  const { openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح.")
      .required("يرجى إدخال البريد الإلكتروني."),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل.")
      .required("يرجى إدخال كلمة المرور."),
  });

  return (
    <div className="w-full mx-auto border p-8 rounded-3xl shadow-sm">
      <Heading
        highLightText="تسجيل الدخول"
        title=""
        highlightColor="before:bg-primary"
        className="mb-8 mx-auto"
        additionalStyles="text-[30px] text-center mx-auto"
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true); // Start loading
          try {
            const date = new Date().toLocaleDateString();
            const loginData = { ...values, date };

            // Simulating an API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log(loginData);

            resetForm(); // Clear the form after successful submission
          } catch (error) {
            console.error("Login error:", error);
          } finally {
            setLoading(false); // End loading
          }
        }}
      >
        {() => (
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                disabled={loading} // Disable input during loading
                name="email"
                as={Input}
                type="email"
                placeholder="البريد الالكتروني"
                label="البريد الالكتروني"
                icon={BiUser}
                className={`focus:border-primary ${
                  loading ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-2 font-medium text-[12px]"
              />
            </div>

            <div>
              <Field
                disabled={loading} // Disable input during loading
                name="password"
                as={Input}
                type="password"
                placeholder="كلمة المرور"
                label="كلمة المرور"
                icon={BiLock}
                className={`focus:border-primary ${
                  loading ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-2 font-medium text-[12px]"
              />
            </div>

            <Button
              title="تسجيل الدخول"
              type="submit"
              className="bg-primary mt-2 w-full mx-auto"
              icon={<PiSignIn size={22} className="rotate-180" />}
              loading={loading}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
