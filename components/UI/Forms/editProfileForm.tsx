"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import {
  LiaUser,
  LiaMailBulkSolid,
  LiaPhoneSolid,
  LiaStar,
} from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import Heading from "@/components/UI/typography/heading";
import { useEffect, useState } from "react";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("الاسم ثلاثي مطلوب"),
  email: Yup.string()
    .email("البريد الالكتروني غير صالح")
    .required("البريد الالكتروني مطلوب"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "رقم الجوال غير صالح (يجب أن يحتوي على 10 أرقام)")
    .required("رقم الجوال مطلوب"),
  profession: Yup.string().required("التخصص مطلوب"),
});

const EditProfileForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string>("");

  // Initial values for the form
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
  });

  // Edit user details function
  const editUserDetailsHandler = async (
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

      const response = await fetch("/api/users/updateUserDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Ensure values are being sent as JSON
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        setFormErrors(data.error || "حدث خطأ أثناء تعديل البيانات");
        console.log("Error is:", data.error);
        return;
      }

      setSubmitting(false);
      console.log("User has been updated successfully!", data);
      window.location.reload();
    } catch (error) {
      setSubmitting(false);
      setFormErrors((error as Error).message || "حدث خطأ غير متوقع");
      console.error("Error while updating user", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Get the previous user details, and set them as initial values for the form
  const getUserDetails = async () => {
    try {
      const response = await fetch("/api/users/getUserDetails");

      if (!response.ok) {
        setError("Failed to get user details");
      }

      const res = await response.json();
      console.log("Response", res);

      if (res) {
        console.log("User Data", res);

        // Update initialValues state
        setInitialValues({
          name: res.customer.name,
          email: res.customer.email,
          phoneNumber: res.customer.phoneNumber,
          profession: res.customer.profession,
        });
      }
    } catch (error) {
      console.error("Fetching userDetails failed:", error);
      setError("Failed to fetch user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Formik
      initialValues={initialValues} // Use the state for initialValues
      validationSchema={validationSchema}
      onSubmit={editUserDetailsHandler}
      enableReinitialize // Allow Formik to reinitialize when initialValues change
    >
      {({ isSubmitting, errors }) => (
        <Form className="flex flex-col gap-4 border p-8 rounded-2xl shadow-sm bg-white">
          <Heading
            title=""
            highLightText="تعديل البيانات"
            highlightColor="before:bg-primary"
            className="mb-4 w-fit text-[14px] mx-auto"
            additionalStyles="text-[28px]"
          />

          {/* Name Field */}
          {loading ? (
            <div className="flex flex-col gap-1">


              <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
              <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
            </div>
          ) : (
            <div>
              <Field
                className={`focus:border-primary ${
                  errors.name && "!border-[red]"
                }`}
                name="name"
                type="text"
                placeholder="أدخل اسمك الثلاثي"
                as={Input}
                label="الاسم ثلاثي"
                icon={LiaUser}
                disabled={isSubmitting} // Disable input during loading
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-[12px] mt-1 font-bold"
              />
            </div>
          )}

          {/* Email Field */}
          {loading ? (
            <div className="flex flex-col gap-1">


              <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
              <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
            </div>
          ) : (
            <div>
              <Field
                className={`focus:border-primary ${
                  errors.email && "!border-[red]"
                }`}
                name="email"
                type="email"
                placeholder="example@gmail.com"
                as={Input}
                label="البريد الالكتروني"
                icon={LiaMailBulkSolid}
                disabled={isSubmitting} // Disable input during loading
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-[12px] mt-1 font-bold"
              />
            </div>
          )}

          {/* Phone Number Field */}
          {loading ? (
            <div className="flex flex-col gap-1">


              <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
              <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
            </div>
          ) : (
            <div>
              <Field
                className={`focus:border-primary ${
                  errors.phoneNumber && "!border-[red]"
                }`}
                name="phoneNumber"
                type="text"
                placeholder="0569824542"
                as={Input}
                label="رقم الجوال"
                icon={LiaPhoneSolid}
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-[12px] mt-1 font-bold"
              />
            </div>
          )}

          {/* Profession Field */}
          {loading ? (
            <div className="flex flex-col gap-1">


              <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
              <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
            </div>
          ) : (
            <div>
              <Field
                className={`focus:border-primary ${
                  errors.profession && "!border-[red]"
                }`}
                name="profession"
                type="text"
                placeholder="هندسة أنظمة الحاسوب"
                as={Input}
                label="تخصصك الدراسي أو المهني"
                icon={LiaStar}
                disabled={isSubmitting}
              />
              <ErrorMessage
                name="profession"
                component="div"
                className="text-red-500 text-[12px] mt-1 font-bold"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            title={"تعديل"}
            className={`bg-primary mt-4 `}
            icon={<CiEdit size={24} />}
            hasShiningBar={false}
            disabled={isSubmitting || loading}
            loading={isSubmitting}
          />

          {formErrors && (
            <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
              {formErrors}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
