"use client";
import React from "react";
import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import { HAS_MASTER, PROFILE_USER } from "@/util/queries";
import { useSearchParams } from "next/navigation";


import { Sidebar } from "./Sidebar";
 
function SideBar() {
  const {
    loggedIn,
    setLoggedIn,
    setFormData,
    setActive,
    hasMaster,
    sethasMaster,
    role,
    setRole,
    image,
    setImage,
    profileName,
    setProfileName,
    profileId,
    setProfileId,
    IconDatabaseImport,
    Icon2fa,
    IconSettings ,
    IconKey,
  }: any = useThemeContext();


  

  return (
    <div className="sidebar-wrapper">
      {" "}
 

 <Sidebar/>

      
    </div>
  );
}

export default SideBar;
