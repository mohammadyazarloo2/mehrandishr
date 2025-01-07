"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings } from "./redux/settingsSlice";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const metadata = {
    title: settings?.general?.siteName,
    description: settings?.general?.description,
    keywords: settings?.general?.keywords,
    icons: {
      icon: settings?.general?.favicon,
    },
  };

  return (
    <SessionProvider>
      <head>
        <link
          rel="icon"
          href={settings?.general?.favicon || "/logo.png"}
          sizes="any"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content={settings?.general?.siteName} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <title>{settings?.general?.siteName || " مهراندیش"}</title>
      </head>
      {children}
    </SessionProvider>
  );
};
