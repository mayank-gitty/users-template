import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
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
      return alert("please select key skills");
    }


    if (!formData.total_experience && active === 5) {
      return alert("please add total experience ");
    }

    if (!formData.total_experience && active === 5) {
      return alert("please add total experience ");
    }
    if (!formData.total_experience_months && active === 5) {
      return alert("please add experience months");
    }
    if (!formData.relevent_experience && active === 5) {
      return alert("please add relevant experience");
    }
    if (!formData.total_relevant_months && active === 5) {
      return alert("please add relevant experience months");
    }
    if (!formData.resume && active === 6) {
      return alert("please upload resume");
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
        <Stepper.Step label="Upload Photo" description="">
          <PhotoUpload/>
        </Stepper.Step>
        <Stepper.Step label="Enter IT Skills" description="">
          <ItSkills />
        </Stepper.Step>
        <Stepper.Step label="Education" description="">
          <Education />
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
        <Stepper.Step label="upload resume" >
          <Resume/>
        </Stepper.Step>
        <Stepper.Step label="Enter Profile Summary" description="">
          <Profile />
        </Stepper.Step>
      </Stepper>

      <Group position="center" mt="xl">
        {active !== 9 && active !== 0 &&  active !== 8 && (
          <Button variant="default" onClick={prevStep}>
            Back 
          </Button>
        )}

        {active !== 9 && active !== 7 &&  active !== 8 && (
          <button className="btn btn-primary" onClick={nextStep}>
            Next step
          </button>
        )}
      </Group>
    </div>
  );
}
