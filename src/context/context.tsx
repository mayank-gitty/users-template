// app/context/theme.js

'use client';

import { createContext, useContext, useState } from "react";

const ThemeContext:any = createContext({})

export const ThemeContextProvider = ({ children }) => {

    const initialFormData: any = {
        itskills:[],
        education: null,
        keyskills:[],
        resume_headline:"",
        profile_summary:"",
        total_experience:"",
        relevent_experience:"",
        
        // university: "",
        // course: null,
        // specialization: null,
        // coursetype: null,
        // startingYear: null,
        // endingYear: null,
        // gradingsystem: null,
        // marks: "",
      };
    
      const [formData, setFormData] = useState(initialFormData);

    return (
        <ThemeContext.Provider value={{formData,setFormData}} >
            {children}
        </ThemeContext.Provider>
    )
};

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext