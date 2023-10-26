"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useSearchParams } from "next/navigation";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  MultiSelect,
  Select,
} from "@mantine/core";
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
  query ProfileUser($where: ProfileUserWhereUniqueInput!) {
    profileUser(where: $where) {
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


        uploadToServer(i)
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
        id: search,
      },
    });

    console.log("user", user);

    form.setValues({
      itskills: user?.profileUser?.itskills.map((item: any) => item.id),
      education: user?.profileUser?.education,
      keyskills: user?.profileUser?.keyskills.map((item: any) => item.id),
      resume_headline: user?.profileUser.resume_headline,
      profile_summary: user.profileUser.profile_summary,
      total_experience: user.profileUser.total_experience,
      relevent_experience: user.profileUser.relevent_experience,
      photograph:  user.profileUser.photograph,
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

    getDatas();

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
        
            createdAt: new Date()
        
        
      },
    });

    console.log("updated", user);

    setTimeout(() => {
      router.push("/profileUsers");
    }, 1000);
  };

  return (
    <Box maw={340} mx="auto"  >
      <form onSubmit={form.onSubmit((values) => sendAll(values))}>
        <Select
          value={form.getInputProps("education").value}
          onChange={(value) => handleChange("education", value)}
          data={options}
          // options={options}
          placeholder="Select Education"
          // styles={customStyles}
        />
        <MultiSelect
          label="it skills"
          placeholder="Pick value"
          onChange={(e) => handleChange("itskills", e)}
          value={form.getInputProps("itskills").value}
          data={form.getInputProps("allItskills").value}
        />

        <MultiSelect
          label="key skills"
          placeholder="Pick value"
          onChange={(e) => handleChange("keyskills", e)}
          value={form.getInputProps("keyskills").value}
          data={form.getInputProps("allKeyskills").value}
        />

        <TextInput
          withAsterisk
          label="profile_summary"
          {...form.getInputProps("profile_summary")}
          placeholder="write"
        />

        <TextInput
          withAsterisk
          label="relevent_experience"
          placeholder="experience"
          {...form.getInputProps("relevent_experience")}
        />

        <TextInput
          withAsterisk
          label="total experience"
          placeholder="experience"
          {...form.getInputProps("total_experience")}
        />

        <TextInput
          withAsterisk
          label="resume_headline"
          placeholder="education"
          {...form.getInputProps("resume_headline")}
        />

        <div>
          <div>
            <div className="profile-upload">
              <img src={form.getInputProps("photograph").value} />
            </div>

            <h4> Select Image </h4>
            <input type="file" name="myImage" onChange={uploadToClient} />
            {/* <button
              className="btn btn-primary"
              type="button"
              onClick={uploadToServer}
            >
              upload
            </button> */}
          </div>

          <Group justify="center" mt="md">
            <button type="submit" className="btn btn-primary">
              {" "}
              submit{" "}
            </button>
          </Group>
        </div>
      </form>
    </Box>
  );
}