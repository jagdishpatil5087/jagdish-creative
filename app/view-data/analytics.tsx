"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // send page view to Google Analytics
    window.gtag?.("config", "G-6QRMBXZN8K", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
