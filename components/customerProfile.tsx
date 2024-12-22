const CustomerProfile = () => {
  return (
    <div className="relative">
      {/* Customer's name  */}
      <div className="flex items-center gap-1 mt-28">
        <h2 className="text-2xl">مرحباً بعودتك،</h2>
        <h2 className="font-bold text-lg">يوسف رشاد أبو عيشة</h2>
      </div>

      <div className="cards-grid-3 mt-12">
        {/* Start date */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl text-white bg-[#AA5486]">
          <p>تاريخ البدء</p>
          <h2 className="font-bold text-4xl">16/ 12/ 2024</h2>
        </div>

        {/* End Date */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl text-white bg-[#4DA1A9]">
          <p>تاريخ الانتهاء</p>
          <h2 className="font-bold text-4xl">16/ 1/ 2025</h2>
        </div>

        {/* Subscription type */}
        <div className="flex flex-col items-center justify-center p-8 gap-2 rounded-2xl bg-[#1E3250] text-white row-span-2">
          <p className="text-lg">متبقي</p>
          <h2 className="font-bold text-9xl ">7</h2>
          <p className="text-lg">أيام</p>
        </div>

        {/* Subscription type */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-[#f39c12] text-white">
          <p>نوع الاشتراك</p>
          <h2 className="font-bold text-4xl">أسبوعي</h2>
        </div>

        {/* Subscription type */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-[#5CB338] text-white">
          <p>رقم الغرفة</p>
          <h2 className="font-bold text-5xl">A</h2>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
