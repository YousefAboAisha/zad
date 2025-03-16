"use client";
import React, { useState } from "react";
import { BiKey } from "react-icons/bi";
import { PiSignIn } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaUserLockSolid } from "react-icons/lia";
import { API_BASE_URL } from "@/config";

const Admin = () => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const validationSchema = Yup.object({
    email: Yup.string().required("يرجى إدخال البريد الإلكتروني"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("يرجى إدخال كلمة المرور"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

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
      const response = await fetch(`${API_BASE_URL}/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, rememberMe }),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        setFormErrors(data.error);
        console.log("Sign in Error:", data.error);
        return;
      }

      // Show success toast
      toast.success("تم تسجيل الدخول بنجاح!");

      // Redirect to profile after a short delay
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);

      console.log("User has been created successfully!", data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setFormErrors((error as Error).message);
      toast.error("حدث خطأ أثناء تسجيل الدخول"); // Show error toast
      console.error("Error creating user", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative mb-14 flex items-center justify-center">
      {/* Toast Container */}
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

      <div className="w-11/12 md:w-7/12 lg:w-[35%] border p-8 rounded-3xl shadow-sm bg-white mt-40">
        <div className="flex flex-col justify-center items-center mb-8">
          <Heading
            title="تسجيل الدخول"
            highlightColor="before:bg-secondary"
            className="!text-2xl"
          />
          <p className="text-[12px] mt-2 text-secondary">
            &quot;لوحة التحكم&quot;
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-4">
              {/* UserName Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="email"
                  as={Input}
                  type="text"
                  placeholder="اسم المستخدم"
                  label="اسم المستخدم"
                  icon={LiaUserLockSolid}
                  className={`focus:border-secondary`}
                  aria-label="اسم المستخدم"
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
                  icon={BiKey}
                  className={`focus:border-secondary`}
                  aria-label="كلمة المرور"
                  aria-invalid={!!errors.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />

                {/* Remember Me Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer w-fit">
                  <p>تذكر كلمة المرور</p>
                  <Input
                    placeholder=""
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={(e) => setRememberMe(e.target.checked)}
                    checked={rememberMe}
                    aria-label="تذكر كلمة المرور"
                    required={false}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <Button
                title={"تسجيل الدخول"}
                type="submit"
                className="bg-secondary w-full"
                icon={<PiSignIn size={22} className="rotate-180" />}
                loading={isSubmitting}
                disabled={isSubmitting}
                hasShiningBar={false}
              />

              {formErrors && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
                  {formErrors}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Admin;
