import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import {
  LiaUserLockSolid,
  LiaUser,
  LiaMailBulkSolid,
  LiaPhoneSolid,
  LiaStar,
} from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import Heading from "@/components/UI/typography/heading";
import { useState } from "react";

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
  // Initial values for the form
  const initialValues = {
    username: "yousef_aboesha",
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
  };

  interface FormValues {
    username: string;
    name: string;
    email: string;
    phoneNumber: string;
    profession: string;
  }

  const [loading, setLoading] = useState(false);
  // const formRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const onSubmit = async (values: FormValues) => {
    setLoading(true); // Start loading
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(values);

      // Clear the form after successful submission
      setLoading(false);
    } catch (error) {
      console.error("Profile edit error:", error);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on error
    } finally {
      setLoading(false); // End loading
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on error
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4 border p-8 rounded-2xl shadow-sm">
          <Heading
            title=""
            highLightText="تعديل البيانات"
            highlightColor="before:bg-primary"
            className="mb-4 w-fit text-[14px]"
            additionalStyles="text-[28px]"
          />

          {/* Username Field (Disabled) */}
          <Input
            label="اسم المستخدم"
            type="text"
            placeholder="اسم المستخدم"
            icon={LiaUserLockSolid}
            value="yousef_aboesha"
            className="focus:border-primary"
            disabled
          />

          {/* Name Field */}
          <div>
            <Field
              className="focus:border-primary"
              name="name"
              type="text"
              placeholder="يوسف رشاد أبو عيشة"
              as={Input}
              label="الاسم ثلاثي"
              icon={LiaUser}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Email Field */}
          <div>
            <Field
              className="focus:border-primary"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              as={Input}
              label="البريد الالكتروني"
              icon={LiaMailBulkSolid}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <Field
              className="focus:border-primary"
              name="phoneNumber"
              type="text"
              placeholder="0569824542"
              as={Input}
              label="رقم الجوال"
              icon={LiaPhoneSolid}
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Profession Field */}
          <div>
            <Field
              className="focus:border-primary"
              name="profession"
              type="text"
              placeholder="هندسة أنظمة الحاسوب"
              as={Input}
              label="تخصصك الدراسي أو المهني"
              icon={LiaStar}
            />
            <ErrorMessage
              name="profession"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            title={isSubmitting ? "جاري التعديل..." : "تعديل"}
            className={`bg-primary mt-4 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            icon={<CiEdit size={24} />}
            hasShiningBar={false}
            disabled={isSubmitting}
            loading={loading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
