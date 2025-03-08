import * as Yup from "yup";
import Input from "@/components/UI/inputs/input";
import { PiShootingStarThin } from "react-icons/pi";
import Select from "@/components/UI/inputs/selectInput";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { paymentMethodsOptions } from "@/data/paymentMethodsOptions";
import TextArea from "@/components/UI/inputs/textArea";
import Heading from "@/components/UI/typography/heading";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DailySubscriptionInterface,
  MonthlySubscriptionInterface,
  WeeklySubscriptionInterface,
} from "@/app/interfaces";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SubscriptionType } from "@/app/enums";
import { FiArrowDown } from "react-icons/fi";
import Button from "@/components/UI/inputs/button";

type ModalType = {
  setModal: Dispatch<SetStateAction<boolean>>;
  id: string;
  refetch: () => void;
  data?:
    | DailySubscriptionInterface
    | WeeklySubscriptionInterface
    | MonthlySubscriptionInterface
    | undefined;
};

export const EditSubscription = ({
  setModal,
  id,
  refetch,
  data,
}: ModalType) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const {
    subscription_type = "",
    start_date = "",
    end_date = "",
    payment_method = "",
    notes = "",
  } = data || {};

  const [initialValues, setInitialValues] = useState({
    subscription_type: "",
    start_date: "",
    end_date: "",
    payment_method: "",
    notes: "",
  });

  useEffect(() => {
    setInitialValues({
      subscription_type,
      start_date:
        typeof start_date === "string"
          ? start_date
          : start_date.toISOString().split("T")[0],
      end_date:
        typeof end_date === "string"
          ? end_date
          : end_date.toISOString().split("T")[0],
      payment_method,
      notes,
    });
    console.log("Data", data);
  }, [id]);

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

  const editSubscription = async (
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

      const response = await fetch(`/api/subscription/update/${id}`, {
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
      toast.success("تم تعديل الطلب بنجاح");
      setModal(false);
      refetch();
    } catch (error) {
      setSubmitting(false);

      setFormErrors((error as Error).message || "حدث خطأ غير متوقع");
      console.error("Error while updating user", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-8 w-full">
      <Heading
        title=""
        highLightText="تعديل الطلب"
        highlightColor="before:bg-primary"
        className="mb-4 w-fit text-[14px] mx-auto"
        additionalStyles="text-[28px]"
      />

      <Formik
        initialValues={initialValues} // Use the state for initialValues
        validationSchema={validationSchema}
        onSubmit={editSubscription}
        enableReinitialize // Allow Formik to reinitialize when initialValues change
      >
        {({ setFieldValue, values, isSubmitting, errors }) => {
          console.log("Values are", values);

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
                title="حفظ البيانات"
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
