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
  Image,
  Stack,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { IT_SKILLS, KEY_SKILLS, VIEW_MASTER } from "@/util/queries";
import { serialize } from "v8";

const cardStyle = {
  width: "400px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  padding: "10px",
  backgroundColor: "#fff",
  margin: "5px",
};

const imageStyle = {
  maxWidth: "100%",
  borderRadius: "100%",
};

const titleStyle = {
  fontSize: "20px",
  margin: "10px 0",
};

const textStyle = {
  color: "#555",
};

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
      resume: "",
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

  // console.log("skils", form.getInputProps("itskills").value);

  const getData = async (search: any) => {
    console.log("id", search);

    const user: any = await client.request(VIEW_MASTER, {
      where: {
        id: search,
      },
    });

    console.log("userE", user);

    form.setValues({
      itskills: user?.profileUser?.itskills.map((item: any) => item.name),
      education: user?.profileUser?.education,
      keyskills: user?.profileUser?.keyskills.map((item: any) => item.name),
      resume_headline: user?.profileUser.resume_headline,
      profile_summary: user.profileUser.profile_summary,
      experience: user?.profileUser?.experience,
      // total_experience: user.profileUser.total_experience,
      // relevent_experience: user.profileUser.relevent_experience,
      photograph: user.profileUser.photograph,
      name: user?.profileUser?.user?.name,
      address: user?.profileUser?.user?.address,
      resume: user.profileUser?.resume,
    });
  };

  const getDatas = async () => {
    const itskills: any = await client.request(IT_SKILLS);

    const keyskills: any = await client.request(KEY_SKILLS);

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
    getData(search);
  }, [search]);

  const handleChange = (field: any, e: any) => {
    // console.log("hitting", e);

    form.setFieldValue(field, e);
  };

  console.log("eduaction", form.getInputProps("education").value);

  return (
    <div className="bg-wrapper  pt-[64px] ">
      <div className="text-black text-2xl py-3  ml-[63px]  font-semibold ">
        {" "}
        View Employee{" "}
      </div>
      <div className="flex  items-center justify-start ml-[63px] view-master-card">
        <Stack>
          <div className="view-box h-full w-full rounded bg-white  mt-[20px] ">
            <Group position="apart" className=" pb-3">
              <Group position="left">
                <div className="profile-img-master-view">
                  <img
                    src={form.getInputProps("photograph").value}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "7px",
                    }}
                    alt="User Photograph"
                  />
                </div>
                <Stack spacing={5} className="view-master-info-section">
                  <div className="text-black text-[28px] font-semibold">
                    {" "}
                    {form.getInputProps("name").value ||
                      localStorage.getItem("name")}
                  </div>
                  <div className="text-neutral-400 text-base font-medium ">
                    {form.getInputProps("resume_headline").value}
                  </div>
                  <div className="w-[220.29px] text-neutral-500 text-[12px] font-medium">
                    {form.getInputProps("profile_summary").value}
                  </div>
                </Stack>
              </Group>
            </Group>
            <Group position="apart" className="w-full lg:w-[100%]" py={12}>
              <Grid>
                <Grid.Col
                  span={4}
                  style={{
                    marginTop: "2em",
                    marginBottom: "3em",
                  }}
                >
                  <Group position="left" style={{ alignItems: "flex-start" }}>
                    <Image
                      src="./images/education.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />

                    <Stack spacing={3}>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Education
                      </div>
                      <div className="text-black text-base font-semibold">
                        {form
                          .getInputProps("education")
                          ?.value?.map((item: any) => {
                            return (
                              <div
                                className="d-flex justify-content-between"
                                style={{
                                  // background:"yellow",
                                  width: "100%",
                                }}
                              >
                                <div className="text-indigo-950 text-sm font-bold">
                                  <h6> {item.school} </h6>
                                  <h6
                                    style={{
                                      fontWeight: "400",
                                    }}
                                  >
                                    {" "}
                                    {item.degree} ,{" "}
                                    {/* <span> {item.employment_type} </span>{" "} */}
                                  </h6>

                                  <p
                                    style={{
                                      marginBottom: "0.5rem",
                                    }}
                                  >
                                    {" "}
                                    <span> {item.start_year} - </span>{" "}
                                    <span> {item.end_year} </span> ,
                                    {item.end_year - item.start_year + "yrs"}{" "}
                                  </p>

                                  <p> {item.activities} </p>
                                  <p> {item.description} </p>
                                </div>

                                {/* <Image
            onClick={() => {
              setEducation({
                id: item.id,
                school: item.school,
                // schoolOther: "",
                degree: item.degree,
                // degreeOther: "",
                field_of_study:
                  item.field_of_study,
                // field_of_studyOther: "",
                grade: item.grade,
                activities: item.activities,
                description: item.description,
                start_year: item.start_year,
                start_year_month:
                  item.start_year_month,
                end_year: item.end_year,
                end_year_month:
                  item.end_year_month,
              });
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModalEducation"
            // data-toggle="modal"
            // data-target="#exampleModalLong"
            src="./images/Edit.svg"
            alt="Google"
            style={{
              width: "24px",
              height: "24px",
              marginLeft: "10rem",
            }}
          /> */}
                              </div>
                            );
                          })}
                      </div>{" "}
                    </Stack>
                  </Group>
                </Grid.Col>

                <Grid.Col
                  span={4}
                  style={{
                    marginTop: "2em",
                    marginBottom: "3em",
                    // background:"red"
                  }}
                >
                  <Group position="left" style={{ alignItems: "flex-start" }}>
                    <Image
                      src="./images/experience.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />

                    <Stack spacing={3}>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Experience
                      </div>

                      {form.getInputProps("experience")?.value?.map((item) => {
                        return (
                          <div
                            className="d-flex justify-content-between"
                            style={{
                              // background:"yellow",
                              width: "100%",
                            }}
                          >
                            <div className="text-indigo-950 text-sm font-bold">
                              <h6> {item.title} </h6>
                              <h6
                                style={{
                                  fontWeight: "400",
                                }}
                              >
                                {" "}
                                {item.company} ,{" "}
                                <span> {item.employment_type} </span>{" "}
                              </h6>

                              <p
                                style={{
                                  marginBottom: "0.5rem",
                                }}
                              >
                                {" "}
                                <span> {item.start_year} - </span>{" "}
                                <span> {item.end_year} </span> ,
                                {item.end_year - item.start_year + "yrs"}{" "}
                              </p>

                              <p> {item.location} </p>
                            </div>

                            {/* <Image
                        // onClick={() => {
                        //   setExperience({
                        //     title: item.title,
                        //     employment_type: item.employment_type,
                        //     company: item.company,
                        //     location: item.location,
                        //     location_type: item.location_type,
                        //     start_year: item.start_year,
                        //     start_year_month:
                        //       item.start_year_month,
                        //     end_year: item.end_year,
                        //     end_year_month: item.end_year_month,
                        //     currently_working:
                        //       item.currently_working,
                        //     id: item.id,
                        //   });
                        // }}
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModal"
                        // data-toggle="modal"
                        // data-target="#exampleModalLong"
                        src="./images/Edit.svg"
                        alt="Google"
                        style={{
                          width: "24px",
                          height: "24px",
                          marginLeft: "10rem",
                        }}
                      /> */}
                          </div>
                        );
                      })}
                    </Stack>
                  </Group>
                </Grid.Col>

                <Grid.Col
                  span={4}
                  style={{
                    marginTop: "2em",
                    marginBottom: "3em",
                  }}
                >
                  <Group position="left" style={{ alignItems: "flex-start" }}>
                    <Image
                      src="./images/Icon-Skill.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />

                    <Stack spacing={3}>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        It skills
                      </div>
                      <div className="text-black text-base font-semibold skills-container-view-master">
                        {" "}
                        {form
                          .getInputProps("itskills")
                          ?.value?.map((item: any, index: number) => {
                            return (
                              <span>
                                {" "}
                                {item}{" "}
                                {index + 1 !==
                                form.getInputProps("itskills")?.value?.length
                                  ? ","
                                  : ""}{" "}
                              </span>
                            );
                          })}
                      </div>
                    </Stack>
                  </Group>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Group position="left" style={{ alignItems: "flex-start" }}>
                    <Image
                      src="./images/Icon-Skill.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <Stack spacing={3}>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Key Skills
                      </div>
                      <div className="text-black text-base font-semibold skills-container-view-master">
                        {" "}
                        {form
                          .getInputProps("keyskills")
                          ?.value?.map((item: any, index: number) => {
                            return (
                              <span>
                                {" "}
                                {item}
                                {index + 1 !==
                                form.getInputProps("keyskills")?.value?.length
                                  ? ","
                                  : ""}{" "}
                              </span>
                            );
                          })}
                      </div>
                    </Stack>
                  </Group>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Group position="left" style={{ alignItems: "flex-start" }}>
                    <Image
                      src="./images/resume.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />

                    <Stack spacing={3}>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Resume
                      </div>
                      <div className="text-black text-base font-semibold ">
                        {" "}
                        <a
                          target="_blank"
                          download={
                            form
                              .getInputProps("resume")
                              ?.value.includes("docx") ||
                            form.getInputProps("resume")?.value.includes("doc")
                              ? true
                              : false
                          }
                          href={form.getInputProps("resume")?.value}
                        >
                          view resume
                        </a>
                        {/* {form.getInputProps("resume").value}{" "} */}
                      </div>
                    </Stack>
                  </Group>
                </Grid.Col>

                <Grid.Col span={4}>
                  <Group position="left" style={{ alignItems: "flex-start" }}>
                    <Image
                      src="./images/resume.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />

                    <Stack spacing={3}>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Location
                      </div>
                      <div className="text-black text-base font-semibold">
                        {form.getInputProps("address")?.value}
                      </div>
                    </Stack>
                  </Group>
                </Grid.Col>
              </Grid>
            </Group>
          </div>
        </Stack>
      </div>
    </div>
  );
}
