import PageTitles from "@/components/UI/typography/pageTitles";
import SubscriptionDetails from "@/containers/profile/subscriptionDetails";

const Profile = () => {
  return (
    <>
      <div className="container">
        <div className="mt-28">
          <PageTitles title="الصفحة الشخصية" />
          <SubscriptionDetails />
        </div>
      </div>
    </>
  );
};

export default Profile;
