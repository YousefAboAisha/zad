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

  const handleSubmit = async (
    values: typeof initialValues,
    {
      resetForm,
      setSubmitting,
    }: {
      resetForm: () => void;
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
      console.error("Profile edit error:", error);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on error
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
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
            className={`focus:border-primary`}
            disabled
          />

          {/* Name Field */}
          <div>
            <Field
              className={`focus:border-primary ${
                errors.name && "!border-[red]"
              }`}
              name="name"
              type="text"
              placeholder="يوسف رشاد أبو عيشة"
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

          {/* Email Field */}
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

          {/* Phone Number Field */}
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

          {/* Profession Field */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            title={"تعديل"}
            className={`bg-primary mt-4 `}
            icon={<CiEdit size={24} />}
            hasShiningBar={false}
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
