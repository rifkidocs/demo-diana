"use client";
import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { MainContent } from "@/components/main-content";
import { Footer } from "@/components/footer";

export default function RootLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures code is executed only on the client
  }, []);

  if (!isMounted) return null; // Avoid rendering until mounted

  return (
    <html>
      <body>
        <div className='flex h-screen bg-background'>
          <DashboardSidebar />
          <div className='flex flex-col flex-1 overflow-hidden'>
            <DashboardHeader />
            <DashboardShell>{children}</DashboardShell>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
