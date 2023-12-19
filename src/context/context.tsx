// app/context/theme.js

"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext: any = createContext({});

export const ThemeContextProvider = ({ children }) => {
  const initialFormData: any = {
    profileUserId: "",
    itskills: [],
    educations: [],
    projects:[],
    keyskills: [],
    resume_headline: "",
    profile_summary: "",
    total_experience_months: "",
    total_relevant_months: "",
    experiences: [],
    createdExperiencesOnEdit: [],
    deletedExperiencesOnEdit: [],
    photograph: "",
    resume: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [active, setActive] = useState(0);  

  const [loggedIn, setLoggedIn] = useState(false);  

  const [hasMaster, sethasMaster] = useState(false);
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

  const [inEditPage, setinEditPage] = useState(false);

  const [profileName, setProfileName] = useState('');

  const [profileId, setProfileId] = useState('');

  const  [open, setOpen] = useState(false)

  const  [experienceOpen, setexperienceOpen] = useState(false)

  const  [projectopen, setprojectOpen] = useState(false)
  
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
        open, setOpen,
        experienceOpen,
        setexperienceOpen,
        projectopen, 
        setprojectOpen

      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;
