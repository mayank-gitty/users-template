"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useSearchParams } from "next/navigation";
import { Anchor } from "@mantine/core";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  MultiSelect,
  Select,
  Image,
  Stack,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { serialize } from "v8";
import { IT_SKILLS, KEY_SKILLS, EDIT_MASTER } from "@/util/queries";
import { updateUser } from "@/util/mutationQueries";

const options = [
  { value: "doctorate/phd", label: "Doctorate/Phd" },
  { value: "masters/post-graduation", label: "Masters/Post-Graduation" },
  { value: "graduation/diploma", label: "Graduation/Diploma" },
  { value: "12th", label: "12th" },
  { value: "10th", label: "10th" },
  { value: "below10th", label: "Below 10th" },
];

export interface IAppProps {}

export default function View(props: IAppProps) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [checked, setChecked] = useState(false);

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
      status: null,
      work: null,
      user: "",
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

    const user: any = await client.request(EDIT_MASTER, {
      where: {
        id: search,
      },
    });

    // console.log("user", user);

    form.setValues({
      itskills: user?.profileUser?.itskills.map((item: any) => item.id),
      education: user?.profileUser?.education,
      keyskills: user?.profileUser?.keyskills.map((item: any) => item.id),
      resume_headline: user?.profileUser.resume_headline,
      profile_summary: user.profileUser.profile_summary,
      total_experience: user.profileUser.total_experience,
      relevent_experience: user.profileUser.relevent_experience,
      photograph: user.profileUser.photograph,
      status: user?.profileUser?.active,
      work: user?.profileUser?.open_to_work,
      user: user?.profileUser?.user?.name,
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
        active: values.status,
        open_to_work: values.work,
        createdAt: new Date(),
      },
    });

    console.log("updated", form.getInputProps(""));

    setTimeout(() => {
      router.push("/profileUsers");
    }, 2000);
  };

  return (
    <div className="bg-wrapper ">
      <div className="text-black text-2xl py-1  ml-[63px]  font-semibold ">
        {" "}
        Edit User{" "}
      </div>
      <div className="flex  items-center justify-start ml-[63px] ">
        <Stack>
        <form onSubmit={form.onSubmit((values) => sendAll(values))}>
          <div className="edit_master h-full w-full rounded bg-white  mt-[6px] ">
            <Grid>
              <Grid.Col
                span={4}
                style={{
                  marginTop: "2em",
                  marginBottom: "3em",
                }}
              >
                <Group position="apart" className=" pb-3">
                  <Group position="left">
                    <div className="profile-img-master-view">
                      <div className="edit-master-profle edit-icon">
                      <input type="file" name="myImage" onChange={uploadToClient} />
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M12.0539 4.97535L2.94803 14.0813L2.75092 16.2496C2.70541 16.7501 3.12477 17.1695 3.62534 17.124L5.79363 16.9269L14.8995 7.82095L12.0539 4.97535Z" fill="#4D47C3"/>
  <path d="M15.4687 7.25183L17.176 5.54446C17.4904 5.23015 17.4904 4.72054 17.176 4.40622L15.4687 2.69886C15.1544 2.38454 14.6448 2.38455 14.3304 2.69886L12.6231 4.40623L15.4687 7.25183Z" fill="#4D47C3"/>
</svg> */}

                      </div>
                      <img
                        src={form.getInputProps("photograph")?.value}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "7px",
                        }}
                        alt="User Photograph"
                      />
                    </div>
                    
                    <Stack
                      spacing={5}
                      className="view-master-info-section"
                    ></Stack>
                  </Group>
                </Group>
              </Grid.Col>

              <Grid.Col span={8} style={{
                    paddingRight:"6em",
              }} >
                <Grid>
                  <Grid.Col span={6}>
                    {" "}
                    <TextInput
                      withAsterisk
                      disabled
                      label="Name"
                      {...form.getInputProps("user")}
                      placeholder="write"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="education"
                      value={form.getInputProps("education").value}
                      onChange={(value) => handleChange("education", value)}
                      data={options}
                      // options={options}
                      placeholder="Select Education"
                      // styles={customStyles}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <MultiSelect
                      label="it skills"
                      placeholder="Pick value"
                      onChange={(e) => handleChange("itskills", e)}
                      value={form.getInputProps("itskills").value}
                      data={form.getInputProps("allItskills").value}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <MultiSelect
                      label="key skills"
                      placeholder="Pick value"
                      onChange={(e) => handleChange("keyskills", e)}
                      value={form.getInputProps("keyskills").value}
                      data={form.getInputProps("allKeyskills").value}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      withAsterisk
                      label="profile_summary"
                      {...form.getInputProps("profile_summary")}
                      placeholder="write"
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      withAsterisk
                      label="relevent_experience"
                      placeholder="experience"
                      {...form.getInputProps("relevent_experience")}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      withAsterisk
                      label="total experience"
                      placeholder="experience"
                      {...form.getInputProps("total_experience")}
                    />
                  </Grid.Col>

                  <Grid.Col>
                    <TextInput
                      withAsterisk
                      label="resume_headline"
                      placeholder="education"
                      {...form.getInputProps("resume_headline")}
                    />
                  </Grid.Col>

                  <Grid.Col>
                    <Checkbox
                      label={<>open to work</>}
                      checked={form.getInputProps("work").value ? true : false}
                      onChange={(event) =>
                        form.setFieldValue("work", event.currentTarget.checked)
                      }
                    />
                  </Grid.Col>

                  <Grid.Col>
                    <div className="d-flex justify-content-end ">
                      <button className="edit-master-btn"> save </button>
                    </div>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </div>
          </form>
        </Stack>

      </div>
    </div>
  );
}
