import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
// import ClientLayout from "./ClientLayout";
import { AuthProvider } from "./Providers";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

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
        <Providers>
          <AuthProvider>
            <Header />
            {/* <ClientLayout> */}
              <Suspense fallback={<Loading />}>
                {/* <DelayedSupense ms={2000}>{children}</DelayedSupense> */}
                {children}
                <div className="fixed bottom-0 left-0 right-0 z-50">
                  <AudioPlayer />
                </div>
              </Suspense>
            {/* </ClientLayout> */}
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
