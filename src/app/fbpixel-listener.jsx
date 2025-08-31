"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function FBPixelListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]); // triggers on first load + every route/query change

  return null;
}
