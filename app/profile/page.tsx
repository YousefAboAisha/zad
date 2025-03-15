import PageTitles from "@/components/UI/typography/pageTitles";
import UserProfileWrapper from "@/wrappers/userProfileWrapper";

const Profile = () => {
  return (
    <div className="container">
      <div className="mt-28">
        <PageTitles title="الصفحة الشخصية" />
        <UserProfileWrapper />
      </div>
    </div>
  );
};

export default Profile;
