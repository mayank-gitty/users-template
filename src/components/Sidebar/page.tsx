"use client";
import React from "react";
import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import { HAS_MASTER, PROFILE_USER } from "@/util/queries";
import { useSearchParams } from "next/navigation";


import {
  IconLiveView,
} from "@tabler/icons-react";
import { IconCactus } from "@tabler/icons-react";

import {
  IconUsers,
  IconCirclePlus,
  IconUser,
  IconDashboard,
  IconEdit,
  IconPlus,
  IconEye,
  IconUsersGroup,
  IconReceipt2 ,
  IconBellRinging,
  IconFingerprint,
  IconKey 
} from "@tabler/icons-react";

import { SideBar  as CustomSideBar} from "@clipl/ds-base"
 
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
    IconKey
    
  }: any = useThemeContext();

  return (
    <div className="sidebar-wrapper">
      {" "}
      <CustomSideBar  
       height="100vh"
      footerLinks={[
        { link: "", label: "SSH Keys", icon: IconKey },
        { link: "", label: "Other Settings", icon: IconSettings },
      ]}

      links={[
            { link: "/", label: "Dashboard", icon: IconBellRinging },
            { link: "", label: "Invite", icon: IconDatabaseImport,  sublinks: [
              {
                'title': 'Invite Employees',
                'link': ['/page/2'],
              },
              {
                'title': 'Invite Managers',
                'link': ['/page/3'],
              }
            ]   },

            { link: "", label: "Employees", icon: IconReceipt2 ,    sublinks: [
              {
                'title': 'Add',
                'link': ['/page/2'],
              },
              {
                'title': 'View',
                'link': ['/page/3'],
              },
              {
                'title': 'Edit',
                'link': ['/page/2'],
              },
            ]  
          },
            { link: "", label: "Managers", icon: IconReceipt2 ,    sublinks: [
              {
                'title': 'Add',
                'link': ['/page/2'],
              },
              {
                'title': 'View',
                'link': ['/page/3'],
              },
              {
                'title': 'Edit',
                'link': ['/page/2'],
              },
            ]  
          },

          
            
            // { link: "ml", label: "Security", icon: IconFingerprint },
          ]}  />{" "}

      
    </div>
  );
}

export default SideBar;
