"use client";

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
import Profile from "../profile/page";
import ResumeHeadline from "../resume-headline/page";

import ExperienceDetails from "../experience/page";
import useThemeContext from "@/context/context";
import { useRouter } from "next/navigation";
import PhotoUpload from "../photograph/page";
import KeySkills from "../keyskills/page";
import Resume from "../resume/page";
import CustomizedSteppers from "@/app/stepper/page";
import Thanku from "../../app/thanku/page";

export default function Master() {
  const { setFormData, formData, active, setActive }: any = useThemeContext();

  const router = useRouter();

  const nextStep = () => {
    console.log(active);

    if (!formData.photograph && active === 0) {
      return alert("please upload photo");
    }
    if (formData.keyskills.length === 0 && active === 1) {
      return alert("please select key skills");
    }

    if (!formData.education && active === 2) {
      return alert("please select education");
    }

    if (!formData.resume_headline && active === 3) {
      return alert("please enter resume headline");
    }

    if (!formData.total_experience && active === 4) {
      return alert("please add total experience ");
    }

    if (!formData.total_experience_months && active === 4) {
      return alert("please add experience months");
    }
    if (!formData.relevent_experience && active === 4) {
      return alert("please add relevant experience");
    }
    if (!formData.total_relevant_months && active === 4) {
      return alert("please add relevant experience months");
    }

    const totalExperience =
      parseInt(formData.total_experience) +
      "." +
      parseInt(formData.total_experience_months);

    const totalRelevant =
      parseInt(formData.relevent_experience) +
      "." +
      parseInt(formData.total_relevant_months);

    // console.log('exp',totalRelevant)

    if (parseFloat(totalRelevant) > parseFloat(totalExperience)) {
      return alert("relevant experience can not greater than total experience");
    }

    if (!formData.resume && active === 5) {
      return alert("please upload resume in pdf or docx format");
    }

    if (formData.itskills.length === 0 && active === 6) {
      return alert("please select it skills");
    }

    setActive((current) => (current < 8 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ];

  return (
    <div className="employee-details">
      <div className="text-center mb-10">
        <h4> Fill up Your Details </h4>
      </div>

  {/* 
        <Thanku/> */}

      <CustomizedSteppers />

      {/*     
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack> */}

      {/* <Stepper
      completedIcon={
        active
      }
        active={active}

        styles={(theme) => ({

          // stepBody: {
          //   display: 'none',
          // },
  
          // step: {
          //   padding: 0,
          // },
  
          // stepIcon: {
          //   borderWidth: rem(4),
          // },
  
          // separator: {
          //   marginLeft: rem(-2),
          //   marginRight: rem(-2),
          //   height: rem(10),
          // },
          step: {
            color: "#181818",
            // font-family: Inter;
            fontSize: "12px",
            // fontStyle: normal;
            fontWeight: 600,
            lineHeight: "normal",
            display:'flex',
            flexDirection:"column"
          },
          steps:{
            alignItems:"baseline"
          },
          separator:{
         color:"white",
         background:"white",
         
        //  marginLeft:0,
        //  marginRight:0
          },
          stepBody:{
            // marginTop:"1rem",
            display:"none"
          },
          stepIcon: {
            color: "#BDBDBD",
            fontSize: "20px",
            fontWeight: 800,
            background: "#F1F1F1",
            "&[data-progress]":{
              background:"#4D47C3",
              color:"#FFFFFF",
              border:"none"
            },
            "&[data-completed]":{
              background:"#34A853",
              color:"#FFFFFF",
              border:"none"
            } 
          },
          separatorActive:{
            // color:"orange"
          },
          stepCompletedIcon:{
            //  background:"#34A853",
            //  borderRadius:"2rem",
            //  border:"none !important",
            //  outline:"none !important"
          }
        })}
      >
        <Stepper.Step label="Upload Photo" description="">
          
          <Group position="center" mt="xl">
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <PhotoUpload />
        </Stepper.Step>

        <Stepper.Step label="Enter Key Skills" description="">
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>
          <KeySkills />
        </Stepper.Step>

        <Stepper.Step label="Highest Education" description="">
          <Group
            mx="auto"
            mt="xl"
            style={{
              width: "30rem",
            }}
            position="left"
            mt="xl"
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <Education />
        </Stepper.Step>
        <Stepper.Step label="Enter Resume Headline" description="">
          <Group
            mx="auto"
            mt="xl"
            style={{
              width: "30rem",
            }}
            position="left"
            mt="xl"
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>
          <ResumeHeadline />
        </Stepper.Step>

        <Stepper.Step label="Enter Expererience">
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>
          <ExperienceDetails />
        </Stepper.Step>
        <Stepper.Step label="Upload Resume">
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <Resume />
        </Stepper.Step>
        <Stepper.Step label="Enter IT Skills" description="">
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <ItSkills />
        </Stepper.Step>
        <Stepper.Step label="Enter Profile Summary" description="">
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button className="back-btn" variant="default" onClick={prevStep}>
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>
          <Profile />
        </Stepper.Step>
        
      </Stepper> */}

      <Group className="no-margin" position="center" mt="xl">
        {active !== 9 && active !== 7 && active !== 8 && (
          <button className="next-button" onClick={nextStep}>
            Next
          </button>
        )}
      </Group>

      {/* <Stepper active={active} >
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper> */}



    </div>
  );
}
