import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import ItSkills from "../itskill/page";
import Education1 from "../education1/page";
import Profile from "../Profile/page";
import ResumeHeadline from "../resume-headline/page";
import ItSkills1 from "../itskils1/page";
import ExperienceDetails from "../Experience/page";
import useThemeContext from "@/context/context";
import { useRouter } from "next/navigation";

export default function Master() {
  const { setFormData, formData, active, setActive }: any = useThemeContext();

  const router = useRouter();

  const nextStep = () => {
    console.log(active);

    if (formData.itskills.length === 0 && active === 0) {
      return alert("please select it skills");
    }

    if (!formData.education && active === 1) {
      return alert("please select education");
    }

    if (!formData.resume_headline && active === 2) {
      return alert("please enter resume headline");
    }

    if (formData.keyskills.length === 0 && active === 3) {
      return alert("please select it skills");
    }

    if (!formData.relevent_experience && active === 4) {
      return alert("please add relevant experience");
    }
    if (!formData.total_experience && active === 4) {
      return alert("please add total experience ");
    }

    setActive((current) => (current < 7 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));



  return (
    <div className="employee-details">
  
      <div className="text-center mb-10">
        <h4> Fill up Your Details </h4>
      </div>

      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Enter IT Skills">
          <ItSkills />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Education Details">
          <Education1 />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Enter Resume Headline">
          <ResumeHeadline />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Enter Key Skills">
          <ItSkills1 />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Enter Expererience">
          <ExperienceDetails />
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Enter Profile Summary">
          <Profile />
        </Stepper.Step>
      </Stepper>

      <Group justify="center" mt="xl">
        {active !== 6 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}

        {active !== 6 && active !== 5 && (
          <button className="btn btn-primary" onClick={nextStep}>
            Next step
          </button>
        )}
      </Group>
    </div>
  );
}
