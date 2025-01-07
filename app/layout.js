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
import dynamic from "next/dynamic";

const AudioPlayer = dynamic(() => import("./components/AudioPlayer"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const DelayedSupense = ({ children, ms = 1000 }) => {
  delay(ms);
  return children;
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
            </Suspense>
            {/* </ClientLayout> */}
            <Footer />

            <div className="fixed bottom-0 left-0 right-0 z-50">
              <AudioPlayer />
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
