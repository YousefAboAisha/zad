import { PaymentMethod, SubscriptionType } from "@/app/enums";

export const subscriptionTypeConverter = (type: string | undefined) => {
  let text = "";
  if (type == SubscriptionType.WEEKLY) {
    return (text = "أسبوعي");
  } else if (type == SubscriptionType.MONTHLY) {
    text = "شهري";
  } else {
    return;
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

export const dateFormating = (date: string | number | Date | undefined) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};
