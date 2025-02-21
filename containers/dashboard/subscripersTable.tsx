import Button from "@/components/UI/inputs/button";
import React from "react";
import { BsCircleFill } from "react-icons/bs";
import {
  FiCheck,
  FiCircle,
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiTrash,
} from "react-icons/fi";

const SubscripersTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-right">الاسم</th>
            <th className="py-3 px-4 border-b text-right">البريد الإلكتروني</th>
            <th className="py-3 px-4 border-b text-right">رقم الهاتف</th>
            <th className="py-3 px-4 border-b text-right">التخصص</th>
            <th className="py-3 px-4 border-b text-right">وقت البدء</th>
            <th className="py-3 px-4 border-b text-right">وقت الانتهاء</th>
            <th className="py-3 px-4 border-b text-right">السعر</th>
            <th className="py-3 px-4 border-b text-right">الحالة</th>
            <th className="py-3 px-4 border-b text-right">العمليات</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-right">{item.name}</td>
              <td className="py-3 px-4 border-b text-right">{item.email}</td>
              <td className="py-3 px-4 border-b text-right">
                {item.phoneNumber}
              </td>
              <td className="py-3 px-4 border-b text-right">
                {item.profession}
              </td>
              <td className="py-3 px-4 border-b text-right">
                {item.startDate}
              </td>
              <td className="py-3 px-4 border-b text-right">{item.endDate}</td>
              <td className="py-3 px-4 border-b text-right">{item.price}</td>
              <td className="py-3 px-4 border-b text-right">
                <BsCircleFill className="text-[orange] mx-auto" size={10} />
              </td>
              <td className="py-3 px-4 border-b text-right">
                <div className="flex items-center gap-3">
                  <FiCheck
                    size={22}
                    className="text-[green] cursor-pointer"
                    title="إنهاء الحجز"
                  />
                  <FiEdit3
                    size={18}
                    className="cursor-pointer"
                    title="تعديل الحجز"
                  />
                  <FiTrash
                    size={18}
                    className="text-[red] cursor-pointer"
                    title="حذف الحجز"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscripersTable;
