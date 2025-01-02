import CustomerProfile from "@/components/customerProfile";
import Navbar from "@/components/navbar";
import PageTitles from "@/components/UI/typography/pageTitles";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="mt-28">
          <PageTitles title="الصفحة الشخصية" />
          <CustomerProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
