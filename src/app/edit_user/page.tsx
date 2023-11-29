"use client"

import * as React from 'react';
import { useEffect ,useState } from 'react';
import CustomizedSteppers from '../stepper/page';
import { useSearchParams } from "next/navigation";
import client from '../../../helpers/request';
import { PROFILE_USER } from '@/util/queries';
import useThemeContext from '@/context/context';
import Master from '@/components/master/page';
import { Group } from '@mantine/core';


export interface IAppProps {
}

export function EditUser (props: IAppProps) {


  const searchParams: any = useSearchParams();

  const {formData,setFormData, active, setActive,inEditPage, setinEditPage }   = useThemeContext()
  
  const search = searchParams.get("id");

  const getData = async (search: any) => {
    // console.log("id", search);

    const user: any = await client.request(PROFILE_USER, {
      where: {
        user: {
          id: {
            equals: search,
          },
        },
      },
    });

    console.log("user profile got in edit profile ", user);


    if(user?.profileUsers.length > 0) {

      setFormData((prevData: any) => ({
        profileUserId:user.profileUsers[0].id,
        itskills:user.profileUsers[0].itskills.map((item:any)=>item.id),
        education:user.profileUsers[0].education,
        keyskills:user.profileUsers[0].keyskills.map((item:any)=>item.id),
        resume_headline:user.profileUsers[0].resume_headline,
        profile_summary:user.profileUsers[0].profile_summary,
        // total_experience:"",
        // total_experience_months:"",
        // // relevent_experience:"",
        // total_relevant_months:"",
        experiences:user.profileUsers[0].experience,
        photograph:user.profileUsers[0].photograph,
        resume:user.profileUsers[0].resume,
      }));


      setinEditPage(true)
  
    }


    console.log("form data", formData);




   




    // form.setValues({
    //   itskills: user?.profileUsers[0]?.itskills.map((item: any) => item.name),
    //   // .join(","),
    //   education: user?.profileUsers[0]?.education,

    //   keyskills: user?.profileUsers[0]?.keyskills.map((item: any) => item.name),
    //   // .join(","),
    //   resume_headline: user?.profileUsers[0]?.resume_headline,
    //   profile_summary: user.profileUsers[0]?.profile_summary,
    //   // total_experience: user.profileUsers[0]?.total_experience,
    //   // relevent_experience: user.profileUsers[0]?.relevent_experience,
    //   photograph: user.profileUsers[0]?.photograph,
    //   name: user?.profileUsers[0]?.user.name,
    //   status: user?.profileUsers[0]?.active,
    //   resume: user?.profileUsers[0]?.resume,
    //   work: user?.profileUsers[0]?.open_to_work,
    //   email: user?.profileUsers[0]?.user?.email,
    //   experience: user?.profileUsers[0]?.experience,
    // });
  }

  const prevStep = () =>
  setActive((current:number) => (current > 0 ? current - 1 : current));


  useEffect(() => {
    getData(search);

    // console.log("kas", form.getInputProps("education"));
  }, [search]);



  
  const nextStep = () => {
    if (!formData.photograph && active === 0) {
      return toast("please upload photo", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (formData.keyskills.length === 0 && active === 1) {
      return toast("please select key skills", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!formData.education && active === 2) {
      return toast("please select education", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!formData.resume_headline && active === 3) {
      return toast("please enter resume headline", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (formData?.experiences?.length === 0  && active === 4) {
      return toast("please add experience", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    // if (!formData.total_experience && active === 4) {
    //   return toast("please add total experience ", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }

    // if (!formData.total_experience_months && active === 4) {
    //   return toast("please add experience months", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!formData.relevent_experience && active === 4) {
    //   return toast("please add relevant experience", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!formData.total_relevant_months && active === 4) {
    //   return toast("please add relevant experience months", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }

    // const totalExperience =
    //   parseInt(formData.total_experience) +
    //   "." +
    //   parseInt(formData.total_experience_months);

    // const totalRelevant =
    //   parseInt(formData.relevent_experience) +
    //   "." +
    //   parseInt(formData.total_relevant_months);

    // console.log('exp',totalRelevant)

    // if (parseFloat(totalRelevant) > parseFloat(totalExperience)) {
    //   return toast(
    //     "relevant experience can not greater than total experience",
    //     {
    //       className: "black-background",
    //       bodyClassName: "grow-font-size",
    //       progressClassName: "fancy-progress-bar",
    //     }
    //   );
    // }

    if (!formData.resume && active === 5) {
      return toast("please upload resume in pdf or docx format", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (formData.itskills.length === 0 && active === 6) {
      return toast("please select it skills", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    setActive((current:number) => (current < 8 ? current + 1 : current));
  };


  return (
    <div>
      
      <div className="text-center">

      <h6 className='mt-4 mb-4' > Edit your details </h6>

      </div>


        <CustomizedSteppers/>


        
      <Group className="no-margin" position="center" mt="xl">
        {active !== 9 && active !== 7 && active !== 8 && (
          <button className="next-button" onClick={nextStep}>
            Next
          </button>
        )}
      </Group>
      <Group className="no-margin" position="left" mt="xl" style={{
        position:"absolute",
        left:"35%",
        transform:'translateY(-47px)'
      }} >
        {active !== 9  && active !== 8 && active !== 0 && (
          <button className=" below-back-button" onClick={prevStep}>
            Previous
          </button>
        )}
      </Group>

    </div>
  );
}


export default  EditUser
