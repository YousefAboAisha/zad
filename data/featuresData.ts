import wifi from "../public/wifi.gif" 
import power from "../public/power.gif" 
import workspace from "../public/workspace.gif" 
import privacy from "../public/privacy.gif" 
import price from "../public/price.gif" 
import service from "../public/service.gif" 



export const featuresData = [
  {
    icon: wifi,
    title: "إنترنت سريع ومستقر",
    count: Math.floor(Math.random() * 151) + 50,
  },
  {
    icon: workspace,
    title: "بيئة هادئة",
    count: Math.floor(Math.random() * 151) + 50,
  },
  {
    icon: power,
    title: "كهرباء منتظمة",
    count: Math.floor(Math.random() * 151) + 50,
  },
  {
    icon: privacy,
    title: "خصوصية عالية",
    count: Math.floor(Math.random() * 151) + 50,
  },
  {
    icon: price,
    title: "أسعار منافسة",
    count: Math.floor(Math.random() * 151) + 50,
  },
  {
    icon: service,
    title: "خدمات بجودة عالية",
    count: Math.floor(Math.random() * 151) + 50,
  },
];