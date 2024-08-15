'use client'
import { SessionProvider } from "next-auth/react";
import { SessionWrapper } from "./session-provider-wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SessionWrapper>
        <html>
            <body id="appelement" className="flex min-h-[100dvh] w-full flex-col">
            {children}
            </body>
        </html>
      </SessionWrapper>
  );
}