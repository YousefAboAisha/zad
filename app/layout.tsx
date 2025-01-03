import "@/styles/globals.css";

// export async function generateMetadata() {
//   return {
//     title: {
//       default: "Zad | About",
//       template: "%s",
//     },
//     description: "Generated by create next app",
//     icons: {
//       apple: "/zad-logo.svg",
//       icon: "/zad-logo.svg",
//     },
//   };
// }

// Viewport export remains separate
// export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body suppressHydrationWarning={true} dir="rtl">
        {children}
      </body>
    </html>
  );
}
