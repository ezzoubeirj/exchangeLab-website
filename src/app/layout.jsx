import './globals.css';
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
