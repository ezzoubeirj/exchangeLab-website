"use client";
import { useEffect } from "react";

export default function FBPixelListener() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      // Fire a PageView once on first load
      window.fbq("track", "PageView");
      console.log("FB Pixel: PageView fired");
    } else {
      console.warn("FB Pixel not found");
    }
  }, []);

  return null;
}
