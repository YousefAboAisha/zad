import CustomerProfile from "@/components/customerProfile";
import PageTitles from "@/components/UI/typography/pageTitles";
import React from "react";

const Profile = () => {
  return (
    <div className="container">
      <div className="mt-28">
        <PageTitles title="الصقحة الشخصية" />
        <CustomerProfile />
      </div>
    </div>
  );
};

export default Profile;
