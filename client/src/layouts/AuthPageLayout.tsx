import React from "react";
import GridShape from "../pages/admin/components/common/GridShape";
import { Link, Navigate } from "react-router";
import ThemeTogglerTwo from "../pages/admin/components/common/ThemeTogglerTwo";
import toast, { Toaster } from 'react-hot-toast';
import { getToken } from '../helper/localSorageHelper';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!!getToken()) {
    toast.success("User already logged in! Redirecting to admin page...");
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  src="/logo.png"
                  alt="Pawstin Logo"
                  width={231}
                  height={48}
                  className="site-logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
      <Toaster toastOptions={{
        style: {
          zIndex: 9999, // higher than modal (adjust as needed)
        },
      }} position="top-center" />
    </div>
  );
}
