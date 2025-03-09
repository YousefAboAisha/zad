import Button from "@/components/UI/inputs/button";
import Input from "@/components/UI/inputs/input";
import Heading from "@/components/UI/typography/heading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { FiPlus } from "react-icons/fi";
import { BiHourglass } from "react-icons/bi";

type AddDailySubscription = {
  fetchData: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AddDailySubscription = ({
  fetchData,
  setIsOpen,
}: AddDailySubscription) => {
  const [formErrors, setFormErrors] = useState<string>("");
  const [isDatalistSelected, setIsDatalistSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"existing" | "new">(
    "existing"
  );
  const [allUsersData, setAllUsersData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    subscriper_id: "",
    subscriper_name: "",
    new_subscriper_name: "",
    new_subscriper_email: "",
    new_subscriper_phoneNumber: "",
    new_subscriper_profession: "",
  };

  const validationSchema = Yup.object({
    new_subscriper_id: Yup.string().when("$isDatalistSelected", {
      is: false,
      then: (schema) => schema.required("يرجى إدخال اسم المشترك"),
    }),
    new_subscriper_name: Yup.string().when("$isDatalistSelected", {
      is: false,
      then: (schema) => schema.required("يرجى إدخال اسم المشترك"),
    }),
    new_subscriper_email: Yup.string().when("$isDatalistSelected", {
      is: false,
      then: (schema) =>
        schema
          .email("يرجى إدخال بريد إلكتروني صحيح")
          .required("يرجى إدخال البريد الإلكتروني"),
    }),
    new_subscriper_phoneNumber: Yup.string().when("$isDatalistSelected", {
      is: false,
      then: (schema) => schema.required("يرجى إدخال رقم الهاتف"),
    }),
    new_subscriper_profession: Yup.string().when("$isDatalistSelected", {
      is: false,
      then: (schema) => schema.required("يرجى إدخال التخصص"),
    }),
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
      const response = await fetch("/api/dailySubscripers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: values.subscriper_id }),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        setFormErrors(data.error);
        console.log("Sign in Error:", data.error);
        return;
      }

      setIsOpen(false);
      fetchData();
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

  const fetchAllSubscripersData = async () => {
    try {
      const response = await fetch("/api/users/fetch");
      const result = await response.json();
      console.log("Result", result.data);
      setAllUsersData(result.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setLoading(false);
      } else {
        setError(String(error));
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSubscripersData();
  }, []);

  return (
    <div className="flex flex-col items-center bg-white p-8">
      <Heading
        highLightText="الاشتراك اليومي"
        title=""
        highlightColor="before:bg-primary"
        className="mb-8 mx-auto"
        additionalStyles="text-[25px] text-center mx-auto"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        context={{ isDatalistSelected }}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => {
          console.log("subscriper_id", values.subscriper_id);
          console.log("setIsDatalistSelected", isDatalistSelected);

          return (
            <Form className="w-full flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <p
                  className={`text-sm p-4 text-center cursor-pointer duration-100 rounded-lg border ${
                    selectedOption == "existing" && " bg-gray-200"
                  }`}
                  onClick={() => setSelectedOption("existing")}
                >
                  البحث عن مشترك
                </p>
                <p
                  className={`text-sm p-4 text-center cursor-pointer duration-100 rounded-lg border ${
                    selectedOption == "new" && "bg-gray-200"
                  }`}
                  onClick={() => setSelectedOption("new")}
                >
                  إضافة مشترك جديد
                </p>
              </div>

              {selectedOption === "existing" && (
                <div>
                  <DatalistInput
                    onSelect={(item) => {
                      setFieldValue("subscriper_id", item.id);
                      setIsDatalistSelected(item.value.trim() !== "");
                    }}
                    placeholder={
                      loading ? "جارٍ جلب البيانات..." : "مثال: محمد محمود"
                    }
                    label="اختر اسم المشترك"
                    items={loading ? [] : allUsersData} // ✅ Prevents focusable items while loading
                    inputProps={{
                      className: "h-[56px] !pr-4 !focus-visible:border-primary",
                      disabled: loading, // ✅ Disable while loading
                      inert: loading, // ✅ Prevents focus inside dropdown while loading
                    }}
                    labelProps={{ className: "!mb-1 block text-[12px]" }}
                    listboxOptionProps={{
                      className: "!list-none !p-3",
                      inert: loading, // ✅ Prevents focus inside dropdown while loading
                    }}
                    highlightProps={{ className: "!bg-primary" }}
                  />

                  <ErrorMessage
                    name="subscriper_id"
                    component="div"
                    className="text-red-500 mt-2 font-bold text-[12px] focus-visible:"
                  />
                </div>
              )}

              {selectedOption === "new" && (
                <>
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="new_subscriper_name"
                      as={Input}
                      type="text"
                      placeholder="مثال: محمد سامي محمود"
                      label="اسم المشترك"
                      className={`focus:border-primary ${
                        errors.new_subscriper_name && "!border-[red]"
                      }`}
                    />
                    <ErrorMessage
                      name="new_subscriper_name"
                      component="div"
                      className="text-red-500 mt-2 font-bold text-[12px]"
                    />
                  </div>

                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="new_subscriper_email"
                      as={Input}
                      type="email"
                      label="البريد الالكتروني"
                      placeholder="example@gmail.com"
                      className={`focus:border-primary ${
                        errors.new_subscriper_email && "!border-[red]"
                      }`}
                    />
                    <ErrorMessage
                      name="new_subscriper_email"
                      component="div"
                      className="text-red-500 mt-2 font-bold text-[12px]"
                    />
                  </div>

                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="new_subscriper_phoneNumber"
                      as={Input}
                      type="number"
                      label="رقم الهاتف"
                      placeholder="0569824542"
                      className={`focus:border-primary ${
                        errors.new_subscriper_phoneNumber && "!border-[red]"
                      }`}
                    />
                    <ErrorMessage
                      name="new_subscriper_phoneNumber"
                      component="div"
                      className="text-red-500 mt-2 font-bold text-[12px]"
                    />
                  </div>

                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="new_subscriper_profession"
                      as={Input}
                      type="text"
                      label="التخصص"
                      placeholder="مثال: هندسة أنظمة الحاسوب"
                      className={`focus:border-primary ${
                        errors.new_subscriper_profession && "!border-[red]"
                      }`}
                    />
                    <ErrorMessage
                      name="new_subscriper_profession"
                      component="div"
                      className="text-red-500 mt-2 font-bold text-[12px]"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <Button
                title={selectedOption == "new" ? "إضافة" : "بدء الاشتراك"}
                type="submit"
                className="bg-primary mt-2 w-full mx-auto"
                icon={
                  selectedOption == "new" ? (
                    <FiPlus />
                  ) : (
                    <BiHourglass size={22} />
                  )
                }
                disabled={isSubmitting}
                loading={isSubmitting}
                hasShiningBar={false}
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

export default AddDailySubscription;
