"use client";
import PageTitles from "@/components/UI/typography/pageTitles";
import SubscripersTable from "@/containers/dashboard/tables/subscripersTable";
import { SubscriptionData } from "@/data/subscripersData";

const Subscripers = () => {
  return (
    <div>
      <div className="mt-6">
        <PageTitles title="المشتركين" homePath="/dashboard" />
      </div>

      {/* Start cards-grid-4 */}
      <div className="cards-grid-4">
        <div className="relative p-8 bg-primary border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
          <h4 className="text-xl font-bold">العدد الكُلي</h4>
          <h2 className="text-7xl font-semibold">235</h2>
        </div>

        <div className="relative p-8 bg-blue border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
          <h4 className="text-xl font-bold">الأسبوعية</h4>
          <h2 className="text-7xl font-semibold">20</h2>
        </div>

        <div className="relative p-8 bg-secondary border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
          <h4 className="text-xl font-bold">الشهرية</h4>
          <h2 className="text-7xl font-semibold">13</h2>
        </div>

        <div className="relative p-8 bg-[green] border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
          <h4 className="text-xl font-bold">المقاعد المتاحة</h4>
          <h2 className="text-7xl font-semibold">7</h2>
        </div>
      </div>

      <div className="relative mt-8">
        <SubscripersTable data={SubscriptionData} />
      </div>
    </div>
  );
};

export default Subscripers;
