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

    if (!formData.education && active === 2) {
      return toast("please select education", {
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

    if (formData?.experiences?.length === 0  && active === 4) {
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

    setActive((current:number) => (current < 8 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current:number) => (current > 0 ? current - 1 : current));

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

      <CustomizedSteppers />

      <Group className="no-margin" position="center" mt="xl">
        {active !== 9 && active !== 7 && active !== 8 && (
          <button className="next-button" onClick={nextStep}>
            Next
          </button>
        )}
      </Group>
      <Group className="no-margin" position="left" mt="xl" style={{
        position:"absolute",
        left:"35%",
        transform:'translateY(-47px)'
      }} >
        {active !== 9  && active !== 8 && active !== 0 && (
          <button className=" below-back-button" onClick={prevStep}>
            Previous
          </button>
        )}
      </Group>
    </div>
  );
}
