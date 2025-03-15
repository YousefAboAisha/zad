import { useEffect, useState } from "react"; // Import useEffect
import { ErrorMessage, Field, Form, Formik } from "formik";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { FiArrowDown } from "react-icons/fi";
import { PiShootingStarThin } from "react-icons/pi";
import * as Yup from "yup";
import Heading from "@/components/UI/typography/heading";
import Select from "@/components/UI/inputs/selectInput";
import Input from "@/components/UI/inputs/input";
import Button from "@/components/UI/inputs/button";
import TextArea from "../../components/UI/inputs/textArea";
import { paymentMethodsOptions } from "@/data/paymentMethodsOptions";
import { SubscriptionType } from "@/app/enums";
import { API_BASE_URL } from "@/config";

const AddSubscription = () => {
  const [formErrors, setFormErrors] = useState<string>("");

  const initialValues = {
    subscription_type: "",
    start_date: "",
    end_date: "",
    payment_method: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    subscription_type: Yup.string().required("يرجى اختيار نوع الاشتراك"),
    start_date: Yup.date()
      .required("يرجى إدخال تاريخ البدء")
      .typeError("يرجى إدخال تاريخ صحيح")
      .test("is-future-date", "وقت البدء يجب أن يكون صحيحاً", function (value) {
        const nowDate = new Date();
        return value > nowDate;
      }),
    payment_method: Yup.string().required("يرجى اختيار طريقة الدفع "),
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
      const response = await fetch(`${API_BASE_URL}/user/subscription/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        setFormErrors(data.error);
        console.log("Sign in Error:", data.error);
        return;
      }

      window.location.reload();
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
        {({ setFieldValue, values, isSubmitting, errors }) => {
          console.log("Valuse are", values);

          // Use useEffect to watch for changes in leasingType and start_date
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (values.subscription_type && values.start_date) {
              const startDate = new Date(values.start_date);
              let endDate;

              // If the value is eqaul to "Weekly subscription"
              if (values.subscription_type === SubscriptionType.WEEKLY) {
                endDate = new Date(startDate.setDate(startDate.getDate() + 7));
                // If the value is eqaul to "Monthly subscription"
              } else if (
                values.subscription_type === SubscriptionType.MONTHLY
              ) {
                endDate = new Date(startDate.setDate(startDate.getDate() + 30));
              }

              if (endDate) {
                setFieldValue("end_date", endDate.toISOString().split("T")[0]);
              }
            }
          }, [values.subscription_type, values.start_date, setFieldValue]);

          return (
            <Form className="w-full flex flex-col gap-4">
              {/* Leasing Type Field */}
              <div>
                <Select
                  disabled={isSubmitting}
                  label="نوع الاشتراك"
                  options={leasingPlansOptions}
                  title="اختر نوع الاشتراك.."
                  icon={<FiArrowDown />}
                  value={values.subscription_type}
                  onChange={(e) =>
                    setFieldValue("subscription_type", e.target.value)
                  }
                  className={`focus:border-primary ${
                    errors.subscription_type && "!border-[red]"
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
                    disabled
                    name="end_date"
                    as={Input}
                    type="date"
                    placeholder="تاريخ الانتهاء"
                    label="تاريخ الانتهاء"
                    className={`focus:border-primary`}
                    value={values.end_date}
                    required={false}
                  />
                </div>
              </div>

              {/* Payment Method Field */}
              <div>
                <Select
                  disabled={isSubmitting}
                  label="طريقة الدفع"
                  options={paymentMethodsOptions}
                  title="اختر طريقة الدفع.."
                  icon={<FiArrowDown />}
                  value={values.payment_method}
                  onChange={(e) =>
                    setFieldValue("payment_method", e.target.value)
                  }
                  className={`focus:border-primary ${
                    errors.payment_method && "!border-[red]"
                  }`}
                />
                <ErrorMessage
                  name="payment_method"
                  component="div"
                  className="text-red-500 mt-2 font-bold text-[12px]"
                />
              </div>

              <div>
                <Field
                  name="notes"
                  as={TextArea}
                  type="date"
                  placeholder="اكتب أي ملاحظات هنا.."
                  label="الملاحظات"
                  className={`w-full focus:border-primary`}
                  value={values.notes}
                  required={false}
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

              {formErrors && (
                <div className="rounded-lg p-4 w-full bg-red-100 text-[red] text-sm">
                  {formErrors}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddSubscription;
