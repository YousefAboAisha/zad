import EditProfileForm from "@/components/UI/Forms/editProfileForm";
import PageTitles from "@/components/UI/typography/pageTitles";

const Edit = () => {
  return (
    <div className="container">
      <div className=" w-full md:8/12 lg:w-7/12  mx-auto mt-28">
        <PageTitles title="تعديل  البيانات" />
        <EditProfileForm />
      </div>
    </div>
  );
};

export default Edit;
