"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FBPixelListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.fbq !== "undefined") {
      // Always fire on initial load
      window.fbq("track", "PageView");
    }
  }, []); // run once on first load

  useEffect(() => {
    if (typeof window.fbq !== "undefined") {
      // Fire again on route change
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
