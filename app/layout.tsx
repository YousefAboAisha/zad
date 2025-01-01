"use client";
import { ModalProvider } from "@/context/modalContext";
import Spinner from "@/components/UI/utils/spinner";
import "@/styles/globals.css";
import useLoading from "@/hooks/useLoading";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loading = useLoading();

  return (
    <html lang="ar">
      <ModalProvider>
        <body suppressHydrationWarning={true} dir="rtl">
          {loading ? <Spinner /> : children}
        </body>
      </ModalProvider>
    </html>
  );
}
