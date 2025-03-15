"use client";
import { BiLock, BiMailSend, BiPhone, BiStar, BiUser } from "react-icons/bi";
import { PiShootingStarThin } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "@/config";

const Signup = () => {
  const [formErrors, setFormErrors] = useState<string>("");

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
    password: "",
    confirmPassword: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("يرجى إدخال الاسم رباعي"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "يرجى إدخال أرقام فقط")
      .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
      .required("يرجى إدخال رقم الهاتف"),
    profession: Yup.string().required("يرجى إدخال التخصص"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("يرجى إدخال كلمة المرور"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة")
      .required("يرجى تأكيد كلمة المرور"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    setFormErrors("");

    try {
      // Log the form values to verify they are correct
      console.log("Form Values:", values);

      const response = await fetch(`${API_BASE_URL}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Ensure values are being sent as JSON
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        setFormErrors(data.error || "حدث خطأ أثناء إنشاء الحساب");
        console.log("Error is:", data.error);
        return;
      }
      console.log("User has been created successfully!", data);

      // Show success toast
      toast.success("تم تسجيل الدخول بنجاح!");

      // Redirect to profile after a short delay
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);

      setSubmitting(false);
      window.location.href = "/profile";
    } catch (error) {
      setSubmitting(false);
      toast.error("حدث خطأ أثناء تسجيل الدخول"); // Show error toast
      console.error("Error creating user", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative mb-14 flex items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-11/12 md:w-7/12 lg:w-5/12 border p-8 rounded-3xl shadow-sm bg-white mt-40">
        <Heading
          highLightText="انضم إلى زاد"
          title=""
          highlightColor="before:bg-primary"
          className="mb-8 mx-auto"
          additionalStyles="text-[30px] text-center mx-auto"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-4">
              {/* Name Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="name"
                  as={Input}
                  type="text"
                  placeholder="الاسم رباعي"
                  label="الاسم رباعي"
                  icon={BiUser}
                  className={`focus:border-primary`}
                  aria-label="الاسم رباعي"
                  aria-invalid={!!errors.name}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* Email Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="البريد الالكتروني"
                  label="البريد الالكتروني"
                  icon={BiMailSend}
                  className={`focus:border-primary`}
                  aria-label="البريد الالكتروني"
                  aria-invalid={!!errors.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* Password Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="كلمة المرور"
                  label="كلمة المرور"
                  icon={BiLock}
                  className={`focus:border-primary`}
                  aria-label="كلمة المرور"
                  aria-invalid={!!errors.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="confirmPassword"
                  as={Input}
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  label="تأكيد كلمة المرور"
                  icon={BiLock}
                  className={`focus:border-primary`}
                  aria-label="تأكيد كلمة المرور"
                  aria-invalid={!!errors.confirmPassword}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* Phone Number and Profession Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Field
                    disabled={isSubmitting}
                    name="phoneNumber"
                    as={Input}
                    type="text"
                    placeholder="رقم الهاتف"
                    label="رقم الهاتف"
                    icon={BiPhone}
                    className={`focus:border-primary`}
                    aria-label="رقم الهاتف"
                    aria-invalid={!!errors.phoneNumber}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                <div>
                  <Field
                    disabled={isSubmitting}
                    name="profession"
                    as={Input}
                    type="text"
                    placeholder="التخصص"
                    label="التخصص"
                    icon={BiStar}
                    className={`focus:border-primary`}
                    aria-label="التخصص"
                    aria-invalid={!!errors.profession}
                  />
                  <ErrorMessage
                    name="profession"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                title="انضمام"
                type="submit"
                className="bg-primary mt-2 w-full mx-auto"
                icon={<PiShootingStarThin size={22} />}
                disabled={isSubmitting}
                loading={isSubmitting}
              />

              {formErrors && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
                  {formErrors}
                </div>
              )}

              {isSubmitting ? null : (
                <div className="text-center text-sm mt-6 ">
                  إذا كنت تمتلك حساباً، قم بـ
                  <Link
                    className="text-primary font-bold hover:underline"
                    href={"/signin"}
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
