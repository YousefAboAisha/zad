import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePageTitle = () => {
  const router = useRouter();
  const [title, setTitle] = useState("Home");

  useEffect(() => {
    let path = router.pathname;

    if (!path) return;

    if (path === "/") path = "Zad | home";
    else path = "Zad | " + path.slice(1);

    setTitle(path.charAt(0).toUpperCase() + path.slice(1));
  }, [router.pathname]);

  return title;
};


export default usePageTitle;
