import React from "react";
import useLoading from "@/hooks/useLoading";
import Spinner from "@/components/UI/utils/spinner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const loading = useLoading();

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Navbar />
      <main className="mt-[70px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;