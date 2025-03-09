import {
  PaymentMethod,
  SubscriptionStatus,
  SubscriptionType,
} from "@/app/enums";

export const subscriptionTypeConverter = (type: string | undefined) => {
  let text = "";
  if (type == SubscriptionType.WEEKLY) {
    return (text = "أسبوعي");
  } else if (type == SubscriptionType.MONTHLY) {
    text = "شهري";
  } else if (type == SubscriptionType.DAILY) {
    text = "يومي";
  }
  return text;
};

export const paymentMethodConverter = (type: string | undefined) => {
  let text = "";
  if (type == PaymentMethod.CASH) {
    return (text = "كاش");
  } else if (type == PaymentMethod.BOP) {
    text = "بنكي";
  } else {
    return;
  }
  return text;
};

export const subscriptionStausConverter = (type: string | undefined) => {
  let text = "";
  if (type == SubscriptionStatus.PENDING) {
    return (text = "انتظار");
  } else if (SubscriptionStatus.ACTIVE) {
    text = "فعّال";
  } else if (SubscriptionStatus.EXPIRED) {
    text = "مُنتهي";
  }
  return text;
};

export const dateFormating = (date: string | number | Date | undefined) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const timeFormatting = (date: string | number | Date | undefined) => {
  if (!date) return "";

  const d = new Date(date);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return formatTime(d);
};
