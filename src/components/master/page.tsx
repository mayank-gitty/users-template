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

      <CustomizedSteppers />

      <Group className="no-margin" position="center" mt="xl">
        {active !== 9 && active !== 7 && active !== 8 && (
          <button className="next-button" onClick={nextStep}>
            Next
          </button>
        )}
      </Group>
    </div>
  );
}
