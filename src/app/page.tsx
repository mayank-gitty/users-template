"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AddTimeLine from "./multipleuser/page";
import { MantineProvider } from "@mantine/core";
import Login from "./login/page";
import Education from "./education/page";
import ResumeForm from "../components/photograph/page";
import ItSkills from "../components/itskill/page";
import ProjectForm from "./project/page";
import KeySkills from "./keyskill/page";
import SideBar from "../components/Sidebar/page";

import ProfileImageUpload from "../components/photograph/page";
import DatatablePage from "./profileUsers/page";
import Profile from "../components/profile/page";
import ResumeHeadline from "../components/resume-headline/page";
import Master from "../components/master/page";
import { useRouter } from "next/navigation";
import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import client from "../../helpers/request";
import { GET_USER, HAS_MASTER, PROFILE_USER } from "@/util/queries";

export default function Home() {
  const {
    loggedIn,
    setLoggedIn,
    setFormData,
    setActive,
    hasMaster,
    sethasMaster,
    role,
    setRole,
  }: any = useThemeContext();

  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      getData();
    } else {
      router.push("/login");
    }
  }, []);

  const getData = async () => {
    const user: any = await client.request(HAS_MASTER, {
      where: {
        user: {
          id: {
            equals: localStorage.getItem("id"),
          },
        },
      },
    });

    if (user?.profileUsers.length > 0) {
      sethasMaster(true);
    }
    const profile: any = await client.request(GET_USER, {
      where: {
        id: localStorage.getItem("id"),
      },
    });

    setRole(profile?.user?.role);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <MantineProvider>{!hasMaster && <Master />}</MantineProvider>
    </>
  );
}
