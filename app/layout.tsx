import "@/app/globals.css";
import NavbarWrapper from "./navbarWrapper";

export async function generateMetadata() {
  return {
    title: {
      default: "Zad | Community space",
      template: "%s",
    },
    description: "Generated by create next app",
    icons: {
      apple: "/zad-logo.svg",
      icon: "/zad-logo.svg",
    },
  };
}

// Viewport export remains separate
export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body
        suppressHydrationWarning={true}
        dir="rtl"
        className="relative w-full h-full bg-background_light"
      >
        <NavbarWrapper /> {/* Use the server-side wrapper */}
        {children}
      </body>
    </html>
  );
}
