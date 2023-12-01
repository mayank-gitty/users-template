// app/context/theme.js

'use client';

import { createContext, useContext, useState } from "react";

const ThemeContext:any = createContext({})

export const ThemeContextProvider = ({ children }) => {

    const initialFormData: any = {
        profileUserId:"",
        itskills:[],
        education: null,
        keyskills:[],
        resume_headline:"",
        profile_summary:"",
        // total_experience:"",
        total_experience_months:"", 
        // relevent_experience:"",
        total_relevant_months:"",
        experiences:[],
        createdExperiencesOnEdit:[],
        deletedExperiencesOnEdit:[],
        photograph:"",
        resume:"",
      };
    
      const [formData, setFormData] = useState(initialFormData);

      const [active, setActive] = useState(0);

      const [loggedIn, setLoggedIn] = useState(false);

      const [hasMaster,sethasMaster] = useState(false);
      const [role, setRole] = useState("");
      const [image, setImage] = useState(null);

      const [inEditPage, setinEditPage] = useState(false);

    return (
        <ThemeContext.Provider value={{formData,setFormData,active, setActive,loggedIn, setLoggedIn ,hasMaster,sethasMaster, role, setRole ,image, setImage ,inEditPage, setinEditPage }} >
            {children}
        </ThemeContext.Provider>
    )
};

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext