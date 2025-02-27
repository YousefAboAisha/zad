"use client";
import PageTitles from "@/components/UI/typography/pageTitles";
import SubscriptionRequestsTable from "@/containers/dashboard/tables/subscriptionRequestsTable";

const SubscriptionRequests = () => {
  return (
    <div className="relative">
      <div className="mt-6">
        <PageTitles title="طلبات الانضمام" homePath="/dashboard" />
      </div>

      {/* Start cards-grid-4 */}
      <div className="cards-grid-4">
        <div className="relative p-8 bg-primary border rounded-xl flex flex-col items-center justify-center gap-4 text-white">
          <h4 className="text-xl font-bold">طلبات الانضمام</h4>
          <h2 className="text-7xl font-semibold">33</h2>
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
      {/* End cards-grid-4 */}

      <div className="relative mt-8">
        <SubscriptionRequestsTable />
      </div>
    </div>
  );
};

export default SubscriptionRequests;
