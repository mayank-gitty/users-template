"use client"
import Image from 'next/image'
import AddTimeLine from './multipleuser/page'
import { MantineProvider } from '@mantine/core'
import Login from './login/page'
import Education from './education/page'
import ResumeForm from './resume/page'
import ItSkills from './itskill/page'
import ProjectForm from './project/page'
import KeySkills from './keyskill/page'
import SideBar from "./Sidebar/page"
import ResumeUpload from "./upload-resume/page"
import ProfileImageUpload from './photograph/page'
import DatatablePage from './profileUsers/page'
import Profile from './Profile/page'
import ResumeHeadline from './resume-headline/page'
import Master from './master/page'

export default function Home() {
  return (
    <>
      <MantineProvider>
        {/* 
      <ProfileUser/> */}
      {/* <AddTimeLine/> */}
      {/* <Login/> */}
      {/* <Profile/>
      <ResumeHeadline/> */}
      {/* <ProfileImageUpload/> */}
      {/* <SideBar/> */}
      {/* <Education/> */}
      {/* <ResumeForm/> */}
    {/* <ItSkills/> */}
     {/* <ProjectForm/> */}
     {/* <ResumeUpload/> */}
     {/* <KeySkills/> */}
     {/* < DatatablePage/>
     <AddTimeLine/> */}
     <Master/>
     </MantineProvider>
    </>
  );
}
