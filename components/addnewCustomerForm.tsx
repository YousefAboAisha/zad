import { useState } from "react";

import AddNewCustomerTap from "./addNewCustomerTap";
import ReSubscripeTap from "./reSubscripeTap";

const AddnewCustomerForm = () => {
  const [activeTap, setActiveTap] = useState("newCustomer");

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

      {activeTap === "newCustomer" ? <AddNewCustomerTap /> : <ReSubscripeTap />}
    </div>
  );
};

export default AddnewCustomerForm;
