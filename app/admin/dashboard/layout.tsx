import "@/app/globals.css";
import DateAndTimeWrapper from "@/wrappers/dateAndTimeWrapper";
import SidebarWrapper from "@/wrappers/sidebarWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full flex">
      <div className="relative w-[17%] min-h-screen">
        <SidebarWrapper />
      </div>
      <div className="w-[83%] min-h-screen p-4 mb-8">
        {/* Date of the day, with clock  */}
        <div className="min-h-12">
          <DateAndTimeWrapper />
        </div>
        {children}
      </div>
    </div>
  );
}
