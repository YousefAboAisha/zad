"use client";
import React, { useEffect, useState } from "react";

const ArabicDateAndTime = () => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDate(new Date()); // Initialize date only on the client side
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, []);

  if (!date) return null; // Don't render anything until the date is initialized

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const arabicDate = date.toLocaleDateString("ar-EG", options);
  const arabicTime = date.toLocaleTimeString("ar-EG");

  return (
    <div className="flex items-center gap-4 text-lg p-2">
      <p>{arabicDate}</p>
      <p>{arabicTime}</p>
    </div>
  );
};

export default ArabicDateAndTime;
