// import "@mantine/core/styles.css";
"use client";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import { usePathname } from "next/navigation";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "mdbreact/dist/css/mdb.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/context";
import SideBar from "@/components/Sidebar/page";

import { SessionProvider } from "next-auth/react";

import { MantineProvider } from "@mantine/core";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import useThemeContext from "@/context/context";

import { BrowserRouter } from 'react-router-dom';

const inter = Inter({ subsets: ["latin"] });

const materialTheme = createTheme({
  spacing: 4,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />

        <SessionProvider>
          <ThemeContextProvider>
          <BrowserRouter>
            <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
              <div className="d-flex">
                {pathname !== "/login" &&
                  localStorage.getItem("role") !== "employee" && <SideBar />}

                <div
                  className={
                    pathname === "/login" ||
                    localStorage.getItem("role") === "employee"
                      ? "w-100"
                      : "w-70"
                  }
                >
                  {children}
                </div>
              </div>
            </ThemeProvider>
            </BrowserRouter>,
          </ThemeContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
