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
import { API_BASE_URL } from "@/config";

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
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
  };

  const validationSchema = Yup.object().shape({
    subscriper_id: Yup.string().when("selectedOption", {
      is: "existing",
      then: (schema) => schema.required("يرجى تحديد المشترك"),
    }),
    name: Yup.string().when("selectedOption", {
      is: "new",
      then: (schema) => schema.required("يرجى إدخال اسم المشترك"),
    }),
    email: Yup.string().when("selectedOption", {
      is: "new",
      then: (schema) =>
        schema
          .email("يرجى إدخال بريد إلكتروني صحيح")
          .required("يرجى إدخال البريد الإلكتروني"),
    }),
    phoneNumber: Yup.string().when("selectedOption", {
      is: "new",
      then: (schema) => schema.required("يرجى إدخال رقم الهاتف"),
    }),
    profession: Yup.string().when("selectedOption", {
      is: "new",
      then: (schema) => schema.required("يرجى إدخال التخصص"),
    }),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setFormErrors("");

    try {
      let payload;
      let endpoint;

      if (selectedOption === "existing") {
        payload = { userId: values.subscriper_id };
        endpoint = "/admin/subscription/daily/create";
      } else {
        payload = {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          profession: values.profession,
        };
        endpoint = "/admin/users/create";
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Data Object is:", data);

      if (!response.ok) {
        setFormErrors(data.error);
        return;
      }
      resetForm();
      setSelectedOption("existing");
      fetchAllSubscripersData();
      fetchData();
      if (selectedOption === "existing") setIsOpen(false);
      console.log("Subscription created successfully!", data);
    } catch (error) {
      setFormErrors((error as Error).message);
      console.error("Error creating subscription", error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchAllSubscripersData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/fetch`);
      const result = await response.json();

      console.log("[Users Data]: ", result.data);
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
        context={{ selectedOption }}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => {
          console.log("subscriper_id", values.subscriper_id);
          console.log("setIsDatalistSelected", isDatalistSelected);
          console.log("[Form values]: ", values);

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

              {selectedOption === "existing" ? (
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
              ) : null}

              {selectedOption === "new" ? (
                <>
                  <div>
                    <Field
                      disabled={isSubmitting}
                      name="name"
                      as={Input}
                      type="text"
                      placeholder="مثال: محمد سامي محمود"
                      label="اسم المشترك"
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
                      disabled={isSubmitting}
                      name="email"
                      as={Input}
                      type="email"
                      label="البريد الالكتروني"
                      placeholder="example@gmail.com"
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
                      name="phoneNumber"
                      as={Input}
                      type="number"
                      label="رقم الهاتف"
                      placeholder="0569824542"
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
                      disabled={isSubmitting}
                      name="profession"
                      as={Input}
                      type="text"
                      label="التخصص"
                      placeholder="مثال: هندسة أنظمة الحاسوب"
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
                </>
              ) : null}

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
