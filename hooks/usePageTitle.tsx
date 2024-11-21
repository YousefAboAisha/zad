import { useRouter } from "next/router";

const usePageTitle = () => {
  const router = useRouter();
  let path = router.pathname;

  if (path == "/") path = "Home";
  else {
    path = path.slice(1)
  }

  return path;
};

export default usePageTitle;
