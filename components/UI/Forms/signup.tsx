import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { BiMailSend, BiPhone, BiStar, BiUser } from "react-icons/bi";
import { FiArrowDown } from "react-icons/fi";
import { PiShootingStarThin } from "react-icons/pi";
import { useModal } from "@/context/modalContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Heading from "../typography/heading";
import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Select from "@/components/UI/inputs/selectInput";

const Signup = () => {
  const { openModal, closeModal } = useModal();

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
    leasingType: "",
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
    leasingType: Yup.string().required("يرجى اختيار نوع الاشتراك"),
  });

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
    <div className="w-full mx-auto border p-8 rounded-3xl shadow-sm">
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
        {({ setFieldValue, values, isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                disabled={isSubmitting} // Disable input during loading
                name="name"
                as={Input}
                type="text"
                placeholder="الاسم رباعي"
                label="الاسم رباعي"
                icon={BiUser}
                className={`focus:border-primary ${
                  errors.name && "!border-[red]"
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-2 font-bold text-[12px]"
              />
            </div>

            <div>
              <Field
                disabled={isSubmitting} // Disable input during loading
                name="email"
                as={Input}
                type="email"
                placeholder="البريد الالكتروني"
                label="البريد الالكتروني"
                icon={BiMailSend}
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
                disabled={isSubmitting} // Disable input during loading
                name="phoneNumber"
                as={Input}
                type="text"
                placeholder="رقم الهاتف"
                label="رقم الهاتف"
                icon={BiPhone}
                className={`focus:border-primary ${
                  errors.phoneNumber && "!border-[red]"
                }`}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 mt-2 font-bold text-[12px]"
              />
            </div>

            <div>
              <Field
                disabled={isSubmitting} // Disable input during loading
                name="profession"
                as={Input}
                type="text"
                placeholder="التخصص"
                label="التخصص"
                icon={BiStar}
                className={`focus:border-primary ${
                  errors.profession && "!border-[red]"
                }`}
              />
              <ErrorMessage
                name="profession"
                component="div"
                className="text-red-500 mt-2 font-bold text-[12px]"
              />
            </div>

            <div>
              <Select
                disabled={isSubmitting} // Disable input during loading
                label="نوع الاشتراك"
                options={leasingPlansOptions}
                title="اختر نوع الاشتراك.."
                icon={<FiArrowDown />}
                value={values.leasingType}
                onChange={(e) => setFieldValue("leasingType", e.target.value)}
                className={`focus:border-primary ${
                  errors.leasingType && "!border-[red]"
                }`}
              />
              <ErrorMessage
                name="leasingType"
                component="div"
                className="text-red-500 mt-2 font-bold text-[12px]"
              />
            </div>

            <Button
              title="انضمام"
              type="submit"
              className="bg-primary mt-2 w-full mx-auto"
              icon={<PiShootingStarThin size={22} />}
              disabled={isSubmitting} // Disable input during loading
              loading={isSubmitting}
            />
            {isSubmitting ? null : (
              <p className="font-light text-center text-[13px]">
                إذا كنت تمتلك حساباً، قم بـ
                <span
                  className="text-primary font-bold cursor-pointer"
                  onClick={() => {
                    closeModal();
                    openModal("signin");
                  }}
                >
                  تسجيل الدخول
                </span>
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
