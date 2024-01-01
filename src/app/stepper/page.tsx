import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { Button } from "@mantine/core";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import useThemeContext from "@/context/context";
import Profile from "@/components/profilesummary/page";
import PhotoUpload from "@/components/photograph/page";
import KeySkills from "@/components/keyskills/page";
import Education1 from "@/components/education/page";
import ResumeHeadline from "@/components/resume-headline/page";
import ExperienceDetails from "@/components/experience/page";
import Resume from "@/components/resume/page";
import ItSkills from "@/components/itskill/page";
import ProjectForm from "@/components/projects/page";

import { Group } from "@mantine/core";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    width: "100%",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgorund:"yellow"

      backgroundImage: "linear-gradient(#4D47C3, #4D47C3)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(#34A853, #34A853)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
  [`&.MuiStepLabel-label.MuiStepLabel-alternativeLabel`]: {
    color: "red !important",
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#F1F1F1",
  zIndex: 1,
  color: "#BDBDBD",
  // font-family: Inter;
  fontSize: "20px",
  // font-style: normal;
  fontWeight: 800,

  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: "#4D47C3",

    color: "#FFF !important",
    // font-family: Inter;
    fontSize: "20px",
    // font-style: normal;
    fontWeight: 800,
    // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background: "#34A853",
    color: "#FFF !important",
    // font-family: Inter;
    fontSize: "20px",
    // font-style: normal;
    fontWeight: 800,
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <span> 1</span>,
    2: <span> 2 </span>,
    3: <span> 3 </span>,
    4: <span> 4 </span>,
    5: <span> 5 </span>,
    6: <span> 6 </span>,
    7: <span> 7 </span>,
    8: <span> 8 </span>,
    9: <span> 9 </span>,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Profile photo",
  "Key skills",
  "Education",
  "Resume headline",
  "Experience",
  "Upload resume",
  "IT skills",
  "Projects",
  "Profile summary",
];

export default function CustomizedSteppers() {
  const { setFormData, formData, active, setActive }: any = useThemeContext();

  const prevStep = () =>
    setActive((current: any) => (current > 0 ? current - 1 : current));

  return (
    <Stack sx={{ width: "100%" ,      }}    spacing={4}>
      <div className=""  style={{
            width: "100%",
            height:" 159.27px",
            display:"flex",
            alignItems:"center",
            background: "#FFF",
            boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.08)",
      }} >

      <Stepper
        alternativeLabel
        activeStep={active}
        connector={<ColorlibConnector />}
        sx={{
          width: "84%",
          margin:"auto",
          color: "success.main",
          ".MuiStepper-horizontal" : {
               marginBottom:"7rem",
               width:"yellow"
          },
          "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
            color: "#000",
            // font-family: Inter;
            fontSize: "12px",

            fontWeight: 600,
          },
          "& .MuiStepLabel-label.Mui-completed ": {
            color: "#34A853",
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#4D47C3",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {" "}
              {label}{" "}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      </div>


      {active === 0 && <PhotoUpload />}
      {active === 1 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",

              margin: "auto",
              background:"red"
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <KeySkills />
        </>
      )}
      {active === 2 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",

              margin: "auto",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <Education1 />
        </>
      )}
      {active === 3 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",

              margin: "auto",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <ResumeHeadline />
        </>
      )}
      {active === 4 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",

              margin: "auto",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <ExperienceDetails />
        </>
      )}
      {active === 5 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",

              margin: "auto",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <Resume />
        </>
      )}
      {active === 6 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",

              margin: "auto",
            }}
          >
            {active !== 9 && active !== 0 && active !== 8 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <ItSkills />
        </>
      )}

      {active === 7 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",
              margin: "auto",
            }}
          >
            {active !== 10 && active !== 0 && active !== 9 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>
          <ProjectForm />
        </>
      )}

      {active === 8 && (
        <>
          <Group
            position="left"
            mx="auto"
            mt="xl"
            style={{
              width: "30rem", marginBottom:"2rem",

              margin: "auto",
            }}
          >
            {active !== 10 && active !== 0 && active !== 9 && (
              <Button
                style={{
                display:"none"
                }}
                variant="default"
                onClick={prevStep}
              >
                <img src={"./assets/down_arrow.svg"} />
                Back
              </Button>
            )}
          </Group>

          <Profile />
        </>
      )}
      {/* 
      {active} */}
    </Stack>
  );
}
