"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const recordView = async () => {
      try {
        await fetch('/api/analytics/record', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (error) {
        console.error('Error recording page view:', error);
      }
    };

    recordView();
  }, [pathname]);

  return null;
}
