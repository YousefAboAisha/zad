import { PaymentMethod } from "@/app/enums";

export const paymentMethodsOptions = [
  {
    title: "كاش",
    value: PaymentMethod.CASH,
  },
  {
    title: "بنكي",
    value: PaymentMethod.BOP,
  },
];
