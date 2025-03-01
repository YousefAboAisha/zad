import { useEffect, useState } from "react";
import { BsWifiOff } from "react-icons/bs";

const NoInternet = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (!isOnline) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[70vh] gap-3">
        <BsWifiOff size={60} />
        <h2>لا يوجد اتصال بالإنترنت</h2>
      </div>
    );
  }
  return null;
};

export default NoInternet;
