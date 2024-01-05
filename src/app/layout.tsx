// import "@mantine/core/styles.css";
"use client";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

import { usePathname } from "next/navigation";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "mdbreact/dist/css/mdb.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/context";
import SideBar from "@/components/Sidebar/page";


import { SessionProvider } from "next-auth/react";

import { MantineProvider } from "@mantine/core";

import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import useThemeContext from '@/context/context';


import client from '../../helpers/request';

import { GET_USER } from '@/util/queries';


import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {

//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const materialTheme = createTheme({
  spacing: 4,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


//   const {
//     loggedIn,
//     setLoggedIn,
//     setFormData,
//     setActive,
//     hasMaster,
//     sethasMaster,
//     role,
//     setRole,
//   }: any = useThemeContext();

// useEffect(()=>{


//   alert('in role')

//   const getData = async () => {
//     const user: any = await client.request(GET_USER, {
//       where: {
//           id: localStorage.getItem("id"),
//         },
//     });

//     console.log('seeing user in sidebar',user)
//     setRole(user?.user?.role);

//   };

// },[])


  const pathname = usePathname();

  // console.log("role in sidebar", role);

  return (
    <html lang="en">
      <body className={inter.className}>

      <ToastContainer  />

      <SessionProvider>
        
        <ThemeContextProvider>
          <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
            <div className="d-flex">

              {pathname !== "/login" &&   localStorage.getItem('role') !== 'employee'   &&  <SideBar />  }

              <div className= {pathname === "/login" ||  localStorage.getItem('role') === 'employee'  ? "w-100" : "w-70"}>
             
                {children}
              </div>
              
            </div>
          </ThemeProvider>
        </ThemeContextProvider>

        </SessionProvider>


      </body>
    </html>
  );
}
