import "@/app/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full flex">
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
}
