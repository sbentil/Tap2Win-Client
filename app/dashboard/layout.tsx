"use client"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AuthGuard from "@/guards/auth-guard";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DasboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AuthGuard>
      {/* sidebar with 30% */}
      <div className="flex h-full w-full  max-h-screen overflow-hidden">
        <div className="w-1/6 h-full">
          <Sidebar />
        </div>
        {/* main content with 70% */}
        <div className="w-5/6 bg-white">
          <header className="h-16 w-full shadow-md">
            <Navbar />
          </header>
            <main className="p-4 text-text bg-gray-light max-h-[93vh] overflow-y-auto ">{children}</main>
        </div>
      </div>
    </AuthGuard>
    </LocalizationProvider>

  );
}
