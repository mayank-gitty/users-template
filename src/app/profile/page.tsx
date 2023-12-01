"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useSearchParams } from "next/navigation";
import useThemeContext from "@/context/context";
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
  Grid,
  Checkbox,
  TextInput,
  Input,
} from "@mantine/core";
import { PROFILE_USER } from "@/util/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faVideo } from "@fortawesome/free-solid-svg-icons";
import { updateUserExperience, updateUser } from "@/util/mutationQueries";

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
  const [hasMaster, sethasMaster] = useState(true);

  const { setActive, formData, setFormData } = useThemeContext();

  console.log("formdata", formData);

  const iconStyle = { width: rem(12), height: rem(12) };

  const router = useRouter();

  const [flag, setFlag] = useState(false);

  const [experience, setExperience] = useState({
    id: "",
    title: "",
    employment_type: "",
    company: "",
    location: "",
    location_type: "",
    start_year: "",
    start_year_month: "",
    end_year: "",
    end_year_month: "",
    currently_working: false,
  });

  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 30;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i.toString());
    }
    return years;
  }

  const options = [
    { value: "doctorate/phd", label: "Doctorate/Phd" },
    { value: "masters/post-graduation", label: "Masters/Post-Graduation" },
    { value: "graduation/diploma", label: "Graduation/Diploma" },
    { value: "12th", label: "12th" },
    { value: "10th", label: "10th" },
    { value: "below10th", label: "Below 10th" },
  ];

  const yearsData = generateArrayOfYears();

  const releventMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const type = [
    { label: "FullTime", value: "fullTime" },
    { label: "PartTime", value: "partTime" },
    { label: "SelfEmployed", value: "selfEmployed" },
    { label: "Freelance", value: "freelance" },
    { label: "Internship", value: "internship" },
    { label: "Trainee", value: "trainee" },
  ];

  const locationType = [
    { label: "remote", value: "remote" },
    { label: "office", value: "office" },
  ];

  const form: any = useForm({
    initialValues: {
      profileUserId: "",
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
      email: "",
      experience: [],
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

    if (user.profileUsers.length === 0) {
      // alert('insi')
      sethasMaster(false);
    }

    form.setValues({
      profileUserId: user.profileUsers[0].id,
      itskills: user?.profileUsers[0]?.itskills.map((item: any) => item.name),
      // .join(","),
      education: user?.profileUsers[0]?.education,

      keyskills: user?.profileUsers[0]?.keyskills.map((item: any) => item.name),
      // .join(","),
      resume_headline: user?.profileUsers[0]?.resume_headline,
      profile_summary: user.profileUsers[0]?.profile_summary,
      // total_experience: user.profileUsers[0]?.total_experience,
      // relevent_experience: user.profileUsers[0]?.relevent_experience,
      photograph: user.profileUsers[0]?.photograph,
      name: user?.profileUsers[0]?.user.name,
      status: user?.profileUsers[0]?.active,
      resume: user?.profileUsers[0]?.resume,
      work: user?.profileUsers[0]?.open_to_work,
      email: user?.profileUsers[0]?.user?.email,
      experience: user?.profileUsers[0]?.experience,
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
    // alert('refresh')
    getData(search);

    // console.log("kas", form.getInputProps("education"));
  }, [search, flag]);

  const handleChange = (field: any, e: any) => {
    console.log("hitting", field, e);

    setExperience((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  const updateExperience = async () => {
    console.log("update hitting", experience);

    const user: any = await client.request(updateUserExperience, {
      data: {
        title: experience.title,
        start_year_month: experience.start_year_month,
        start_year: experience.start_year,
        location_type: experience.location_type,
        location: experience.location,
        end_year_month: experience.end_year_month,
        end_year: experience.end_year,
        employment_type: experience.employment_type,
        currently_working: experience.currently_working,
        company: experience.company,
      },
      where: {
        id: experience.id,
      },
    });

    console.log("updated", user);

    if (user.updateAddExperience) {
      const button = document.getElementById("modal-close-btn");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const updateExperienceEducation = async () => {


    const user: any = await client.request(updateUser, {
      where: {
        id: form.getInputProps("profileUserId").value,
      },
      data: {
        education: form.getInputProps("education").value,
      },
    });

    console.log("updated", user);

    if (user?.updateProfileUser) {
      const button = document.getElementById("modal-close-btn-education");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  return (
    <Box
      mx="auto"
      className="view-profile-page bg-[#F3F7FB] h-screen px-[2%] pr-[60px]"
    >
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Experience
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Grid>
                <Grid.Col span={12}>
                  <label htmlFor=" "> Title </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> Employment Type </label>

                  <Select
                    value={experience.employment_type}
                    onChange={(value) => handleChange("employment_type", value)}
                    data={type}
                    placeholder="Select type"
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                      },
                      values: {
                        height: "100%",
                      },
                      wrapper: {
                        height: "50px",
                      },

                      leftIcon: {
                        marginRight: theme.spacing.md,
                      },
                    })}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> company </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> location </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> location type </label>
                  <Select
                    value={experience.location_type}
                    onChange={(value) => handleChange("location_type", value)}
                    data={locationType}
                    placeholder="Select type"
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                      },
                      values: {
                        height: "100%",
                      },
                      wrapper: {
                        height: "50px",
                      },

                      leftIcon: {
                        marginRight: theme.spacing.md,
                      },
                    })}
                  />
                </Grid.Col>
                {/* 
 <Grid.Col span={12}>
   <h6 className="experience-label"> Start Year </h6>
 </Grid.Col> */}

                <Grid.Col span={12}>
                  <Checkbox
                    checked={experience.currently_working ? true : false}
                    label="currently working here"
                    onChange={(e: any) =>
                      handleChange("currently_working", e.target.checked)
                    }
                  />
                  {/* 
                    {experience.currentlyWorking ? "true" : "false"} */}
                </Grid.Col>

                <Grid.Col span={12}>
                  <h6 className="experience-label">Start Date</h6>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Month"
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    onChange={(e) => handleChange("start_year_month", e)}
                    data={releventMonths}
                    value={experience.start_year_month}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                      },
                      values: {
                        height: "100%",
                      },
                      wrapper: {
                        height: "50px",
                      },

                      leftIcon: {
                        marginRight: theme.spacing.md,
                      },
                    })}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Year"
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    onChange={(e) => handleChange("start_year", e)}
                    data={yearsData}
                    value={experience.start_year}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                      },
                      values: {
                        height: "100%",
                      },
                      wrapper: {
                        height: "50px",
                      },

                      leftIcon: {
                        marginRight: theme.spacing.md,
                      },
                    })}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <h6 className="experience-label">End Date</h6>
                </Grid.Col>

                {!experience.currently_working && (
                  <>
                    <Grid.Col span={6}>
                      <Select
                        placeholder="Month"
                        nothingFound="No options"
                        maxDropdownHeight={280}
                        onChange={(e) => handleChange("end_year_month", e)}
                        data={releventMonths}
                        value={experience.end_year_month}
                        styles={(theme) => ({
                          input: {
                            height: "100%",
                          },
                          values: {
                            height: "100%",
                          },
                          wrapper: {
                            height: "50px",
                          },

                          leftIcon: {
                            marginRight: theme.spacing.md,
                          },
                        })}
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <Select
                        placeholder="Year"
                        nothingFound="No options"
                        maxDropdownHeight={280}
                        onChange={(e) => handleChange("end_year", e)}
                        data={yearsData}
                        value={experience.end_year}
                        styles={(theme) => ({
                          input: {
                            height: "100%",
                          },
                          values: {
                            height: "100%",
                          },
                          wrapper: {
                            height: "50px",
                          },

                          leftIcon: {
                            marginRight: theme.spacing.md,
                          },
                        })}
                      />
                    </Grid.Col>
                  </>
                )}
              </Grid>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="modal-close-btn"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => updateExperience()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModalEducation"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Education
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Grid>
                <Grid.Col span={12}>
                  <Input.Wrapper
                    styles={() => ({
                      label: {
                        color: "#01041b",
                        fontSize: "1.2em",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: 10,
                      },
                    })}
                  >
                    <Select
                      value={form.getInputProps("education").value}
                      onChange={(value) =>
                        form.setFieldValue("education", value)
                      }
                      data={options}
                      placeholder="Select Education"
                      styles={(theme) => ({
                        input: {
                          height: "100%",
                        },
                        values: {
                          height: "100%",
                        },
                        wrapper: {
                          height: "50px",
                        },

                        leftIcon: {
                          marginRight: theme.spacing.md,
                        },
                      })}
                    />
                  </Input.Wrapper>
                </Grid.Col>
              </Grid>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="modal-close-btn-education"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => updateExperienceEducation()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className=""
        // style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className="text-black text-2xl py-3  font-semibold">Profile</div>
        <div className="flex flex-col lg:flex-row  justify-center  gap-5 xl:12">
          <div className="w-full lg:w-1/4 px-3 py-4 h-full rounded bg-white">
            <div className="flex items-center justify-center flex-col bg-white">
              <div
                style={{
                  width: "242.215px",
                  height: "138.913px",
                  borderRadius: "7px",
                }}
              >
                <img
                  src={form.getInputProps("photograph").value}
                  alt="User Photograph"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
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
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1em",
                  marginTop: "1em",

                  // background:"red",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // background:"blue",
                    // width:"100%"
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
                </div>

                <Group>
                  {hasMaster && (
                    <Image
                      src="./images/profileicon.png"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                      onClick={() =>
                        router.push(
                          `/edit_user?id=${localStorage.getItem("id")}`
                        )
                      }
                    />
                  )}
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
                    <div className="w-28 flex border m-1 skill-chip">
                      <div className="bg-[#5847C3] w-3 flex items-start justify-start"></div>
                      <div className="px-2  text-black text-base font-semibold chip-inside">
                        {item}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 px-3 h-full rounded ">
            <Stack>
              <div className="p-4 h-full rounded bg-white">
                <Group position="apart" className="border-b pb-[10px]">
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
                  {/* <Image
                    src="./images/profileicon.png"
                    alt="Google"
                    style={{ width: "32px", height: "32px" }}
                  /> */}
                </Group>
                <Group position="apart" py={12}>
                  <div>
                    <Stack>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Email:
                      </div>
                    </Stack>
                    <Stack>
                      <div className="text-black text-base font-semibold">
                        {form.getInputProps("email").value}
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
            </Stack>

            <div className="flex flex-col lg:flex-row mt-3  justify-center  gap-5 xl:12 ">
              <div className="lg:w-1/2">
                <Stack>
                  <div className="p-4 h-full rounded bg-white">
                    <Group position="apart" className="border-b pb-[10px]">
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

                      {hasMaster && (
                        <Image
                          src="./assets/addIcon.png"
                          alt="Google"
                          style={{
                            width: "24px",
                            height: "32px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            // setActive(4);
                            router.push(
                              `/edit_experience?id=${localStorage.getItem(
                                "id"
                              )}`
                            );
                          }}
                        />
                      )}
                    </Group>
                    <Group position="apart" py={12}>
                      <div>
                        <Stack spacing={8}>
                          {form.getInputProps("experience")?.value?.length >
                            0 &&
                            form
                              .getInputProps("experience")
                              ?.value.map((item: any) => {
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
                                        {item.end_year -
                                          item.start_year +
                                          "yrs"}{" "}
                                      </p>

                                      <p> {item.location} </p>
                                    </div>

                                    <Image
                                      onClick={() => {
                                        setExperience({
                                          title: item.title,
                                          employment_type: item.employment_type,
                                          company: item.company,
                                          location: item.location,
                                          location_type: item.location_type,
                                          start_year: item.start_year,
                                          start_year_month:
                                            item.start_year_month,
                                          end_year: item.end_year,
                                          end_year_month: item.end_year_month,
                                          currently_working:
                                            item.currently_working,
                                          id: item.id,
                                        });
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      // data-toggle="modal"
                                      // data-target="#exampleModalLong"
                                      src="./images/Edit.svg"
                                      alt="Google"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        marginLeft: "10rem",
                                      }}
                                    />
                                  </div>
                                );
                              })}
                        </Stack>
                      </div>
                    </Group>
                  </div>
                </Stack>
              </div>

              <div className="lg:w-1/2">
                <Stack>
                  <div className="p-4 h-full rounded bg-white">
                    <Group position="apart" className="border-b pb-[10px]">
                      <Group position="left">
                        <Image
                          src="./images/educationIcon.svg"
                          alt="Google"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <div className="text-black text-base font-semibold">
                          Education
                        </div>
                      </Group>

                      {/* {hasMaster && (
                        <Image
                        
                          src="./images/profileicon.png"
                          alt="Google"
                          onClick={() => {
                            // setActive(2);
                            // router.push(
                            //   `/edit_user?id=${localStorage.getItem("id")}`
                            // );
                          }}
                          style={{ width: "32px", height: "32px" }}
                        />
                      )} */}
                    </Group>
                    <Group position="apart" py={12}>
                      <div>
                        <Stack spacing={8}>
                          <div className="text-indigo-950 text-sm font-bold">
                            Highest Education
                          </div>

                          <div className="text-gray-600 text-xs font-normal">
                            {form.getInputProps("education")?.value}
                          </div>
                        </Stack>
                      </div>
                      {
                        <Image
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalEducation"
                          src="./images/Edit.svg"
                          alt="Google"
                          style={{ width: "24px", height: "24px" }}
                        />
                      }
                    </Group>
                  </div>
                </Stack>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center  gap-5 xl:12 mt-3">
              <div className="w-full">
                <Stack>
                  {/* <div className="p-4 h-full xl:w-[420px] rounded "></div> */}
                  <div className="p-4 h-full rounded bg-white">
                    <Group position="apart" className="border-b pb-[10px]">
                      <Group position="left">
                        <Image
                          src="./images/resume.svg"
                          alt="Google"
                          style={{ width: "24px", height: "24px" }}
                          onClick={() =>
                            router.push(
                              `/edit_user?id=${localStorage.getItem("id")}`
                            )
                          }
                        />
                        <div className="text-black text-base font-semibold">
                          Resume
                        </div>
                      </Group>

                      {hasMaster && (
                        <Image
                          src="./images/profileicon.png"
                          alt="Google"
                          style={{ width: "32px", height: "32px" }}
                          onClick={() =>
                            router.push(
                              `/edit_user?id=${localStorage.getItem("id")}`
                            )
                          }
                        />
                      )}
                    </Group>

                    <Group position="apart" py={12}>
                      <div>
                        <Stack spacing={8}>
                          <div className="text-indigo-950 text-sm font-bold">
                            <a
                              download={
                                form
                                  .getInputProps("resume")
                                  ?.value?.includes("docx") ||
                                form
                                  .getInputProps("resume")
                                  ?.value?.includes("doc")
                                  ? true
                                  : false
                              }
                              target="_blank"
                              className="resume-link"
                              href={form.getInputProps("resume")?.value}
                            >
                              {" "}
                              {form
                                .getInputProps("resume")
                                ?.value?.substr(
                                  6,
                                  form.getInputProps("resume")?.value.length
                                )}{" "}
                            </a>
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
          </div>
        </div>
      </div>
    </Box>
  );
}
