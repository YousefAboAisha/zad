import EditProfileForm from "@/components/editProfileForm";
import PageTitles from "@/components/UI/typography/pageTitles";
import React from "react";

const Edit = () => {
  return (
    <div className="container">
      <div className=" w-full md:w-7/12 mx-auto mt-28">
        <PageTitles title="تعديل  البيانات" />
        <EditProfileForm />
      </div>
    </div>
  );
};

export default Edit;
