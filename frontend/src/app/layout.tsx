import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div>
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
