import { ErrorMessage, Field, Form, Formik } from "formik";
import { BiCalendarAlt } from "react-icons/bi";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { FiArrowDown } from "react-icons/fi";
import { PiShootingStarThin } from "react-icons/pi";
import * as Yup from "yup";
import Heading from "@/components/UI/typography/heading";
import Select from "@/components/UI/inputs/selectInput";
import Input from "@/components/UI/inputs/input";
import Button from "@/components/UI/inputs/button";

const AddSubscription = () => {
  const initialValues = {
    leasingType: "",
    start_date: "",
    end_date: "",
    room_id: "",
    seat_id: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    leasingType: Yup.string().required("يرجى اختيار نوع الاشتراك"), // Leasing type is required
    start_date: Yup.date()
      .required("يرجى إدخال تاريخ البدء") // Start date is required
      .typeError("يرجى إدخال تاريخ صحيح"), // Ensure the input is a valid date
    end_date: Yup.date()
      .required("يرجى إدخال تاريخ الانتهاء") // End date is required
      .min(Yup.ref("start_date"), "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء") // End date must be after start date
      .typeError("يرجى إدخال تاريخ صحيح"), // Ensure the input is a valid date
    room_id: Yup.string()
      .required("يرجى إدخال رقم الغرفة") // Room ID is required
      .matches(/^[A-Za-z0-9]+$/, "يرجى إدخال رقم غرفة صالح"), // Alphanumeric room ID
    seat_id: Yup.string()
      .required("يرجى إدخال المقعد") // Seat ID is required
      .matches(/^[A-Za-z0-9]+$/, "يرجى إدخال مقعد صالح"), // Alphanumeric seat ID
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
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-8">
      <Heading
        highLightText="طلب اشتراك"
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
          <Form className="w-full flex flex-col gap-4">
            {/* Leasing Type Field */}
            <div>
              <Select
                disabled={isSubmitting}
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

            {/* Start Date Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <Field
                  disabled={isSubmitting}
                  name="start_date"
                  as={Input}
                  type="date"
                  placeholder="تاريخ البدء"
                  label="تاريخ البدء"
                  className={`focus:border-primary ${
                    errors.start_date && "!border-[red]"
                  }`}
                />
                <ErrorMessage
                  name="start_date"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              {/* End Date Field */}
              <div>
                <Field
                  disabled={isSubmitting}
                  name="end_date"
                  as={Input}
                  type="date"
                  placeholder="تاريخ الانتهاء"
                  label="تاريخ الانتهاء"
                  className={`focus:border-primary ${
                    errors.end_date && "!border-[red]"
                  }`}
                />
                <ErrorMessage
                  name="end_date"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>
            </div>

            {/* Room ID Field */}
            <div>
              <Select
                disabled={isSubmitting}
                label="رقم الغرفة"
                options={leasingPlansOptions}
                title="اختر رقم الغرفة.."
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

            {/* Seat ID Field */}
            <div>
              <Field
                disabled={isSubmitting}
                name="seat_id"
                as={Input}
                type="text"
                placeholder="المقعد"
                label="المقعد"
                icon={BiCalendarAlt}
                className={`focus:border-primary ${
                  errors.seat_id && "!border-[red]"
                }`}
              />
              <ErrorMessage
                name="seat_id"
                component="div"
                className="text-red-500 mt-2 font-bold text-[12px]"
              />
            </div>

            {/* Submit Button */}
            <Button
              title="إرسال"
              type="submit"
              className="bg-primary mt-2 w-full mx-auto"
              icon={<PiShootingStarThin size={22} />}
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSubscription;
