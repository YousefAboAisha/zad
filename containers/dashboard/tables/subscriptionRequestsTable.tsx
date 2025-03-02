import { UserInterface } from "@/app/interfaces";
import Button from "@/components/UI/inputs/button";
import Modal from "@/components/UI/modals/modal";
import { dateFormating, subscriptionTypeConverter } from "@/utils/conversions";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { FiArrowDown, FiCheck, FiEdit3, FiTrash } from "react-icons/fi";
import { SubscriptionStatus, SubscriptionType } from "@/app/enums";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

type SubscriptionRequestsTableType = {
  data: UserInterface[];
  fetchData: () => void;
};

const SubscriptionRequestsTable = ({
  data,
  fetchData,
}: SubscriptionRequestsTableType) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<"approve" | "edit" | "delete">();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderredModal = () => {
    if (!selectedId) return null;
    if (modalName === "approve")
      return (
        <ApproveSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData}
        />
      );
    if (modalName === "edit")
      return (
        <EditSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData}
        />
      );
    if (modalName === "delete")
      return (
        <DeleteSubscription
          setModal={setIsOpenModal}
          id={selectedId}
          refetch={fetchData}
        />
      );
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-sm py-3 px-4 border-b text-right">الاسم</th>
            <th className="text-sm py-3 px-4 border-b text-right">
              البريد الإلكتروني
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">
              رقم الهاتف
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">التخصص</th>
            <th className="text-sm py-3 px-4 border-b text-right">
              نوع الاشتراك
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">
              تاريخ البدء
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">
              تاريخ الانتهاء
            </th>
            <th className="text-sm py-3 px-4 border-b text-right">الحالة</th>
            <th className="text-sm py-3 px-4 border-b text-right">العمليات</th>
          </tr>
        </thead>

        <tbody className="w-full">
          {data && data.length > 0 ? (
            data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.name}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.email}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.phoneNumber}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {user.profession}
                </td>
                <td className={`text-sm py-3 px-4 border-b text-right`}>
                  <div
                    className={`p-2 text-center text-white rounded-md text-[13px] ${
                      user.active_subscription?.subscription_type ===
                      SubscriptionType.MONTHLY
                        ? "bg-secondary"
                        : "bg-blue"
                    }`}
                  >
                    {subscriptionTypeConverter(
                      user.active_subscription?.subscription_type
                    )}
                  </div>
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {dateFormating(user.active_subscription?.start_date)}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  {dateFormating(user.active_subscription?.end_date)}
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  <BsCircleFill className="text-[orange] mx-auto" size={10} />
                </td>
                <td className="text-sm py-3 px-4 border-b text-right">
                  <div className="flex items-center gap-3">
                    <FiCheck
                      size={18}
                      className="text-[green] cursor-pointer"
                      title="تأكيد الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("approve");
                        setSelectedId(user._id as string);
                      }}
                    />
                    <FiEdit3
                      size={16}
                      className="cursor-pointer"
                      title="تعديل الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("edit");
                        setSelectedId(user._id as string);
                      }}
                    />
                    <FiTrash
                      size={16}
                      className="text-[red] cursor-pointer"
                      title="حذف الحجز"
                      onClick={() => {
                        setIsOpenModal(true);
                        setModalName("delete");
                        setSelectedId(user._id as string);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center text-gray-500 py-4 h-40">
                لا توجد طلبات اشتراك حالية!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        zIndex="z-[1000]"
        containerClassName="lg:w-[31%]"
      >
        {renderredModal()}
      </Modal>
    </div>
  );
};

type ModalType = {
  setModal: Dispatch<SetStateAction<boolean>>;
  id: string;
  refetch: () => void; // 🔄 Accept refetch function as prop
};

