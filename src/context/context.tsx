// app/context/theme.js

"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext: any = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const initialFormData: any = {
    profileUserId: "",
    itskills: [],
    educations: [],
    projects: [],
    keyskills: [],
    resume_headline: "",
    profile_summary: "",
    total_experience_months: "",
    total_relevant_months: "",
    experiences: [],
    photograph: "",
    resume: "",
    stepperFilled:false
    
  };

  const [formData, setFormData] = useState(initialFormData);

  const [active, setActive] = useState(8);
  
  const [loggedIn, setLoggedIn] = useState(false);

  const [hasMaster, sethasMaster] = useState(false);
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

  const [inEditPage, setinEditPage] = useState(false);

  const [profileName, setProfileName] = useState("");

  const [profileId, setProfileId] = useState("");

  const [open, setOpen] = useState(true);

  const [experienceOpen, setexperienceOpen] = useState(true);

  const [projectopen, setprojectOpen] = useState(true);

  return (
    <ThemeContext.Provider
      value={{
        formData,
        setFormData,
        active,
        setActive,
        loggedIn,
        setLoggedIn,
      
        hasMaster,
        sethasMaster,
        role,
        setRole,
        image,
        setImage,
        inEditPage,
        setinEditPage,
        profileName,
        setProfileName,
        profileId,
        setProfileId,
        open,
        setOpen,
        experienceOpen,
        setexperienceOpen,
        projectopen,
        setprojectOpen,

      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;
