import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import ClientLayout from "./clientLayout";

const inter = Inter({ subsets: ["latin"] });

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const DelayedSupense = ({ children, ms = 1000 }) => {
  delay(ms);
  return children;
};

export const metadata = {
  title: "آموزشگاه مهراندیش",
  description: "آموزش صفر تا صد برنامه نویسی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ClientLayout>
          <Suspense fallback={<Loading />}>
            <DelayedSupense ms={2000}>{children}</DelayedSupense>
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
