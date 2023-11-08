"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Group,
  Box,
  MultiSelect,
  Select,
  Image,
  Tabs, rem,
} from "@mantine/core";
import { PROFILE_USER } from "@/util/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faVideo } from "@fortawesome/free-solid-svg-icons";

import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconCircleCheckFilled,
  IconVideo,
  IconCircleOff,
  IconVideoOff,
} from "@tabler/icons-react";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { serialize } from "v8";

const options = [
  { value: "doctorate/phd", label: "Doctorate/Phd" },
  { value: "masters/post-graduation", label: "Masters/Post-Graduation" },
  { value: "graduation/diploma", label: "Graduation/Diploma" },
  { value: "12th", label: "12th" },
  { value: "10th", label: "10th" },
  { value: "below10th", label: "Below 10th" },
];

const IT_SKILLS = gql`
  query ItSkills {
    itSkills {
      name
      id
    }
  }
`;

// Define mutation
const KEY_SKILLS = gql`
  query KeySkills {
    keySkills {
      name
      id
    }
  }
`;

export interface IAppProps {}

export default function View(props: IAppProps) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const iconStyle = { width: rem(12), height: rem(12) };

  const router = useRouter();

  const form: any = useForm({
    initialValues: {
      allItskills: [],
      allKeyskills: [],
      itskills: [],
      education: null,
      keyskills: [],
      resume_headline: "",
      profile_summary: "",
      total_experience: "",
      relevent_experience: "",
      photograph: "",
      name: "",
      status: "",
      work: "",
    },
    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      uploadToServer(i);
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    console.log("image-file111111", event.name);
    body.append("image-file1", event);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    // console.log('mk',response)

    if (response.ok) {
      alert("uploaded succesfully");

      form.setFieldValue("photograph", `uploads/${event?.name}`);
    }
  };

  const searchParams: any = useSearchParams();

  const search = searchParams.get("id");

  console.log("skils", form.getInputProps("itskills").value);

  const getData = async (search: any) => {
    console.log("id", search);

    const user: any = await client.request(PROFILE_USER, {
      where: {
        user: {
          id: {
            equals: search,
          },
        },
      },
    });

    console.log("user", user);

    form.setValues({
      itskills: user?.profileUsers[0]?.itskills
        .map((item: any) => item.name)
        .join(","),
      education: user?.profileUsers[0]?.education,

      keyskills: user?.profileUsers[0]?.keyskills
        .map((item: any) => item.name)
        .join(","),
      resume_headline: user?.profileUsers[0]?.resume_headline,
      profile_summary: user.profileUsers[0]?.profile_summary,
      total_experience: user.profileUsers[0]?.total_experience,
      relevent_experience: user.profileUsers[0]?.relevent_experience,
      photograph: user.profileUsers[0]?.photograph,
      name: user?.profileUsers[0]?.user.name,
      status: user?.profileUsers[0]?.active,
      work: user?.profileUsers[0]?.open_to_work,
    });
  };

  const getDatas = async () => {
    const itskills: any = await client.request(IT_SKILLS);

    const keyskills: any = await client.request(KEY_SKILLS);

    // console.log('allItskills',itskills.itSkills)

    // console.log('allKeyskills',keyskills.keySkills)

    form.setFieldValue(
      "allItskills",
      itskills?.itSkills?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      })
    );

    form.setFieldValue(
      "allKeyskills",
      keyskills?.keySkills?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      })
    );
  };

  useEffect(() => {
    // console.log("useEffect", typeof search, search);

    // getDatas();

    getData(search);

    // console.log("kas", form.getInputProps("education"));
  }, [search]);

  // console.log("all-it", form.getInputProps("itskills").value);
  // console.log("all-it-ley", form.getInputProps("allItskills").value);

  const handleChange = (field: any, e: any) => {
    console.log("hitting", e);

    form.setFieldValue(field, e);
  };

  console.log("f", form.getInputProps("photograph").value);

  return (
    <Box mx="auto" className="view-profile-page bg-[#F3F7FB] h-screen pl-[4%]">
      <div
        className=""
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="text-black text-2xl py-4  font-semibold">Profile</div>
        <div className="flex items-star justify-start gap-4">
        <div className=" w-[280px] px-3 py-4 h-full rounded-sm bg-white">
        <div className="flex items-center justify-center flex-col bg-white">
          <div className="">
            <img
              src={form.getInputProps("photograph").value}
              style={{ width: "242px", height: "140px", borderRadius: "7px" }}
              alt="User Photograph"
            />
          </div>
          
          <div className="">
            <div className="text-black text-[28px] font-semibold pt-3 flex items-center justify-center">
              {form.getInputProps("name").value || localStorage.getItem("name")}
            </div>
            <div className="text-[#ABABAB] text-base font-medium flex items-center justify-center">
              {form.getInputProps("resume_headline").value}
            </div>
            <div className="text-[#797878] text-xs font-medium flex items-center justify-center">
              {form.getInputProps("profile_summary").value}
            </div>
          
         
          </div>
         
          <Group  spacing={8} style={{display:'flex', alignItems:'start', justifyContent:'left'}}>
          <Image
              src="./images/Icon-Skill.svg"
              alt="Google"
              style={{width:'28px', height:'28px'}}
            />    
          <div className="text-black text-base font-semibold ml-1">Skills</div>
          <Group  spacing={6} ml={24}>
          <Image
              src="./images/Icon-Skill.svg"
              alt="Google"
              style={{width:'24px', height:'24px'}}
            />   
            </Group>
          </Group>
          <div className="flex items-start justify-between gap-2">
          <div className="w-28 flex  border">
          <div className=" bg-[#5847C3] w-3 flex items-start justify-start"></div>
          <div className=" px-4 py-2 text-black text-base font-semibold">Skills</div>
          </div>
          <div className="w-28 flex  border">
          <div className=" bg-[#5847C3] w-3 flex items-start justify-start"></div>
          <div className=" px-4 py-2 text-black text-base font-semibold">Skills</div>
          </div>
          </div>
        </div>
        </div>
        <div className=" w-[600px] px-3 py-4 h-full rounded-sm bg-white">
        <Group position="apart">
        <Group position='left'>
          <div>hello</div>
          <div>hello</div>
          </Group>
          <div>hello</div>
        </Group>
        </div>
        </div>
        <div className="tabs-section">
          <Tabs defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab
                value="gallery"
                leftSection={<IconPhoto style={iconStyle} />}
              >
                Education
              </Tabs.Tab>
              <Tabs.Tab
                value="experience"
                leftSection={<IconMessageCircle style={iconStyle} />}
              >
                Experience
              </Tabs.Tab>
              <Tabs.Tab
                value="itskills"
                leftSection={<IconSettings style={iconStyle} />}
              >
                ItSkills
              </Tabs.Tab>
              <Tabs.Tab
                value="keyskills"
                leftSection={<IconSettings style={iconStyle} />}
              >
                KeySkills
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              {form.getInputProps("education").value
                ? form.getInputProps("education").value
                : "no education added"}
            </Tabs.Panel>

            <Tabs.Panel value="experience">
              {form.getInputProps("total_experience").value
                ? form.getInputProps("total_experience").value
                : "no experience added"}
            </Tabs.Panel>

            <Tabs.Panel value="itskills">
              {form.getInputProps("itskills").value
                ? form.getInputProps("itskills").value
                : "no skills added"}
            </Tabs.Panel>

            <Tabs.Panel value="keyskills">
              {form.getInputProps("keyskills").value
                ? form.getInputProps("keyskills").value
                : "no keyskills added"}
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </Box>
  );
}
