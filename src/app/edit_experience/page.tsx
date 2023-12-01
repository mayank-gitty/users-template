"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import CustomizedSteppers from "../stepper/page";
import { useSearchParams } from "next/navigation";
import client from "../../../helpers/request";
import { PROFILE_USER } from "@/util/queries";
import useThemeContext from "@/context/context";
import Master from "@/components/master/page";
import { toast } from "react-toastify";
import { Group } from "@mantine/core";
import ExperienceDetails from "@/components/experience/page";
import { updateUser, updateUserExperience } from "@/util/mutationQueries";
import { useRouter } from "next/navigation";

export interface IAppProps {}

export function EditUser(props: IAppProps) {
  const searchParams: any = useSearchParams();

  const router = useRouter();

  const {
    formData,
    setFormData,
    active,
    setActive,
    inEditPage,
    setinEditPage,
  }:any = useThemeContext();

  const search = searchParams.get("id");

  const updateUserProfile = async () => {

    for (var i = 0, len = formData.experiences.length; i < len; i++) {
      delete formData.experiences[i].id;
    }


    if (formData?.experiences?.length === 0 ) {
      return toast("please add experience", {
        className: "black-background",  
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }


    // console.log('form',formData.experiences)

    const user: any = await client.request(updateUser, {
      where: {
        id: formData.profileUserId,
      },
      data: {
  
        resume_headline: formData.resume_headline,
 
        experience: {
          create: formData.experiences,
        },
        profile_summary: formData.profile_summary,
        photograph: formData.photograph,
        keyskills: {
          connect: formData.keyskills.map((item: any) => {
            return {
              id: item,
            };
          }),
        },
        itskills: {
          connect: formData.itskills.map((item: any) => {
            return {
              id: item,
            };
          }),
        },
        education: formData.education,
        // active: formData.status,
        // // open_to_work: formData.work,
        // createdAt: new Date(), 
      },  
    });

    // console.log("updated", user);

    if (user?.updateProfileUser) {
      setinEditPage(false);
      setActive(0);

      setFormData((prevData) => ({
        profileUserId: "",
        itskills: [],
        education: null,
        keyskills: [],
        resume_headline: "",
        profile_summary: "",

        experiences: [],
        photograph: "",
        resume: "",
      }));

      toast("details updated", {
        className: "green-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

      return router.push(`profile?id=${localStorage.getItem("id")}`);
    }
  };

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

    // console.log("user profile got in edit profile ", user);

    if (user?.profileUsers.length > 0) {
      setFormData((prevData: any) => ({
        profileUserId: user.profileUsers[0].id,
        itskills: user.profileUsers[0].itskills.map((item: any) => item.id),
        education: user.profileUsers[0].education,
        keyskills: user.profileUsers[0].keyskills.map((item: any) => item.id),
        resume_headline: user.profileUsers[0].resume_headline,
        profile_summary: user.profileUsers[0].profile_summary,
    
        experiences: [],
        photograph: user.profileUsers[0].photograph,
        resume: user.profileUsers[0].resume,
      }));

      setinEditPage(true);
    }

    // console.log("form data", formData);
  };

  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    getData(search);
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

    if (formData?.experiences?.length === 0 && active === 4) {
      return toast("please add experience", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

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

    setActive((current: number) => (current < 8 ? current + 1 : current));
  };

  return (
    <div>
      <div className="text-center">
        <h6 className="mt-4 mb-4"> </h6>
      </div>

      {/* <CustomizedSteppers /> */}

      <ExperienceDetails />

      <Group className="no-margin" position="center" mt="xl">
        <button className="next-button" onClick={updateUserProfile}>
          {" "}
          submit{" "}
        </button>
      </Group>
      <Group
        className="no-margin"
        position="left"
        mt="xl"
        style={{
          position: "absolute",
          left: "35%",
          transform: "translateY(-47px)",
        }}
      >
      </Group>
    </div>
  );
}

export default EditUser;
