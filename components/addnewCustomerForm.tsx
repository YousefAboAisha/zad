import { FormEvent, useState } from "react";
import Input from "./UI/inputs/input";
import { BiMailSend, BiPhone, BiStar, BiUser } from "react-icons/bi";
import Select from "./UI/inputs/selectInput";
import { FiArrowDown, FiSend } from "react-icons/fi";
import Button from "./UI/inputs/button";
import { leasingPlansOptions } from "@/data/leasingPlansOptions";
import Heading from "./UI/typography/heading";
import { paymentMethodsOptions } from "@/data/paymentMethodsOptions";

const AddnewCustomerForm = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    setCustomerForm({
      ...customerForm,
      date: date,
    });
  };

  const [activeTap, setActiveTap] = useState("newCustomer");

  const [customerForm, setCustomerForm] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
    profession: string;
    startDate: string;
    endDate: string;
    paymentMethod: string;
    feeIsPaid: string;
    leasingType: string;
    date: string;
  }>({
    name: "",
    email: "",
    phoneNumber: "",
    profession: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
    feeIsPaid: "no",
    leasingType: "",
    date: "",
  });

  return (
    <div className="mt-24 w-full md:w-9/12 mx-auto">
      <div className="flex items-center w-full mb-8 border-b-2">
        <span
          onClick={() => setActiveTap("newCustomer")}
          className={`p-4 cursor-pointer hover:bg-gray-200 duration-100 ${
            activeTap == "newCustomer" ? "bg-gray-200" : ""
          }`}
        >
          إضافة زبون جديد
        </span>
        <span
          onClick={() => setActiveTap("resubscripe")}
          className={`p-4 cursor-pointer hover:bg-gray-200 duration-100 ${
            activeTap == "resubscripe" ? "bg-gray-200" : ""
          }`}
        >
          تجديد الاشتراك
        </span>
      </div>

      {activeTap === "newCustomer" ? (
        <form
          className="flex flex-col gap-4 border p-8 rounded-2xl shadow-sm"
          onSubmit={(e) => submitHandler(e)}
        >
          <Heading
            title=""
            highLightText="إضافة زبون جديد"
            highlightColor="before:bg-blue"
            className="mb-8 w-fit text-[16px]"
            additionalStyles="text-[28px]"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="الاسم رباعياً"
              type="text"
              placeholder="الاسم رباعي"
              icon={BiUser}
              required
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  name: e.target.value,
                })
              }
              value={customerForm.name}
            />

            <Input
              label="البريد الالكتروني"
              type="email"
              placeholder="البريد الالكتروني"
              icon={BiMailSend}
              required
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  email: e.target.value,
                })
              }
              value={customerForm.email}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="رقم الجوال"
              type="text"
              placeholder="رقم الجوال"
              icon={BiPhone}
              required
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  phoneNumber: e.target.value,
                })
              }
              value={customerForm.phoneNumber}
            />

            <Input
              label="تخصصك الدراسي أو المهني"
              type="text"
              placeholder="التخصص"
              icon={BiStar}
              required
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  profession: e.target.value,
                })
              }
              value={customerForm.profession}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="تاريخ البدء"
              type="date"
              placeholder="تاريخ البدء"
              required
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  startDate: e.target.value,
                })
              }
              value={customerForm.startDate}
            />

            <Input
              label="تاريخ الانتهاء"
              type="date"
              placeholder="تاريخ الانتهاء"
              required
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  endDate: e.target.value,
                })
              }
              value={customerForm.endDate}
            />
          </div>

          <Select
          label="اختر خطة الاشتراك"
            options={leasingPlansOptions}
            title="اختر نوع الاشتراك.."
            icon={<FiArrowDown />}
            required
            onChange={(e) =>
              setCustomerForm({
                ...customerForm,
                leasingType: e.target.value,
              })
            }
            value={customerForm.leasingType}
          />

          <hr />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex items-center gap-4 justify-between">
              تم استلام المبلغ
              <div className="flex items-center justify-center gap-8">
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <span>نعم</span>
                  <Input
                    placeholder=""
                    type="radio"
                    name="feeIsPaid"
                    id="yes"
                    required
                    value="yes"
                    onChange={(e) =>
                      setCustomerForm({
                        ...customerForm,
                        feeIsPaid: e.target.value,
                      })
                    }
                    className="w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <span>لا</span>
                  <Input
                    placeholder=""
                    type="radio"
                    name="feeIsPaid"
                    id="no"
                    required
                    value="no"
                    onChange={(e) =>
                      setCustomerForm({
                        ...customerForm,
                        feeIsPaid: e.target.value,
                      })
                    }
                    className="w-4 h-4"
                  />
                </label>
              </div>
            </div>

            <Select
              options={paymentMethodsOptions}
              title="نوع الدفع"
              icon={<FiArrowDown />}
              required
              onChange={(e) =>
                setCustomerForm({
                  ...customerForm,
                  paymentMethod: e.target.value,
                })
              }
              value={customerForm.paymentMethod}
              disabled={customerForm.feeIsPaid === "no"} // Disable when "no" is selected
            />
          </div>

          <Button
            title="إرسال"
            className="bg-blue mt-10 lg:w-4/12 md:w-6/12 w-full"
            icon={<FiSend />}
          />
        </form>
      ) : (
        <div>fae</div>
      )}
    </div>
  );
};

export default AddnewCustomerForm;
