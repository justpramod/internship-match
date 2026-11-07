import { auth } from "@/lib/auth";
import "./globals.css";
import { Inter } from "next/font/google";
import HomeNavbar from "@/components/layouts/HomeNavbar";

const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} pb-15`}>
        {!session && <HomeNavbar />}
        {children}
      </body>
    </html>
  );
}
