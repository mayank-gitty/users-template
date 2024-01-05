"use client";
import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

import { useState } from "react";
import { Button, Group, rem } from "@mantine/core";
import ItSkills from "../itskill/page";
import Education from "../education/page";
import Profile from "../profilesummary/page";
import ResumeHeadline from "../resume-headline/page";

import ExperienceDetails from "../experience/page";
import useThemeContext from "@/context/context";
import { useRouter } from "next/navigation";
import PhotoUpload from "../photograph/page";
import KeySkills from "../keyskills/page";
import Resume from "../resume/page";
import CustomizedSteppers from "@/app/stepper/page";
import Thanku from "../../app/thanku/page";
import client from "../../../helpers/request";
import { gql } from "graphql-request";

import { useEffect } from "react";
import { updateUser } from "@/util/mutationQueries";

import { VIEW_USER } from "@/util/queries";

import { useSession } from "next-auth/react";


export default function Master() {
  const {
    setFormData,
    formData,
    active,
    setActive,
    profileName,
    education2,
    setEducation2,
    education3,
    setEducation3,
    open,
    setOpen,
    experienceOpen,
    projectopen,
    setprojectOpen,
    profileId,
  }: any = useThemeContext();


  const router = useRouter();


  const  { data: session  } :any = useSession()

  // Define mutation
const PROFILE_USER = gql`
mutation CreateProfileUser($data: ProfileUserCreateInput!) {
  createProfileUser(data: $data) {
    experience {
      title
    }
  }
}
`;

  const save = async () => {
    // console.log(formData, formData);

    if (!formData.profile_summary) {
      return toast("please enter profile summaary", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (formData.profile_summary.length < 10) {
      return toast("please summary should have minimum 10 characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    const itskills = formData?.itskills?.map((item: any) => {
      return {
        id: item,
      };
    });

    const keyskills = formData?.keyskills?.map((item: any) => {
      return {
        id: item,
      };
    });

    console.log("fm", formData.projects) 
  

    for (var i = 0, len = formData.experiences.length; i < len; i++) {
      delete formData.experiences[i].id;
    }

    for (var i = 0, len = formData.educations.length; i < len; i++) {
      delete formData.educations[i].id;
    }

    for (var i = 0, len = formData.projects.length; i < len; i++) {
      delete formData.projects[i].id;
    }







    const user = await client.request(updateUser, {
      where: {
        id: session.user.user.id,
      },
      data: {
        keyskills: {
          connect: keyskills,
        },
        itskills: {
          connect: itskills,
        },  
 
        photograph: formData.photograph,
        education: {
          create: formData.educations,
        },
        resume_headline: formData.resume_headline,
        experience: { 
          create: formData.experiences,
        },
        project: {
          create: formData.projects,
        },
        profile_summary: formData.profile_summary,
        resume: formData.resume,
        stepperFilled:true
      },
    });


    console.log('user',user)

    setActive(8);
    setTimeout(() => {
      router.push("/thanku");
    }, 500);

    // alert('details submitted')
  };

  const nextStep = () => {
    if (!formData.photograph && active === 0) {
      return toast("please upload photo", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (formData.keyskills.length === 0 && active === 1) {
      return toast("please select key skills", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (formData?.educations?.length === 0 && active === 2) {
      return toast("please add education", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!formData.resume_headline && active === 3) {
      return toast("please enter resume headline", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (formData.resume_headline.length < 5 && active === 3) {
      return toast("resume headline should have minimum 5 characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (formData?.experiences?.length === 0 && active === 4) {
      return toast("please add experience", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!formData.resume && active === 5) {
      return toast("please upload resume in pdf or docx format", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (formData.itskills.length === 0 && active === 6) {
      return toast("please select it skills", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    setActive((current: number) => (current < 8 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ];





  const getData = async ()=>{

    const user: any = await client.request(VIEW_USER, {
      where: {
        id: session.user.user.id,
      },
    });

    console.log("user profile gotttttttttttttttttttttttttttttttttt", user);

    if (user?.user) {
      // alert('insi')
      // settrue(false);
    }


    setFormData((prevData: any) => ({
      ...prevData,
    
      itskills: user?.user?.itskills?.map((item: any) => item.name),
      educations: user?.user?.education,
      projects: user?.user?.project,
      keyskills: user?.user?.keyskills?.map((item: any) => item.id),

      resume_headline: user?.user?.resume_headline,

      profile_summary: user?.user?.profile_summary,
      photograph: user?.user?.photograph,


   
      resume: user?.user?.resume,



 

      experiences: user?.user?.experience,
    }));


  }


  useEffect(()=>{


    getData()




  },[session])

  return (
    <div className="employee-details" >
      {/* <div className="text-left mb-10" style={{
        marginLeft:"2rem"
      }} >
        <h4> Fill up {profileName} Details </h4>
      </div> */}

      <div className="mb-2">

        <CustomizedSteppers />
      </div>

      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {
          <div
            className=""
            style={{
              width: "30rem",
              padding: active === 0 ? "" : "",
              display:
                (formData?.educations?.length === 0 && active === 2) ||
                (open && active === 2) ||
                (formData?.experiences?.length === 0 && active === 4) ||
                (experienceOpen && active === 4) ||
                (formData?.projects?.length === 0 && active === 7) ||
                (experienceOpen && active === 7)
                  ? "none"
                  : "",
            }}
          >
            <Group
              className="no-margin"
              position="center"
              mt="xl"
              style={{
                width: "100%",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {active !== 10 && active !== 9 && active !== 0 && (
                <button
                  className="below-back-button"
                  onClick={prevStep}
                  style={{
                    marginTop: "0px !important",
                    width: "48%",
                  }}
                >
                  Previous
                </button>
              )}

              {active !== 10 && active !== 8 && active !== 9 && (
                <button
                  className="next-button"
                  onClick={nextStep}
                  style={{
                    width: active === 0 ? "100%" : "48%",
                    marginTop: active === 0 ? "10px" : "",
                  }}
                >
                  Next
                </button>
              )}

              {active === 8 && (
                <button
                  className="next-button"
                  type="button"
                  style={{
                      width:"48%"  
                  }}
                  onClick={() => save()}
                >
                  submit
                </button>
              )}
            </Group>
          </div>
        }
      </div>
    </div>
  );
}
