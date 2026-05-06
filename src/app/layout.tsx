import localFont from "next/font/local";
import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.scss";

const montserrat = localFont({
  src: [
    {
      path: "../../public/Font/Montserrat/Montserrat-VariableFont_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/Font/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
