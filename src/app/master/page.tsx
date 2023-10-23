import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import ItSkills from "../itskill/page";
import Education1 from "../education1/page";
import Profile from "../Profile/page";
import ResumeHeadline from "../resume-headline/page";


import ExperienceDetails from "../Experience/page";
import useThemeContext from "@/context/context";
import { useRouter } from "next/navigation";
import PhotoUpload from "../resume/page";
import KeySkills from "../keyskills/page";


export default function Master() {
  const { setFormData, formData, active, setActive }: any = useThemeContext();

  const router = useRouter();

  const nextStep = () => {
    console.log(active);

    if (!formData.photograph  && active === 0) {
      return alert("please select and upload photograph");
    }
    if (formData.itskills.length === 0 && active === 1) {
      return alert("please select it skills");
    }

    if (!formData.education && active === 2) {
      return alert("please select education");
    }

    if (!formData.resume_headline && active === 3) {
      return alert("please enter resume headline");
    }

    if (formData.keyskills.length === 0 && active === 4) {
      return alert("please select it skills");
    }

    if (!formData.relevent_experience && active === 5) {
      return alert("please add relevant experience");
    }
    if (!formData.total_experience && active === 5) {
      return alert("please add total experience ");
    }

    setActive((current) => (current < 8 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));



  return (
    <div className="employee-details">
  
      <div className="text-center mb-10">
        <h4> Fill up Your Details </h4>
      </div>

      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Enter Photo" description="">
          <PhotoUpload/>
        </Stepper.Step>
        <Stepper.Step label="Enter IT Skills" description="">
          <ItSkills />
        </Stepper.Step>
        <Stepper.Step label="Education Details" description="">
          <Education1 />
        </Stepper.Step>
        <Stepper.Step label="Enter Resume Headline" description="">
          <ResumeHeadline />
        </Stepper.Step>
        <Stepper.Step label="Enter Key Skills" description="">
          <KeySkills />
        </Stepper.Step>
        <Stepper.Step label="Enter Expererience" >
          <ExperienceDetails />
        </Stepper.Step>
        <Stepper.Step label="Enter Profile Summary" description="">
          <Profile />
        </Stepper.Step>
      </Stepper>

      <Group position="center" mt="xl">
        {active !== 8 && active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}

        {active !== 8 && active !== 6 && (
          <button className="btn btn-primary" onClick={nextStep}>
            Next step
          </button>
        )}
      </Group>
    </div>
  );
}
