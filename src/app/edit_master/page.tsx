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
  Input,
  Grid,
  Container,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { serialize } from "v8";
import { IT_SKILLS, KEY_SKILLS, EDIT_MASTER } from "@/util/queries";
import {
  updateUser,
  updateUserEducation,
  updateUserExperience,
  updateUserProject,
  deleteEducation,
  deleteProject,
  deleteExperience

} from "@/util/mutationQueries";
import { toast } from "react-toastify";

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

  const [schoolOther, setSchoolOther] = useState("");
  const [degreeOther, setDegreeOther] = useState("");
  const [fieldOther, setFieldOther] = useState("");

  const [flag, setFlag] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  
  const updateThisProject = async () => {
    const user: any = await client.request(updateUserProject, {
      data: {
        client: project.client,
        projectStatus: project.projectStatus,
        workFromYear: project.workFromYear,
        workFromMonth: project.workFromMonth,
        projectTitle: project.projectTitle,
        projectLocation: project.projectLocation,
        projectSite: project.projectSite,
        natureOfEmployment: project.natureOfEmployment,
        teamSize: project.teamSize,
        role: project.role,
        roleDescription: project.roleDescription,
        skillUsed: project.skillUsed,
      },
      where: {
        id: project.id,
      },
    });

    if (user.updateProject) {
      const button = document.getElementById("modal-close-btn-project");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
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

    if (user.updateAddExperience) {
      const button = document.getElementById("modal-close-btn");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };


  const [project, setProject] = useState({
    id: "",
    projectTitle: "",
    client: "",
    projectStatus: "inProgress",
    workFromYear: "",
    workFromMonth: "",
    detailsOfProject: "",
    projectLocation: "",
    projectSite: "Offsite",
    natureOfEmployment: "Full Time",
    teamSize: "",
    role: "",
    roleDescription: "",
    skillUsed: "",
  });

  const options = [
    { value: "doctorate/phd", label: "Doctorate/Phd" },
    { value: "masters/post-graduation", label: "Masters/Post-Graduation" },
    { value: "graduation/diploma", label: "Graduation/Diploma" },
    { value: "12th", label: "12th" },
    { value: "10th", label: "10th" },
    { value: "below10th", label: "Below 10th" },
  ];

  const indianEducationArray = [
    // Schools
    "other",
    "Delhi Public School (DPS)",
    "Kendriya Vidyalaya",
    "Doon School, Dehradun",
    "Sanskriti School, New Delhi",
    "The Shri Ram School, Delhi",
    "St. Xavier's School, Mumbai",
    "La Martiniere College, Lucknow",
    "Mayo College, Ajmer",
    "Modern School, Delhi",
    "Welham Girls' School, Dehradun",
    // Add more common schools as needed

    // Universities
    "University of Delhi",
    "Jawaharlal Nehru University (JNU)",
    "Banaras Hindu University (BHU)",
    "St. Stephen's College, Delhi",
    "Christ University, Bangalore",
    "BITS Pilani",
    "Xavier Labour Relations Institute (XLRI), Jamshedpur",
    "Indian Statistical Institute (ISI), Kolkata",
    "Indian Institutes of Technology (IITs)",
    "Indian Institutes of Management (IIMs)",
    // Add more common universities as needed
  ];

  const allDegreesArray = [
    "other",
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BS)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Engineering (BEng)",
    "Bachelor of Computer Science (BCS)",
    "Bachelor of Nursing (BN)",
    "Bachelor of Architecture (BArch)",
    "Bachelor of Education (BEd)",
    "Bachelor of Music (BMus)",
    "Bachelor of Social Work (BSW)",
    "Bachelor of Laws (LLB)",
    // Add more Bachelor's degrees as needed

    "Master of Arts (MA)",
    "Master of Science (MS)",
    "Master of Fine Arts (MFA)",
    "Master of Business Administration (MBA)",
    "Master of Engineering (MEng)",
    "Master of Computer Science (MCS)",
    "Master of Public Health (MPH)",
    "Master of Architecture (MArch)",
    "Master of Education (MEd)",
    "Master of Music (MMus)",
    "Master of Social Work (MSW)",
    "Master of Laws (LLM)",
    // Add more Master's degrees as needed
  ];

  const fields = [
    "other",
    "Delhi Public",
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Environmental Science",
    "Psychology",
    "Economics",
    "Business Administration",
    "Marketing",
    "Finance",
    "Political Science",
    "International Relations",
    "English Literature",
    "History",
    "Sociology",
    "Nursing",
    "Medicine",
    "Law",
    "Education",
    "Architecture",
    // Add more common fields of study as needed
  ];

  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 30;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i.toString());
    }
    return years;
  }

  const handleChangeEducation = (field: any, e: any) => {
    // console.log("hitting", field, e);

    setEducation((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  const handleChangeProject = (field: any, e: any) => {
    console.log("hitting", field, e);

    setProject((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  const updateExperienceEducation = async () => {
    console.log("educationss", education);

    if (education.school === "other") {
      education.school = schoolOther;
    }

    if (education.degree === "other") {
      education.school = degreeOther;
    }

    if (education.field_of_study === "other") {
      education.school = fieldOther;
    }

    const user: any = await client.request(updateUserEducation, {
      where: {
        id: education.id,
      },
      data: {
        // id: "id" + new Date().getTime(),
        school: education.school,
        // schoolOther: "",
        degree: education.degree,
        // degreeOther: "",
        field_of_study: education.field_of_study,
        // field_of_studyOther: "",
        grade: education.grade,
        activities: education.activities,
        description: education.description,
        start_year: education.start_year,
        start_year_month: education.start_year_month,
        end_year: education.end_year,
        end_year_month: education.end_year_month,
      },
    });

    // console.log("updated", user);

    if (user?.updateAddEducation) {
      const button = document.getElementById("modal-close-btn-education");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

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

  const router = useRouter();

  const [education, setEducation] = useState({
    id: "",
    school: "",
    // schoolOther: "",
    degree: "",
    // degreeOther: "",
    field_of_study: "",
    // field_of_studyOther: "",
    grade: "",
    activities: "",
    description: "",
    start_year: "",
    start_year_month: "",
    end_year: "",
    end_year_month: "",
  });

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

  const form: any = useForm({
    initialValues: {
      allItskills: [],
      allKeyskills: [],
      itskills: [],
      education: null,
      keyskills: [],
      resume_headline: "",
      profile_summary: "",
      experiences: [],
      experience: null,
      project: null,
      // total_experience: "",
      // relevent_experience: "",
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

    console.log("user in edit master", user);

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
      experience: user?.profileUser?.experience,
      project: user?.profileUser?.project,
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


  const deleteSpecificProject = async () => {
    console.log("delete specific project", project);

    const user: any = await client.request(deleteProject, {
      where: {
        id: project.id,
      },
    });

    if (user.deleteProject) {
      const button = document.getElementById("modal-close-btn-project");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const deleteSpecificExperience = async () => {
    console.log("delete hitting", experience);

    const user: any = await client.request(deleteExperience, {
      where: {
        id: experience.id,
      },
    });

    if (user.deleteAddExperience) {
      const button = document.getElementById("modal-close-btn");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const deleteSpecificEducation = async () => {
    console.log("delete education hitting", education);

    const user: any = await client.request(deleteEducation, {
      where: {
        id: education.id,
      },
    });

    // console.log('delete-user',user)

    if (user.deleteAddEducation) {
      const button = document.getElementById("modal-close-btn");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };


  useEffect(() => {
    console.log("useEffect", typeof search, search);

    getDatas();

    getData(search);

    console.log("kas", form.getInputProps("education"));
  }, [search, flag]);

  // console.log("all-it", form.getInputProps("itskills").value);
  // console.log("all-it-ley", form.getInputProps("allItskills").value);

  const handleChange = (field: any, e: any) => {
    console.log("hitting", e);

    setExperience((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  const sendAll = async (values: any) => {
    console.log("mcom", values);

    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        // total_experience: values.total_experience,
        resume_headline: values.resume_headline,
        // relevent_experience: values.relevant_experience,
        // experience:values.experience,
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

        active: values.status,
        open_to_work: values.work,
        createdAt: new Date(),
      },
    });

    toast("updated", {
      className: "green-background",
      bodyClassName: "grow-font-size",
      progressClassName: "fancy-progress-bar",
    });
  };

  return (
    <div className="bg-wrapper ">
      <div
        class="modal fade"
        id="exampleModalProject"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Project
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Container size="xs" px="xs">
                <Paper
                  shadow="xl"
                  p="md"
                  // style={{  }}
                >
                  <h6 style={{ textAlign: "left", fontSize: "20px" }}>
                    Edit Project
                  </h6>

                  <form>
                    <Grid>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project Title"
                          error={formErrors?.projectTitle}
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
                          <Input
                            placeholder="Project Title"
                            required
                            value={project.projectTitle}
                            onChange={(e) =>
                              handleChangeProject(
                                "projectTitle",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Client"
                          error={formErrors?.client}
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
                          <Input
                            placeholder="Client"
                            required
                            value={project.client}
                            onChange={(e) =>
                              handleChangeProject("client", e.target.value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project Status"
                          error={formErrors?.projectStatus}
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
                          <div>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="projectStatus"
                                value="inprogress"
                                required
                                checked={project.projectStatus === "inprogress"}
                                onChange={() =>
                                  handleChangeProject(
                                    "projectStatus",
                                    "inprogress"
                                  )
                                }
                              />
                              In Progress
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="projectStatus"
                                value="finished"
                                required
                                checked={project.projectStatus === "finished"}
                                onChange={() =>
                                  handleChangeProject(
                                    "projectStatus",
                                    "finished"
                                  )
                                }
                              />
                              Finished
                            </label>
                          </div>
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ flex: 1, marginRight: "10px" }}>
                            <Input.Wrapper
                              label="Work From Year"
                              error={formErrors?.workFromYear}
                            >
                              <Select
                                placeholder="Year"
                                data={["2022", "2023", "2024"]} // Your list of years
                                value={project.workFromYear}
                                onChange={(value) =>
                                  handleChangeProject("workFromYear", value)
                                }
                              />
                            </Input.Wrapper>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Input.Wrapper
                              label="Work From Month"
                              error={formErrors?.workFromMonth}
                            >
                              <Select
                                placeholder="Month"
                                data={[
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
                                ]} // Your list of months
                                value={project.workFromMonth}
                                onChange={(value) =>
                                  handleChangeProject("workFromMonth", value)
                                }
                              />
                            </Input.Wrapper>
                          </div>
                        </div>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Details Of Project"
                          error={formErrors?.detailsOfProject}
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
                          <textarea
                            placeholder="Type here..."
                            required
                            style={{
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                            }}
                            value={project.detailsOfProject}
                            onChange={(e) =>
                              handleChangeProject(
                                "detailsOfProject",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project location"
                          error={formErrors?.projectLocation}
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
                          <Input
                            placeholder="Type here.."
                            required
                            value={project.projectLocation}
                            onChange={(e) =>
                              handleChangeProject(
                                "projectLocation",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project Site"
                          error={formErrors?.projectSite}
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
                          <div>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="projectSite"
                                value="Offsite"
                                required
                                checked={project.projectSite === "offsite"}
                                onChange={() =>
                                  handleChangeProject("projectSite", "offsite")
                                }
                              />
                              Offsite
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="projectSite"
                                value="finished"
                                required
                                checked={project.projectStatus === "onsite"}
                                onChange={() =>
                                  handleChangeProject("projectSite", "onsite")
                                }
                              />
                              Onsite
                            </label>
                          </div>
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Nature Of Employment"
                          error={formErrors?.natureOfEmployment}
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
                          <div>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="natureOfEmployment"
                                value="fulltime"
                                required
                                checked={
                                  project.natureOfEmployment === "fulltime"
                                }
                                onChange={() =>
                                  handleChangeProject(
                                    "natureOfEmployment",
                                    "fulltime"
                                  )
                                }
                              />
                              Full Time
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="natureOfEmployment"
                                value="parttime"
                                required
                                checked={
                                  project.natureOfEmployment === "parttime"
                                }
                                onChange={() =>
                                  handleChangeProject(
                                    "natureOfEmployment",
                                    "parttime"
                                  )
                                }
                              />
                              Part Time
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="natureOfEmployment"
                                value="contractual"
                                required
                                checked={
                                  project.natureOfEmployment === "contractual"
                                }
                                onChange={() =>
                                  handleChangeProject(
                                    "natureOfEmployment",
                                    "contractual"
                                  )
                                }
                              />
                              Contractual
                            </label>
                          </div>
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Team Size"
                          error={formErrors?.teamSize}
                        >
                          <Select
                            placeholder="Select team size"
                            data={[
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                              "12",
                            ]} // Your list of size
                            value={project.teamSize}
                            onChange={(value) =>
                              handleChangeProject("teamSize", value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper label="Role" error={formErrors?.role}>
                          <Select
                            placeholder="Role"
                            data={[
                              "java dev",
                              "react dev",
                              "python dev",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                              "12",
                            ]} // Your list of size
                            value={project.role}
                            onChange={(value) =>
                              handleChangeProject("role", value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Role description"
                          error={formErrors?.roleDescription}
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
                          <textarea
                            placeholder="Role Description"
                            required
                            style={{
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                            }}
                            value={project.roleDescription}
                            onChange={(e) =>
                              handleChangeProject(
                                "roleDescription",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Role description"
                          error={formErrors?.roleDescription}
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
                          <textarea
                            placeholder="Role Description"
                            required
                            style={{
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                            }}
                            value={project.skillUsed}
                            onChange={(e) =>
                              handleChangeProject("skillUsed", e.target.value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col
                        span={12}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingTop: "10px",
                        }}
                      ></Grid.Col>
                    </Grid>
                  </form>
                </Paper>
              </Container>
            </div>
            <div class="modal-footer">
              <button
                className="btn btn-danger"
                onClick={() => deleteSpecificProject()}
              >
                {" "}
                delete{" "}
              </button>

              <button
                type="button"
                id="modal-close-btn-project"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => updateThisProject()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
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

                <Grid.Col span={12}>
                  <Checkbox
                    checked={experience.currently_working ? true : false}
                    label="currently working here"
                    onChange={(e: any) =>
                      handleChange("currently_working", e.target.checked)
                    }
                  />
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
                className="btn btn-danger"
                onClick={() => deleteSpecificExperience()}
              >
                {" "}
                delete{" "}
              </button>
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
                  <Container size="xs" px="xs">
                    <h6 className="box-heading"> Add education </h6>
                    {/* <p className="box-sub-heading">Select your highest education</p> */}

                    <form>
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
                          ></Input.Wrapper>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Input.Wrapper
                            label="school,University,Institute"
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
                              value={education.school}
                              onChange={(value) =>
                                handleChangeEducation("school", value)
                              }
                              data={indianEducationArray}
                              placeholder="Select Insiitue"
                            />
                            {/* {errors.university && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.university}
                    </p>
                  )} */}
                          </Input.Wrapper>

                          {education.school === "other" && (
                            <Grid.Col span={12}>
                              <Input.Wrapper
                                label="write here"
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
                                <Input
                                  placeholder="write other school name here"
                                  required
                                  onChange={(e) =>
                                    setSchoolOther(e.target.value)
                                  }
                                  styles={(theme) => ({
                                    input: {
                                      height: 50,
                                      width: "100%",
                                      fontSize: 16,
                                      lineHeight: 50,
                                      borderRadius: 8,
                                      border: "2px solid #ccc",
                                    },
                                  })}
                                />
                              </Input.Wrapper>
                            </Grid.Col>
                          )}
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Input.Wrapper
                            label="Course"
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
                              value={education.degree}
                              onChange={(value) =>
                                handleChangeEducation("degree", value)
                              }
                              data={allDegreesArray}
                              placeholder="Select Course"
                            />

                            {/* {errors.course && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.course}
                    </p>
                  )} */}
                          </Input.Wrapper>
                        </Grid.Col>

                        {education.degree === "other" && (
                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="write course name here"
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
                              <Input
                                placeholder="write here"
                                required
                                onChange={(e) => setDegreeOther(e.target.value)}
                                styles={(theme) => ({
                                  input: {
                                    height: 50,
                                    width: "100%",
                                    fontSize: 16,
                                    lineHeight: 50,
                                    borderRadius: 8,
                                    border: "2px solid #ccc",
                                  },
                                })}
                              />
                            </Input.Wrapper>
                          </Grid.Col>
                        )}

                        <Grid.Col span={12}>
                          <Input.Wrapper
                            label="field of study"
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
                              value={education.field_of_study}
                              onChange={(value: any) =>
                                handleChangeEducation("field_of_study", value)
                              }
                              data={fields}
                              placeholder="field of study"
                            />
                          </Input.Wrapper>
                        </Grid.Col>

                        {education.field_of_study === "other" && (
                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="write here"
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
                              <Input
                                placeholder="write field name here"
                                required
                                onChange={(e) => setFieldOther(e.target.value)}
                                styles={(theme) => ({
                                  input: {
                                    height: "100%",
                                    width: "100%",
                                    fontSize: 16,
                                    lineHeight: 50,
                                    borderRadius: 8,
                                    border: "2px solid #ccc",
                                  },
                                })}
                              />
                            </Input.Wrapper>
                          </Grid.Col>
                        )}

                        <Grid.Col span={12}>
                          <h6 className="experience-label">Start Date</h6>
                        </Grid.Col>

                        <Grid.Col span={6}>
                          <Select
                            placeholder="Month"
                            nothingFound="No options"
                            maxDropdownHeight={280}
                            onChange={(e) =>
                              handleChangeEducation("start_year_month", e)
                            }
                            data={releventMonths}
                            value={education.start_year_month}
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
                            onChange={(e) =>
                              handleChangeEducation("start_year", e)
                            }
                            data={yearsData}
                            value={education.start_year}
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

                        <Grid.Col span={6}>
                          <Select
                            placeholder="Month"
                            nothingFound="No options"
                            maxDropdownHeight={280}
                            onChange={(e) => handleChange("end_year_month", e)}
                            data={releventMonths}
                            value={education.end_year_month}
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
                            onChange={(e) =>
                              handleChangeEducation("end_year", e)
                            }
                            data={yearsData}
                            value={education.end_year}
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
                          <Input.Wrapper
                            label="Grade"
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
                            <Input
                              placeholder="grade"
                              required
                              onChange={(e) =>
                                handleChangeEducation("grade", e.target.value)
                              }
                              value={education.grade}
                              styles={(theme) => ({
                                input: {
                                  height: 50,
                                  width: "100%",
                                  fontSize: 16,
                                  lineHeight: 50,
                                  borderRadius: 8,
                                  border: "2px solid #ccc",
                                },
                              })}
                            />
                          </Input.Wrapper>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Input.Wrapper
                            label="Activities"
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
                            <Input
                              placeholder="activities"
                              required
                              value={education.activities}
                              onChange={(e) =>
                                handleChangeEducation(
                                  "activities",
                                  e.target.value
                                )
                              }
                              styles={(theme) => ({
                                input: {
                                  height: 50,
                                  width: "100%",
                                  fontSize: 16,
                                  lineHeight: 50,
                                  borderRadius: 8,
                                  border: "2px solid #ccc",
                                },
                              })}
                            />

                            {/* {errors.gradingsystem && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.gradingsystem}
                    </p>
                  )} */}
                          </Input.Wrapper>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Input.Wrapper
                            label="Description"
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
                            <Input
                              placeholder="description"
                              required
                              value={education.description}
                              onChange={(e) =>
                                handleChangeEducation(
                                  "description",
                                  e.target.value
                                )
                              }
                              styles={(theme) => ({
                                input: {
                                  height: 50,
                                  width: "100%",
                                  fontSize: 16,
                                  lineHeight: 50,
                                  borderRadius: 8,
                                  border: "2px solid #ccc",
                                },
                              })}
                            />
                          </Input.Wrapper>
                        </Grid.Col>

                        {/* Submit button */}
                      </Grid>
                    </form>
                  </Container>
                </Grid.Col>
              </Grid>
            </div>
            <div class="modal-footer">
              <button
                className="btn btn-danger"
                onClick={() => deleteSpecificEducation()}
              >
                {" "}
                delete{" "}
              </button>

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
                          <input
                            id="edit-master-input"
                            type="file"
                            name="myImage"
                            onChange={uploadToClient}
                          />
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

                <Grid.Col
                  span={8}
                  style={{
                    paddingRight: "6em",
                  }}
                >
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

                    <Grid.Col span={12}>
                      {" "}
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium mb-2">
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

                                <Image
                                  onClick={() => {
                                    setEducation({
                                      id: item.id,
                                      school: item.school,
                                      // schoolOther: "",
                                      degree: item.degree,
                                      // degreeOther: "",
                                      field_of_study: item.field_of_study,
                                      // field_of_studyOther: "",
                                      grade: item.grade,
                                      activities: item.activities,
                                      description: item.description,
                                      start_year: item.start_year,
                                      start_year_month: item.start_year_month,
                                      end_year: item.end_year,
                                      end_year_month: item.end_year_month,
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
                                />
                              </div>
                            );
                          })}
                      </div>{" "}
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <div>
                        <Stack spacing={8}>
                          <div className="text-blue-950 text-opacity-50 text-xs font-medium mb-2">
                            Experience
                          </div>

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
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <div>
                        <Stack spacing={8}>
                          <div className="text-blue-950 text-opacity-50 text-xs font-medium mb-2">
                            Project
                          </div>

                          <div className="text-gray-600 text-xs font-normal">
                            <div>
                              <Stack spacing={8}>
                                {form.getInputProps("project")?.value?.length >
                                  0 &&
                                  form
                                    .getInputProps("project")
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
                                            <h6>
                                              {" "}
                                              project: {item.projectTitle}{" "}
                                            </h6>
                                            <h6> role: {item.role} </h6>
                                            <h6
                                              style={{
                                                fontWeight: "400",
                                              }}
                                            >
                                              {" "}
                                              client: {item.client} ,{" "}
                                              {/* <span> {item.employment_type} </span>{" "} */}
                                            </h6>

                                            {/* <h6
                                              style={{
                                                marginBottom: "0.5rem",
                                              }}
                                            >
                                              {" "}
                                              <span>
                                                {" "}
                                                {item.workFromMonth} -{" "}
                                              </span>{" "}
                                              <span> {item.workFromYear} </span>{" "}
                                              ,
                                            </h6>

                                            <h6>
                                              {" "}
                                              <span>
                                                {" "}
                                                status: {
                                                  item.projectStatus
                                                }{" "}
                                              </span>{" "}
                                            </h6>
                                            <h6>
                                              {" "}
                                              <span>
                                                {" "}
                                                location: {
                                                  item.projectLocation
                                                }{" "}
                                              </span>{" "}
                                            </h6>
                                            <h6>
                                              {" "}
                                              <span>
                                                {" "}
                                                projectSite: {
                                                  item.projectSite
                                                }{" "}
                                              </span>{" "}
                                            </h6>
                                            <h6>
                                              {" "}
                                              <span>
                                                {" "}
                                                natureOfEmployment:{" "}
                                                {item.natureOfEmployment}{" "}
                                              </span>{" "}
                                            </h6>

                                            <h6>
                                              {" "}
                                              <span>
                                                {" "}
                                                teamSize: {item.teamSize}{" "}
                                              </span>{" "}
                                            </h6>
                                            <h6>
                                              {" "}
                                              <span>
                                                {" "}
                                                skillUsed: {item.skillUsed}{" "}
                                              </span>{" "}
                                            </h6> */}

                                            {/* <h6>  activity: {item.activities} </h6> */}
                                            {/* <h6>
                                              {" "}
                                              role description:{" "}
                                              {item.roleDescription}{" "}
                                            </h6> */}
                                          </div>

                                          <Image
                                            onClick={() => {
                                              setProject({
                                                id: item.id,
                                                projectTitle: item.projectTitle,
                                                client: item.client,
                                                projectStatus:
                                                  item.projectStatus,
                                                workFromYear: item.workFromYear,
                                                workFromMonth:
                                                  item.workFromMonth,
                                                // detailsOfProject: "",
                                                projectLocation:
                                                  item.projectLocation,
                                                projectSite: item.projectSite,
                                                natureOfEmployment:
                                                  item.natureOfEmployment,
                                                teamSize: item.teamSize,
                                                role: item.role,
                                                roleDescription:
                                                  item.roleDescription,
                                                skillUsed: item.skillUsed,
                                              });
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModalProject"
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
                          </div>
                        </Stack>
                      </div>
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <MultiSelect
                        label="It skills"
                        placeholder="Pick value"
                        onChange={(e) => handleChange("itskills", e)}
                        value={form.getInputProps("itskills").value}
                        data={form.getInputProps("allItskills").value}
                      />
                    </Grid.Col>
                    
                    <Grid.Col span={12}>
                      <MultiSelect
                        label="Key skills"
                        placeholder="Pick value"
                        onChange={(e) => handleChange("keyskills", e)}
                        value={form.getInputProps("keyskills").value}
                        data={form.getInputProps("allKeyskills").value}
                      />
                    </Grid.Col>

                    <Grid.Col span={12}>
                      <TextInput
                        withAsterisk
                        label="Profile Summary"
                        {...form.getInputProps("profile_summary")}
                        placeholder="write"
                      />
                    </Grid.Col>

                    <Grid.Col>
                      <TextInput
                        withAsterisk
                        label="Resume Headline"
                        placeholder="education"
                        {...form.getInputProps("resume_headline")}
                      />
                    </Grid.Col>

                    <Grid.Col>
                      <Checkbox
                        label={<>open to work</>}
                        checked={
                          form.getInputProps("work").value ? true : false
                        }
                        onChange={(event) =>
                          form.setFieldValue(
                            "work",
                            event.currentTarget.checked
                          )
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
