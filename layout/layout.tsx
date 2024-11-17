import React from "react";
import useLoading from "@/hooks/useLoading";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Spinner from "@/components/UI/utils/spinner";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const loading = useLoading();

  return loading ? (
    // Change the spinner into the animated Zad's Logo
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
