"use client";
import React, { useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { PiSignIn } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
// import { signIn } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const Signin = () => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  // const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false); // New state for Google Sign-In loading

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
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
      const response = await fetch("/api/users/signin", {
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

      window.location.href = "/profile";
      console.log("User has been created successfully!", data);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setFormErrors((error as Error).message);
      console.error("Error creating user", error);
    } finally {
      setSubmitting(false);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   setIsGoogleLoading(true); // Set loading state to true
  //   try {
  //     await signIn("google"); // Initiate Google Sign-In
  //   } catch (error) {
  //     console.error("Error during Google Sign-In:", error);
  //     setFormErrors("حدث خطأ أثناء تسجيل الدخول بواسطة جوجل");
  //   } finally {
  //     setIsGoogleLoading(false); // Reset loading state
  //   }
  // };

  return (
    <div className="relative mb-14 flex items-center justify-center">
      <div className="w-11/12 md:w-7/12 lg:w-5/12 border p-8 rounded-3xl shadow-sm bg-white mt-40">
        <Heading
          title="تسجيل الدخول"
          highlightColor="before:bg-primary"
          className="mb-8 mx-auto text-center !text-2xl"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col gap-4">
              {/* Email Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="البريد الالكتروني"
                  label="البريد الالكتروني"
                  icon={BiUser}
                  className={`focus:border-primary ${
                    errors.email && "!border-[red]"
                  }`}
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
                  className={`focus:border-primary ${
                    errors.password && "!border-[red]"
                  }`}
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
                  />
                </label>
              </div>

              {/* Submit Button */}
              <Button
                title={"تسجيل الدخول"}
                type="submit"
                className="bg-primary w-full hover:shadow-lg"
                icon={<PiSignIn size={22} className="rotate-180" />}
                loading={isSubmitting}
                disabled={isSubmitting}
              />

              {formErrors && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
                  {formErrors}
                </div>
              )}

              {isSubmitting ? null : (
                <div className="text-center text-sm mt-2 ">
                  إذا كنت لا تمتلك حساباً، قم بـ
                  <Link
                    className="text-primary font-bold hover:underline"
                    href={"/signup"}
                  >
                    الانضمام إلينا
                  </Link>
                </div>
              )}
            </Form>
          )}
        </Formik>

        {/* <div className="relative w-full h-full p-2 my-8 items-center justify-center">
          <p className="text-lg text-center abs-center top-[50%] translate-y-[-50%] bg-white w-[10%] text-gray-500 font-light">
            أو
          </p>
          <hr />
        </div> */}

        {/* Google Sign-In Button */}
        {/* <Button
          title="تسجيل بواسطة جوجل"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading} // Disable button when loading
          className="flex items-center justify-center gap-2 rounded-xl w-full mt-6 !text-black !shadow-sm !border-gray-200 !p-4"
          icon={<FcGoogle size={24} />}
          hasShiningBar={false}
          loading={isGoogleLoading} // Show loading spinner when loading
        /> */}
      </div>
    </div>
  );
};

export default Signin;
