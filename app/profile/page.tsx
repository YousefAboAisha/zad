import CustomerProfile from "@/components/customerProfile";
import PageTitles from "@/components/UI/typography/pageTitles";

const Profile = () => {
  return (
    <>
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
