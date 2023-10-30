"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useSearchParams } from "next/navigation";
import { Tabs, rem } from "@mantine/core";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  MultiSelect,
  Select,
} from "@mantine/core";

import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { serialize } from "v8";

const updateUser = gql`
  mutation Mutation(
    $where: ProfileUserWhereUniqueInput!
    $data: ProfileUserUpdateInput!
  ) {
    updateProfileUser(where: $where, data: $data) {
      total_experience
    }
  }
`;

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

const PROFILE_USER = gql`
  query ProfileUsers($where: ProfileUserWhereInput!) {
    profileUsers(where: $where) {
      user {
        name
        id
        email
      }
      total_experience
      resume_headline
      relevent_experience
      profile_summary
      photograph
      keyskillsCount
      active
      open_to_work
      keyskills {
        name
        id
      }
      itskills {
        name
        id
      }
      education
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
    console.log("useEffect", typeof search, search);

    // getDatas();

    getData(search);

    console.log("kas", form.getInputProps("education"));
  }, [search]);

  // console.log("all-it", form.getInputProps("itskills").value);
  // console.log("all-it-ley", form.getInputProps("allItskills").value);

  const handleChange = (field: any, e: any) => {
    console.log("hitting", e);

    form.setFieldValue(field, e);
  };

  const sendAll = async (values: any) => {
    console.log("mcom", values);

    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        total_experience: values.total_experience,

        resume_headline: values.resume_headline,
        relevent_experience: values.relevant_experience,
        profile_summary: values.profile_summary,
        photograph: values.photograph,
        keyskills: {
          connect: values.keyskills.map((item: any) => {
            return {
              id: item,
            };
          }),
        },
        itskills: {
          connect: values.itskills.map((item: any) => {
            return {
              id: item,
            };
          }),
        },
        education: values.education,

        createdAt: new Date(),
      },
    });

    console.log("updated", user);

    setTimeout(() => {
      router.push("/profileUsers");
    }, 2000);
  };

  console.log("f", form.getInputProps("photograph").value);

  return (
    <Box mx="auto" className="view-profile-page">
      <div className="upper-section">
        <div className="upper-layer-section d-flex">
          <div className="left-section d-flex">
            <div className="img">
              <img src={form.getInputProps("photograph").value} />
            </div>

            <div className="attached-section">
              <h4>
                {" "}
                {form.getInputProps("name").value ||
                  localStorage.getItem("name")}{" "}
              </h4>

              <h6> {form.getInputProps("resume_headline").value} </h6>

              {/* <h6> {form.getInputProps("profile_summary").value}  </h6> */}
            </div>
          </div>

          <div className="right-section d-flex flex-column">

            <p  className="status" >  {'active'}  </p> 

             <p  className="work" >    {'open to work'}  </p> 

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
