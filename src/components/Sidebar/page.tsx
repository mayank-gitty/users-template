"use client";
import React from "react";
import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import { HAS_MASTER, PROFILE_USER } from "@/util/queries";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation'


import {
  IconDashboardOff,
  IconLiveView, IconLogout,
} from "@tabler/icons-react";
import { IconCactus } from "@tabler/icons-react";

import {
  IconUsers,
  IconCirclePlus,
  IconUser,
  IconDashboard,
  IconMail,
  IconUsersGroup,
  IconReceipt2 ,
  IconBellRinging,
  IconFingerprint,
  IconKey ,
  IconPlus,
  IconEye,
  IconEdit,
  IconLayoutDashboard,
  IconMailCode ,

} from "@tabler/icons-react";



import { RxDashboard } from "react-icons/rx";


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
    IconKey,

    
    
  }: any = useThemeContext();



  const router = useRouter()

  return (
    <div className="sidebar-wrapper">
      {" "}
      <CustomSideBar  
       router={router} 
      linkColor = "#495584 !important"
      height="100vh"
      footerLinks={[
        { link: "", label: "Logout", icon: IconLogout },
      ]}
      backgroundColor="#fff"
      links={[
            { link: "/", label: "Dashboard", icon:     IconLayoutDashboard },
            { link: "", label: "Invite", icon: IconMail ,  sublinks: [
              {
                title: 'Invite Employees',
                link: 'add_employees',
                icon:  IconMailCode 
                
              },
              {
                title: 'Invite Managers',
                link: 'add_managers',
                icon:   IconMailCode 
              }
            ]   },

            { link: "", label: "Employees", icon: IconUsersGroup ,    sublinks: [
              {
                title: 'Add',
                link: '/page/2',
                icon: IconPlus
              },
              {
                title: 'View',
                link: '/page/3',
                icon: IconEye
              },
              {
                title: 'Edit',
                link: '/page/2',
                icon: IconEdit
              },
            ]  
          },
            { link: "", label: "Managers", icon: IconUsers ,    sublinks: [
              {
                title: 'Add',
                link: '/page/2',
                icon: IconPlus
              },
              {
                title: 'View',
                link: '/page/3',
                icon: IconEye
              },
              {
                title: 'Edit',
                link: '/page/2',
                icon: IconEdit
              },
            ]  
          },
            // { link: "ml", label: "Security", icon: IconFingerprint },
          ]}  />{" "}

      
    </div>
  );
}

export default SideBar;
