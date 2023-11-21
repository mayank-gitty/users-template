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
  Tabs,
  rem,
  Stack,
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
import ProfileUser from "@/schemas/ProfileUser";

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

    console.log("user profile got", user);

    form.setValues({
      itskills: user?.profileUsers[0]?.itskills.map((item: any) => item.name),
      // .join(","),
      education: user?.profileUsers[0]?.education,

      keyskills: user?.profileUsers[0]?.keyskills.map((item: any) => item.name),
      // .join(","),
      resume_headline: user?.profileUsers[0]?.resume_headline,
      profile_summary: user.profileUsers[0]?.profile_summary,
      total_experience: user.profileUsers[0]?.total_experience,
      relevent_experience: user.profileUsers[0]?.relevent_experience,
      photograph: user.profileUsers[0]?.photograph,
      name: user?.profileUsers[0]?.user.name,
      status: user?.profileUsers[0]?.active,
      resume: user?.profileUsers[0]?.resume,
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
    <Box
      mx="auto"
      className="view-profile-page bg-[#F3F7FB] h-screen px-[2%] pr-[60px]"
    >
      <div
        className=""
        // style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="text-black text-2xl py-4  font-semibold">Profile</div>
        <div className="flex flex-col lg:flex-row items-center justify-center  gap-5 xl:12">
          <div className="w-full lg:w-1/4 px-3 py-4 h-full rounded bg-white">
            <div className="flex items-center justify-center flex-col bg-white">
              <div>
                <img
                  src={form.getInputProps("photograph").value}
                  style={{
                    width: "100%",
                    maxWidth: "242.215px",
                    height: " 138.913px;",
                    borderRadius: "7px",
                  }}
                  alt="User Photograph"
                />
              </div>
              <div>
                <div className="text-black text-[28px] font-semibold pt-3 flex items-center justify-center">
                  {form.getInputProps("name").value ||
                    localStorage.getItem("name")}
                </div>
                <div className="text-[#ABABAB] text-base font-medium flex items-center justify-center">
                  {form.getInputProps("resume_headline").value}
                </div>
                <div className="text-[#797878] text-xs font-medium flex items-center justify-center">
                  {form.getInputProps("profile_summary").value}
                </div>
              </div>
              <Group
                spacing={8}
                style={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "left",
                }}
              >
                <Image
                  src="./images/Icon-Skill.svg"
                  alt="Google"
                  style={{ width: "28px", height: "28px" }}
                />
                <div className="text-black text-base font-semibold ml-1">
                  Skills
                </div>
                <Group spacing={6} ml={24}>
                  <Image
                    src="./images/Icon-Skill.svg"
                    alt="Google"
                    style={{ width: "24px", height: "24px" }}
                  />
                </Group>
              </Group>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "8rem",
                  // background:"yellow"
                }}
              >
                {form.getInputProps("keyskills")?.value?.map((item: any) => {
                  return (
                    <div className="w-28 flex border">
                      <div className="bg-[#5847C3] w-3 flex items-start justify-start"></div>
                      <div className="px-2 py-1 text-black text-base font-semibold">
                        {item}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Stack>
            <div className="p-4 h-full   rounded bg-white">
              <Group position="apart" className="border-b pb-3">
                <Group position="left">
                  <Image
                    src="./images/profile.svg"
                    alt="Google"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <div className="text-black text-base font-semibold">
                    Basic Information
                  </div>
                </Group>
                <Image
                  src="./images/profileicon.png"
                  alt="Google"
                  style={{ width: "32px", height: "32px" }}
                />
              </Group>
              <Group position="apart" py={12}>
                <div>
                  <Stack>
                    <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                      {/* Mobile Number: */}
                    </div>
                  </Stack>
                  <Stack>
                    <div className="text-black text-base font-semibold">
                      {/* 31233616359612 */}
                    </div>
                  </Stack>
                </div>
                <div>
                  <Stack>
                    <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                      {/* Email: */}
                    </div>
                  </Stack>
                  <Stack>
                    <div className="text-black text-base font-semibold">
                      {/* 31233616359612 */}
                    </div>
                  </Stack>
                </div>
                <div>
                  <Stack>
                    <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                      {/* Address: */}
                    </div>
                  </Stack>
                  <Stack>
                    <div className="text-black text-base font-semibold">
                      {/* Noida */}
                    </div>
                  </Stack>
                </div>
              </Group>
              <Group position="left" mt={"3%"}>
                <p style={{ alignItems: "center", justifyContent: "center" }}>
                  {form.getInputProps("status").value ? (
                    <span className="px-4 py-2 bg-emerald-100 rounded-sm text-green-600 text-xs font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-rose-100 rounded-sm text-red-600 text-xs font-medium">
                      Inactive
                    </span>
                  )}
                </p>
                <p className="work">
                  {form.getInputProps("work").value ? (
                    <span className="px-4 py-2 bg-violet-100 rounded-sm text-indigo-500 text-xs font-medium">
                      Open to Work
                    </span>
                  ) : (
                    <span className="bg-rose-100 rounded-sm text-red-700 text-xs font-medium">
                      Engaged
                    </span>
                  )}
                </p>
              </Group>
            </div>
            <div className="p-4 h-full rounded bg-white">
              <Group position="apart" className="border-b pb-3">
                <Group position="left">
                  <Image
                    src="./images/experience.svg"
                    alt="Google"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div className="text-black text-base font-semibold">
                    Experience
                  </div>
                </Group>
                <Image
                  src="./images/profileicon.png"
                  alt="Google"
                  style={{ width: "32px", height: "32px" }}
                />
              </Group>
              <Group position="apart" py={12}>
                <div>
                  <Stack spacing={8}>
                    <div className="text-indigo-950 text-sm font-bold">
                      Total Experience
                    </div>
                    {/* <div className="text-gray-600 text-xs font-normal">
                      Amazon Inc  
                    </div> */}
                    <div className="text-gray-600 text-xs font-normal">
                      {form.getInputProps("total_experience")?.value}
                    </div>
                  </Stack>
                </div>
                <Image
                  src="./images/Edit.svg"
                  alt="Google"
                  style={{ width: "24px", height: "24px" }}
                />
              </Group>
              <Group position="apart" py={12}>
                <div>
                  <Stack spacing={8}>
                    <div className="text-indigo-950 text-sm font-bold">
                      Relevant Experience
                    </div>
                    {/* <div className="text-gray-600 text-xs font-normal">
                      Amazon Inc
                    </div> */}
                    <div className="text-gray-600 text-xs font-normal">
                      {form.getInputProps("relevent_experience")?.value}
                    </div>
                  </Stack>
                </div>
                <Image
                  src="./images/Edit.svg"
                  alt="Google"
                  style={{ width: "24px", height: "24px" }}
                />
              </Group>
            </div>
          </Stack>
          <Stack>
            <div className="p-4 h-full xl:w-[420px] rounded bg-white">
              <Group position="apart" className="border-b pb-3">
                <Group position="left">
                  <Image
                    src="./images/education.svg"
                    alt="Google"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <div className="text-black text-base font-semibold">
                    Education
                  </div>
                </Group>
                <Image
                  src="./images/profileicon.png"
                  alt="Google"
                  style={{ width: "32px", height: "32px" }}
                />
              </Group>
              <Group position="apart" py={12}>
                <div>
                  <Stack spacing={8}>
                    <div className="text-indigo-950 text-sm font-bold">
                      Information Technology
                    </div>
                    <div className="text-gray-600 text-xs font-normal">
                      University of Oxford
                    </div>
                    <div className="text-gray-600 text-xs font-normal">
                      Jan 2015 - Feb 2022 . 5 years
                    </div>
                  </Stack>
                </div>
                <Image
                  src="./images/Edit.svg"
                  alt="Google"
                  style={{ width: "24px", height: "24px" }}
                />
              </Group>
              <Group position="apart" py={12}>
                <div>
                  <Stack spacing={8}>
                    <div className="text-indigo-950 text-sm font-bold">
                      Information Technology
                    </div>
                    <div className="text-gray-600 text-xs font-normal">
                      University of Oxford
                    </div>
                    <div className="text-gray-600 text-xs font-normal">
                      Jan 2015 - Feb 2022 . 5 years
                    </div>
                  </Stack>
                </div>
                <Image
                  src="./images/Edit.svg"
                  alt="Google"
                  style={{ width: "24px", height: "24px" }}
                />
              </Group>
            </div>
            <div className="p-4 h-full rounded bg-white">
              <Group position="apart" className="border-b pb-3">
                <Group position="left">
                  <Image
                    src="./images/resume.svg"
                    alt="Google"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div className="text-black text-base font-semibold">
                    Resume
                  </div>
                </Group>
                <Image
                  src="./images/profileicon.png"
                  alt="Google"
                  style={{ width: "32px", height: "32px" }}
                />
              </Group>
              <Group position="apart" py={12}>
                <Group position="left">
                  <Image
                    src="./images/Edit.svg"
                    alt="Google"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <Stack spacing={8}>
                    <div className="text-indigo-950 text-sm font-bold"></div>
                    <div className="text-gray-600 text-xs font-normal">
                      867 Kb. Feb 2022
                    </div>
                  </Stack>
                </Group>

                <Image
                  src="./images/Edit.svg"
                  alt="Google"
                  style={{ width: "24px", height: "24px" }}
                />
              </Group>
              <Group position="apart" py={12}>
                <div>
                  <Stack spacing={8}>
                    <div className="text-indigo-950 text-sm font-bold">
                      {form
                        .getInputProps("resume")
                        ?.value?.substr(
                          6,
                          form.getInputProps("resume")?.value.length
                        )}
                    </div>
                    <div className="text-gray-600 text-xs font-normal">
                      867 Kb. Feb 2022
                    </div>
                  </Stack>
                </div>
                <Image
                  src="./images/Edit.svg"
                  alt="Google"
                  style={{ width: "24px", height: "24px" }}
                />
              </Group>
            </div>
          </Stack>
        </div>
      </div>
    </Box>
  );
}
