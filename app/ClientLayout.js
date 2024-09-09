"use client";
import React,{ useEffect, useState } from "react";
import PreLoader from "./components/PreLoader";
import { useRouter } from "next/navigation";

export default function ClientLayout({ children }) {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [content, setContent] = useState(null);
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setContent(null);
      setTimeout(() => {
        setLoading(false);
        setContent(children);
      }, 1000);
    };

    handleRouteChange(); // Initial load

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [router,children]);
  return (
    <>
      {loading && <PreLoader />}
      {!loading && content}
    </>
  );
}
