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
import SideBar from "./Sidebar/page";
import ResumeUpload from "./upload-resume/page";
import ProfileImageUpload from "../components/photograph/page";
import DatatablePage from "./profileUsers/page";
import Profile from "../components/profile/page";
import ResumeHeadline from "../components/resume-headline/page";
import Master from "../components/master/page";
import { useRouter } from "next/navigation";
import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import client from "../../helpers/request";

export default function Home() {
  const {
    loggedIn,
    setLoggedIn,
    setFormData,
    setActive,
    hasMaster,
    sethasMaster,

  }: any = useThemeContext();

  const router = useRouter();

  useEffect(() => {
    console.log("kkkkkkkkkkkkkkk");
    const id = localStorage.getItem("id");


    if (id) {
      // setLoggedIn(true);
      getData();
    }

    else {

      router.push('/login')

    }

 
  }, []);

  //getProfileUser
  const PROFILE_USER = gql`
    query ProfileUsers($where: ProfileUserWhereInput!) {
      profileUsers(where: $where) {
        user {
          name
          id
          email
        }
        total_experience
        resume_headline
        relevent_experience
        profile_summary
        photograph
        keyskillsCount
        active
        open_to_work
        keyskills {
          name
          id
        }
        itskills {
          name
          id
        }
        education
      }
    }
  `;

  const getData = async () => {
    const user: any = await client.request(PROFILE_USER, {
      where: {
        user: {
          id: {
            equals: localStorage.getItem("id"),
          },
        },
      },
    });

    console.log("checking master", user);

    if (user?.profileUsers.length > 0) {
      sethasMaster(true);
    }
  };

  const logOut = () => {
    console.log("logout");

    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");

    setLoggedIn(false);
    setFormData({
      itskills: [],
      education: null,
      keyskills: [],
      resume_headline: "",
      profile_summary: "",
      total_experience: "",
      relevent_experience: "",
    });
    setActive(0);
    sethasMaster(false);
    router.push('/login')
  };

  return (
    <>
      <MantineProvider>
        {(
          <div className="d-flex justify-content-end">
            {/* <button className="btn btn-warning"  onClick={()=> router.push('/multi_users_table') } >
               multi users
            </button> */}

            <button
              className="btn btn-info"
              onClick={() =>
                router.push(`/view4?id=${localStorage.getItem("id")}`)
              }
            >
              view profile
            </button>

            <button
              className="btn btn-warning"
              onClick={() => router.push("/multipleuser")}
            >
              create users
            </button>
            <button className="btn btn-warning" onClick={() => logOut()}>
              {" "}
              logout{" "}
            </button>
          </div>
        )}

        {/* 
      <ProfileUser/> */}
        {/* <AddTimeLine/> */}



        {/* <Profile/>
      <ResumeHeadline/> */}
        {/* <ProfileImageUpload/> */}
        {/* <SideBar/> */}
        {/* <Education/> */}
        {/* <ResumeForm/> */}
        {/* <ItSkills/> */}
        {/* <ProjectForm/> */}
        {/* <ResumeUpload/> */}
        {/* <KeySkills/> */}
        {/* < DatatablePage/>
     <AddTimeLine/> */}

        {  !hasMaster && <Master />}
      </MantineProvider>
    </>
  );
}
