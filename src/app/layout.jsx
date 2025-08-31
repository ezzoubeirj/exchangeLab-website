import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import FBPixelListener from "./fbpixel-listener";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Base Code */}
        <Script id="fb-pixel-base" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            // Expose fbq globally
            window.fbq = window.fbq || fbq;

            fbq('init', '371485473841753');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=371485473841753&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body>
        {children}
        <FBPixelListener />
        <Analytics />
      </body>
    </html>
  );
}