const ApproveSubscription = ({ setModal, id, refetch }: ModalType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubscriptionStatus = async () => {
    setLoading(true);
    console.log("The user ID is:", id);

    try {
      const response = await fetch(`/api/subscription/updateStatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: SubscriptionStatus.ACTIVE }),
      });

      const res = await response.json();

      console.log("Edit status response", res);
      toast.success("تم بدء الاشتراك بنجاح!");
      setLoading(false);
      setModal(false);

      refetch(); // 🔄 Refetch data after update
    } catch (error) {
      setLoading(false);
      console.error("Error updating status:", error);
      alert("حدث خطأ أثناء تحديث الحالة");
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={35} />
        <h2 className="text-xl font-bold">تأكيد الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى تأكيد الحجز وبدء الاشتراك، هل أنت متأكد من ذلك؟
      </p>

      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button
          loading={loading}
          disabled={loading}
          title="بدء الآن"
          className="bg-primary"
          hasShiningBar={false}
          onClick={handleSubscriptionStatus}
        />
        <Button
          title="إلغاء الأمر"
          className="!text-red-500 !shadow"
          hasShiningBar={false}
          onClick={() => setModal(false)}
          disabled={loading}
        />
      </div>
    </div>
  );
};

import * as Yup from "yup";
import Input from "@/components/UI/inputs/input";
import { PiShootingStarThin } from "react-icons/pi";
import Select from "@/components/UI/inputs/selectInput";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import { paymentMethodsOptions } from "@/data/paymentMethodsOptions";
import TextArea from "@/components/UI/inputs/textArea";
import Heading from "@/components/UI/typography/heading";

const EditSubscription = ({ setModal, id, refetch }: ModalType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [formErrors, setFormErrors] = useState<string>("");

  const [initialValues, setInitialValues] = useState({
    subscription_type: "",
    start_date: "",
    end_date: "",
    payment_method: "",
    notes: "",
  });

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

      const response = await fetch(`/api/subscription/editRequest/${id}`, {
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

  // Get the previous user details, and set them as initial values for the form
  const getSubscriptionDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/subscription/fetch/${id}`);

      const res = await response.json();
      console.log("Subscription [Response]", res);

      if (res) {
        console.log("Subscription Details Data", res);
        setInitialValues({
          subscription_type: res.data.subscription_type,
          start_date: res.data.start_date,
          end_date: res.data.end_date,
          payment_method: res.data.payment_method,
          notes: res.data.notes,
        });

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Fetching userDetails failed:", error);
    }
  };

  useEffect(() => {
    getSubscriptionDetails();
  }, [id]);

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

          if (loading) {
            return (
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex flex-col gap-1">
                  <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
                  <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
                    <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
                    <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
                  <div className="h-12 bg-gray-300 rounded-lg w-full animate-pulse"></div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="h-3 bg-gray-300 rounded-lg w-20 animate-pulse"></div>
                  <div className="h-20 bg-gray-300 rounded-lg w-full animate-pulse"></div>
                </div>
              </div>
            );
          }

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

const DeleteSubscription = ({ setModal, id, refetch }: ModalType) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteSubscriptionRequest = async () => {
    setLoading(true);
    console.log("The user ID is:", id);

    try {
      const response = await fetch(`/api/subscription/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();

      console.log("Edit status response", res);
      toast.warn("تم حذف الاشتراك بنجاح!");
      setLoading(false);
      setModal(false);

      refetch(); // 🔄 Refetch data after update
    } catch (error) {
      setLoading(false);
      console.error("Error updating status:", error);
      alert("حدث خطأ أثناء تحديث الحالة");
    }
  };
  return (
    <div className="flex flex-col bg-white p-8">
      <div className="flex items-center gap-2">
        <BiInfoCircle size={25} />
        <h2 className="text-xl font-bold">حذف الحجز</h2>
      </div>

      <hr className="mt-4" />

      <p className="mt-6">
        سيؤدي هذا الإجراء إلى حذف الحجز المحدد، هل أنت متأكد من ذلك؟
      </p>
      <div className="flex items-center gap-4 mt-6 w-10/12">
        <Button
          loading={loading}
          disabled={loading}
          title="حذف الآن"
          className="bg-[red]"
          hasShiningBar={false}
          onClick={() => deleteSubscriptionRequest()}
        />

        <Button
          disabled={loading}
          title="إلغاء الأمر"
          className="!text-red-500 !shadow"
          hasShiningBar={false}
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};

export default SubscriptionRequestsTable;
