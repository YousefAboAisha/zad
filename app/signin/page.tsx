"use client"; // Ensure this is a client component
import React, { useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { PiSignIn } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
// import { loginSchema } from "../schemas";
// import { redirect } from "next/navigation";

const Signin = () => {
  // State to track form submission errors as a string
  const [formErrors, setFormErrors] = useState<string>("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("يرجى إدخال البريد الإلكتروني"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      .required("يرجى إدخال كلمة المرور"),
  });

  // Test user to compare the input values
  // const testUser = {
  //   id: "1",
  //   email: "faw@gmail.com",
  //   password: "12345678",
  // };

  // Initial values for the form
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: { email: string; password: string },
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: { [key: string]: string }) => void;
    }
  ) => {
    // Reset form errors
    setFormErrors("");

    // Validate the form data using Zod
    // const result = loginSchema.safeParse(values);

    // if (!result.success) {
    //   // If validation fails, set the errors in state as a single string
    //   const errorMessages = Object.values(
    //     result.error.flatten().fieldErrors
    //   ).flat();
    //   setFormErrors(errorMessages.join(", ")); // Combine errors into a single string
    //   setSubmitting(false);
    //   return;
    // }

    // const { email, password } = result.data;

    // Check if the email and password match the test user
    // if (email !== testUser.email || password !== testUser.password) {
    //   setFormErrors("خطأ في البريد الالكتروني أو كلمة المرور");
    //   setSubmitting(false);
    //   return;
    // }

    try {
      // Send data to the backend API route
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        // If the API returns an error, set the error in state as a single string
        setFormErrors(data.error);
        console.log("Error is:", data.error);
        return;
      }

      setSubmitting(false);
      console.log("User has been created successfully!", data);
    } catch (error) {
      setSubmitting(false);
      // Handle unexpected errors
      setFormErrors((error as Error).message);
      console.error("Error creating user", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="w-11/12 md:w-7/12 lg:w-5/12  mx-auto border p-8 rounded-3xl shadow-sm mt-[70px] bg-white">
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
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

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
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px]"
                  />
                </div>

                <Button
                  title={"تسجيل الدخول"}
                  type="submit"
                  className="bg-primary mt-2 w-full mx-auto hover:shadow-lg"
                  icon={<PiSignIn size={22} className="rotate-180" />}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />

                {formErrors && (
                  <div className="rounded-lg p-4 w-full bg-red-200 text-[red] text-[13px]">
                    {formErrors}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signin;
