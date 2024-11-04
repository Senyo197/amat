"use client";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(children);

  return (
    <html lang="en">
      <body className="bg-white">
        <Navbar />
        {children}
        {pathname !== "/auth/login" &&
          pathname !== "/auth/signup" &&
          pathname !== "/auth/forget_password" &&
          pathname !== "/auth/reset_password" && <Footer />}
      </body>
    </html>
  );
};

export default RootLayout;
