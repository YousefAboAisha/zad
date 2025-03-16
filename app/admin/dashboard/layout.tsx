"use client";
import "@/app/globals.css";
import ArabicDateAndTime from "@/containers/dashboard/arabicDateAndTime ";
import Sidebar from "@/containers/dashboard/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full flex">
      <div className="relative w-[17%] min-h-screen">
        <Sidebar />
      </div>
      <div className="w-[83%] min-h-screen p-4 mb-8">
        {/* Date of the day, with clock  */}
        <div className="min-h-12">
          <ArabicDateAndTime />
        </div>
        {children}
      </div>
    </div>
  );
}
