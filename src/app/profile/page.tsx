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
  IconVideoOff
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
    <Box mx="auto" className="view-profile-page">
      <div
        className="upper-section"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="upper-layer-section d-flex">
          <div className="d-flex">
            <div style={{width:'200px', height:'200px', }}>
              <img src={form.getInputProps("photograph").value} style={{width:'170px', height:'170px',border:'8px solid gray' }} />
            </div>
            <div className="ml-6">
              <h3 style={{ color: "#4833b5" }}>
                {" "}
                {form.getInputProps("name").value ||
                  localStorage.getItem("name")}{" "}
              </h3>

              <h6 style={{ color: "gray" }}>
                {" "}
                {form.getInputProps("resume_headline").value}{" "}
              </h6>

              {/* <h6> {form.getInputProps("profile_summary").value}  </h6> */}
              <p className="status" style={{alignItems:'center', justifyContent:'center'}}>
                {form.getInputProps("status").value ? (
                  <span className="active" style={{display:'flex', alignItems:'center', justifyContent:'center',}}>
                    <IconCircleCheckFilled size={18} style={{display:'flex', alignItems:'center', justifyContent:'center', marginRight:20}} /> Active
                  </span>
                ) : (
                  <span className="inactive" style={{display:'flex', alignItems:'center', justifyContent:'center',color:'red',border:'1px solid red',  borderRadius:'30px', padding:'3px'}}>
                    <IconCircleOff size={20} style={{display:'flex', alignItems:'center', justifyContent:'center', marginRight:20, color:'red'}}/> Inactive
                  </span>
                )}
              </p>

              <p className="work">
                {form.getInputProps("work").value ? (
                  <span className="open" style={{display:'flex', alignItems:'center', justifyContent:'center',backgroundColor:'green', borderRadius:'30px',padding:'3px' }}>
                    <IconVideo size={20} style={{display:'flex', alignItems:'center', justifyContent:'center', marginRight:20}} /> Open to Work
                  </span>
                ) : (
                  <span className="engaged" style={{display:'flex', alignItems:'center', justifyContent:'center',backgroundColor:'red', borderRadius:'30px', padding:'3px'}}>
                    <IconVideoOff size={20} style={{display:'flex', alignItems:'center', justifyContent:'center', marginRight:20,}}/> Engaged
                  </span>
                )}
              </p>
            </div>
            {/* <div className=" flex-column mx-auto">
            <p className="status">
              {" "}
              {form.getInputProps("status").value ? "active" : "in active"}{" "}
            </p>

            <p className="work">
              {" "}
              {form.getInputProps("work").value
                ? "open to work"
                : "engaged"}{" "}
            </p>
          </div> */}
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
