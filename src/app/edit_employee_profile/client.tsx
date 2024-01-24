"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useSearchParams } from "next/navigation";
import useThemeContext from "@/context/context";
import { VIEW_MASTER, VIEW_USER } from "@/util/queries";
import { toast } from "react-toastify";
import { Dropzone } from "@mantine/dropzone";
import { AddResume } from "@/components/modals/AddResume";
import { AddPhotograph } from "@/components/modals/AddPhotograph";
import { BasicProfile } from "@/components/sections/BasicProfile";
import { AddProject } from "@/components/modals/AddProject";
import { COMPANIES } from "@/util/queries";
import { Breadcrumbs, Anchor } from "@mantine/core";

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
  Container,
  Paper,
  Text,
  Autocomplete,
  Radio,
  Textarea,
  createStyles,
  FileInput,
} from "@mantine/core";
import { PROFILE_USER } from "@/util/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faVideo } from "@fortawesome/free-solid-svg-icons";
import {
  updateUserExperience,
  updateUserEducation,
  updateUser,
  deleteExperience,
  deleteEducation,
  updateUserProject,
  deleteProject,
  updateEmployeeBasicDetails,
} from "@/util/mutationQueries";

import { GET_USER } from "@/util/queries";

import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconCircleCheckFilled,
  IconVideo,
  IconCircleOff,
  IconVideoOff,
  IconLineHeight,
} from "@tabler/icons-react";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { serialize } from "v8";
import ProfileUser from "@/schemas/ProfileUser";
import ExperienceDetails from "@/components/experience/page";
import { transcode } from "buffer";

import { useSession } from "next-auth/react";
import { AddHeadline } from "@/components/modals/AddHeadline";
import { AddEducation } from "@/components/modals/AddEducation";
import { AddSkills } from "@/components/modals/AddSkills";
import { AddExperience } from "@/components/modals/AddExperience";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { EditExperience } from "@/components/modals/EditExperience";
import { EditEducation } from "@/components/modals/EditEducation";
import { EditProject } from "@/components/modals/EditProject";
import { EditBasicInformation } from "@/components/modals/EditBasicInformation";
import { IT_SKILLS,KEY_SKILLS } from "@/util/queries";


const useStyles = createStyles(() => ({
  inner: {
    width: "90%",
    margin: "auto",
  },
  ml: {
    marginRight: "0.3em",
  },
  bar: {
    background: "#FCA312",
    width: "438px",
    height: "201px",
  },
  barRoot: {
    // background:"yellow",
    width: "100%",
  },
  dropZoneRoot: {
    marginTop: "20px",
    width: "100%",
    height: "201px",
    border: "none",

    outlineWidth: "2px",

    outlineStyle: "dashed !important",
    outlineColor: "#C6C6C6 !important",
    background: "#FFF !important",

    cursor: "pointer",
    "&:hover": {
      // background: "red",
      // display:"none"
    },

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  step1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  step1Content: {
    color: "rgba(0, 0, 0, 0.45)",
    textAlign: "center",
    // fontFamily: Inter;
    fontSize: "11px",
    fontWeight: 400,
    lineHeight: "16px",
    width: "70%",
    margin: "auto",
    marginBottom: "1rem",
  },
  progress: {},
  para: {
    /* H5/regular */
    marginTop: "0rem !important",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
  },
  marginTop: {
    marginTop: "1rem",
  },
  spaceBetween: {
    width: "20rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width:"80%"
  },
  dragBar: {
    display: "flex",
    flexDirection: "column",
    transform: "translateX(-40px)",
    //  justifyContent:"start"
  },
  flex: {
    display: "flex",
    width: "8rem",
    // background:"red",
    justifyContent: "space-between",
  },
  imgUpload: {
    display: "flex",
    alignItems: "center",
    height: "2rem",
  },
  upload: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "96%",
    height: "80%",
    margin: "auto",
  },
  wrapper: {
    width: "161.934px",
    height: "43.816px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 4,
    ".mantine-Input-icon": {
      marginLeft: "1rem",
    },
  },
  dragOverPara: {
    transform: "translateY(-38px)",
  },
  paraUpload: {
    color: "#000000",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 600,
  },
  icon: {
    padding: "0 1rem",
    img: {
      width: "200px",
      height: "200px",
    },
  },
  paraDrag: {
    color: "rgba(0, 0, 0, 0.85)",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "24px",
  },
  message: {
    color: "#000",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
  },
  input: {
    // background: "orange",
    ".mantine-Text-root": {
      paddingLeft: "1rem",
    },
    span: {
      paddingLeft: "1rem",
    },
  },
  rightSection: {},
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  camera: {
    width: "200px",
    height: "200px",
  },
  label: {},
  error: {},
  description: {},
  required: {},
  placeholder: {
    color: "#4D47C3 !important",
    textAlign: "center",
    // font-family: Inter;
    fontSize: "10px",

    fontWeight: 400,
    lineHeight: "10px",
  },
}));

export interface IAppProps {}

export default function View(props: IAppProps) {
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const session = useSession();

  const { classes } = useStyles();

  const { image, setImage }: any = useThemeContext();

  const [inEditPhoto, setinEditPhoto] = useState(false);

  const [inEditResume, setinEditResume] = useState(false);
  
  const [items, setItems] = useState([
    { title: "modify", href: "/edit_employees_profiles" },
    { title: "profiles", href: "/edit_employees_profiles" },
    { title: "edit_profile", href: "/edit_employees_profiles" },
  ]);

  const handleFileUploadResume = async (e) => {
    const file = e || form.getInputProps("resume")?.value;

    var allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file?.type)) {
      setFormData((prevData: any) => ({
        ...prevData,
        ["resume"]: ``,
      }));

      return toast("Invalid file type. Please upload a  PDF file.", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    // console.log("below");

    const resumeData = new FormData();
    resumeData.append("file", file);

    try {
      const response = await fetch("/api/upload2", {
        method: "POST",
        body: resumeData,
      });

      // console.log("res", response);

      if (response.ok) {
        setFormData((prevData) => ({
          ...prevData,
          ["resume"]: `files/${file.name}`,
        }));

        return toast("resume uploaded successfully", {
          className: "green-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
      alert("please upload from your pc directory");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e;

    if (!file) {
      return;
    }

    const i = e?.name;

    // console.log("e", e);

    var allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/jpg",
    ];

    if (!allowedTypes.includes(e.type)) {
      setFormData((prevData: any) => ({
        ...prevData,
        ["photograph"]: ``,
      }));

      toast("Invalid file type. Please upload a  image", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    setImage(i);

    const resumeData = new FormData();
    resumeData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: resumeData,
      });

      // console.log("res", response);

      if (response.ok) {
        setFormData((prevData: any) => ({
          ...prevData,
          ["photograph"]: `images/${file.name}`,
        }));
        toast("photograph uploaded successfully", {
          className: "green-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
      } else {
        // console.error("File upload failed.");
      }
    } catch (error) {
      // console.error("An error occurred while uploading the file:", error);

      toast("An error occurred while uploading the file:", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
  };

  const {
    setActive,
    formData,
    setFormData,
    setexperienceOpen,
    seteditopen,
  }: any = useThemeContext();

  const iconStyle = { width: rem(12), height: rem(12) };

  const router = useRouter();

  const [flag, setFlag] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [DefaultKeySkills, setDefaultKeySkills] = useState([]);

  const [DefaultItSkills, setDefaultItSkills] = useState([]);

  const checkExistingUser = async (email) => {
    // console.log("checking email", email);

    const checking = await client.request(GET_USER, {
      where: {
        email: email,
      },
    });

    // console.log("response", checking?.user?.email);
    return checking?.user?.email;
  };

  const form: any = useForm({
    initialValues: {
      profileUserId: "",
      allItskills: [],
      allKeyskills: [],
      itskills: [],
      itskillsForMutation: [],
      education: null,
      keyskills: [],
      userkeyskills: [],
      resume_headlineForMutation: "",
      resume_headline: "",
      profile_summary: "",
      profile_summaryForMutation: "",
      total_experience: "",
      relevent_experience: "",
      photograph: "",
      name: "",
      status: "",
      work: "",
      statusForMutation: null,
      workForMutation: null,
      email: "",
      userEmail: "",
      userEmailForMutation: "",
      experience: [],
      project: [],
      company: "",
      userCompany: "",
      companies: [],
      phone: "",
      userPhone: "",
      role: "",
      address: "",
      userAddress: "",
    },
  });

  const getComapanies = async () => {
    const users: any = await client.request(COMPANIES);

    // console.log("usersaa", users);

    const DefaultSkills = users?.companies?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    form.setFieldValue("companies", DefaultSkills);
  };

  useEffect(() => {
    getComapanies();
  }, []);

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
    // console.log("image-file111111", event.name);
    body.append("image-file1", event);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    // console.log('mk',response)

    if (response.ok) {
      // alert("uploaded succesfully");

      form.setFieldValue("photograph", `uploads/${event?.name}`);
    }
  };

  const searchParams: any = useSearchParams();

  const search = searchParams.get("id");

  const getData = async (search: any) => {
    // console.log("id", search);
    const user: any = await client.request(VIEW_USER, {
      where: {
        id: search,
      },
    });

    if (user?.user) {
    }

    form.setValues({
      profileUserId: user?.user?.id,
      itskills: user?.user?.itskills?.map((item: any) => item.name),
      itskillsForMutation: user?.user?.itskills?.map((item: any) => item.id),
      education: user?.user?.education,
      project: user?.user?.project,
      keyskills: user?.user?.keyskills?.map((item: any) => item.id),
      userkeyskills: user?.user?.keyskills?.map((item: any) => item.name),
      resume_headline: user?.user?.resume_headline,
      resume_headlineForMutation: user?.user?.resume_headline,
      profile_summary: user?.user?.profile_summary,
      profile_summaryForMutation: user?.user?.profile_summary,
      photograph: user?.user?.photograph,
      name: user?.user?.name,
      work: user?.user?.open_to_work,
      status: user?.user?.active,
      workForMutation: user?.user?.open_to_work.toString(),
      statusForMutation: user?.user?.active.toString(),
      resume: user?.user?.resume,
      email: user?.user?.email,
      userEmail: user?.user?.email,
      userEmailForMutation: user?.user?.email,
      role: user?.user?.role,
      company: user?.user?.company?.name,
      userCompany: user?.user?.company?.id,
      phone: user?.user?.phone,
      userPhone: user?.user?.phone,
      address: user?.user?.address,
      userAddress: user?.user?.address,
      experience: user?.user?.experience,
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
  }, [search, flag]);

  const getKeySkills = async () => {
    const users: any = await client.request(KEY_SKILLS);


    const DefaultSkills = users?.keySkills?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    setDefaultKeySkills(DefaultSkills);
  };

  const getItSkills = async () => {
    const users: any = await client.request(IT_SKILLS);


    const DefaultSkills = users?.itSkills?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    setDefaultItSkills(DefaultSkills);
  };

  useEffect(() => {
    getKeySkills();
    getItSkills();
  }, []);

  const handleChangeProject = (field: any, e: any) => {
    // console.log("hitting", field, e);

    setProject((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  const handleChangeEducation = (field: any, e: any) => {
    // console.log("hitting", field, e);

    setEducation((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  const deleteSpecificProject = async () => {
    // console.log("delete specific project", project);

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
    // console.log("delete hitting", experience);

    const user: any = await client.request(deleteExperience, {
      where: {
        id: experience.id,
      },
    });

    if (user.deleteAddExperience) {
      const button = document.getElementById("modal-close-btn-edit-experience");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const deleteSpecificEducation = async () => {
    // console.log("delete education hitting", education);

    const user: any = await client.request(deleteEducation, {
      where: {
        id: education.id,
      },
    });

    // console.log('delete-user',user)

    if (user.deleteAddEducation) {
      const button = document.getElementById("modal-close-btn-education");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const updateExperience = async () => {
    // console.log("update hitting", experience);

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
      const button = document.getElementById("modal-close-btn-edit-experience");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

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
        detailsOfProject: project.detailsOfProject,
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

  const updateExperienceEducation = async () => {
    // console.log("educationss", education);

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

  

    if (user?.updateAddEducation) {
      const button = document.getElementById("modal-close-btn-education");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const handleChange = (field: any, e: any) => {
    // console.log("hitting", e);
    setExperience((prev) => ({
      ...prev,
      [field]: e,
    }));
  };

  const updateBasicDetails = async () => {
    if (!form.getInputProps("userPhone").value) {
      return alert("please enter phone");
    }

    const mobileNumber = form.getInputProps("userPhone").value;

    const email = form.getInputProps("userEmail").value;

    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      // console.log("inside", mobileNumber);
      return alert('"The mobile number is not valid.";');
    }

    if (!form.getInputProps("userEmail").value) {
      return alert("please enter mail");
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return alert("please enter valid mail");
    }

    if (!form.getInputProps("userAddress").value) {
      return alert("please enter userAddress");
    }

    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        phone: form.getInputProps("userPhone")?.value,
        address: form.getInputProps("userAddress")?.value,
        email: form.getInputProps("userEmail")?.value,
        company: {
          connect: {
            id: form.getInputProps("userCompany")?.value,
          },
        },

        open_to_work:
          form.getInputProps("workForMutation")?.value === "true"
            ? true
            : false,
        active:
          form.getInputProps("statusForMutation")?.value === "true"
            ? true
            : false,
      },
    });

    // console.log("details updated", user);

    if (user.updateUser) {
      const button = document.getElementById("closeAddBasic");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const updateKeySkills = async () => {
    // console.log("update skills hitting", search,form);

    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        keyskills: {
          set: form.getInputProps("keyskills")?.value?.map((item: any) => {
            return {
              id: item,
            };
          }),
        },
        itskills: {
          set: form
            .getInputProps("itskillsForMutation")
            ?.value?.map((item: any) => {
              return {
                id: item,
              };
            }),
        },
        profile_summary: form.getInputProps("profile_summaryForMutation")
          ?.value,
      },
    });

    // console.log("skils updated", user);

    if (user.updateUser) {
      const button = document.getElementById("closeAddSkills");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };


  const addEducation = async () => {
    if (!education.school) {
      return toast("please add university", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!education.degree) {
      return toast("please select course", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!education.field_of_study) {
      return toast("please select field of study", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!education.start_year) {
      return toast("please add start year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.start_year_month) {
      return toast("please add start year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.end_year) {
      return toast("please add end year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.end_year_month) {
      return toast("please add end year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (education.start_year && education.end_year) {
      if (education.end_year < education.start_year) {
        return toast(
          "invalid duration, end year can not be smaller than start year",
          {
            className: "black-background",
            bodyClassName: "grow-font-size",

            progressClassName: "fancy-progress-bar",
          }
        );
      }

      if (education.end_year === education.start_year) {
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
        ].map((item, index) => ({ label: item, value: index + 1 }));

        const startMonthNumber = releventMonths.filter(
          (item) => item.label === education.start_year_month
        )[0].value;

        const endMonthNumber = releventMonths.filter(
          (item) => item.label === education.end_year_month
        )[0].value;

        // console.log("190", startMonthNumber, endMonthNumber);

        if (education.start_year_month === education.end_year_month) {
          return toast(
            "invalid duration, start date can not be equal to end date",
            {
              className: "black-background",
              bodyClassName: "grow-font-size",
              progressClassName: "fancy-progress-bar",
            }
          );
        }
        if (endMonthNumber < startMonthNumber) {
          return toast(
            "invalid duration, end date can not be small then start date",
            {
              className: "black-background",
              bodyClassName: "grow-font-size",
              progressClassName: "fancy-progress-bar",
            }
          );
        }
      }
    }

    if (!education.grade) {
      return toast("please add grade", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.activities) {
      return toast("please add activities", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!education.description) {
      return toast("please add  description", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    delete education?.id;

    const user = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        education: {
          create: [education],
        },
      },
    });

    if (user.updateUser) {
      // alert('inside')
      toast(`education added`, {
        className: "green-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

      const button = document.getElementById("closeAddEducation");


      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const addExperience = async () => {
    if (!experience.title) {
      return toast("please add title", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (experience.title.length < 5) {
      return toast("title should have 5 min characters ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!experience.employment_type) {
      return toast("please add employment type", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.company) {
      return toast("please add company", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (experience.company.length < 5) {
      return toast("company name should have 5 min characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!experience.location) {
      return toast("please add  location", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.location_type) {
      return toast("please add location type", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.start_year) {
      return toast("please add start year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.start_year_month) {
      return toast("please add start year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!experience.end_year && !experience.currently_working) {
      return toast("please add end year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.end_year_month && !experience.currently_working) {
      return toast("please add end year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (experience.start_year && experience.end_year) {
      if (experience.end_year < experience.start_year) {
        return toast(
          "invalid duration, end year can not be smaller than start year",
          {
            className: "black-background",
            bodyClassName: "grow-font-size",

            progressClassName: "fancy-progress-bar",
          }
        );
      }

      if (experience.end_year === experience.start_year) {
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
        ].map((item, index) => ({ label: item, value: index + 1 }));

        const startMonthNumber = releventMonths.filter(
          (item) => item.label === experience.start_year_month
        )[0]?.value;

        const endMonthNumber = releventMonths.filter(
          (item) => item.label === experience.end_year_month
        )[0]?.value;

        // console.log("190", startMonthNumber, endMonthNumber);

        if (experience.start_year_month === experience.end_year_month) {
          return toast(
            "invalid duration, start date can not be equal to end date",
            {
              className: "black-background",
              bodyClassName: "grow-font-size",
              progressClassName: "fancy-progress-bar",
            }
          );
        }
        if (endMonthNumber < startMonthNumber) {
          return toast(
            "invalid duration, end date can not be small then start date",
            {
              className: "black-background",
              bodyClassName: "grow-font-size",
              progressClassName: "fancy-progress-bar",
            }
          );
        }
      }
    }

    if (experience.currently_working) {
      experience.end_year = experience.start_year;
      experience.end_year_month = experience.start_year_month;
    }

    // console.log("experience", search);

    delete experience?.id;

    const user = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        experience: {
          create: [experience],
        },
      },
    });

    // console.log("user", user);

    if (user.updateUser) {
      // alert('inside')

      toast(`experience added`, {
        className: "green-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

      const button = document.getElementById("closeAddExperience");

      // console.log("check", button);

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const addProject = async () => {
    if (!project.projectTitle) {
      return toast("please add title", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (project.projectTitle.length < 5) {
      return toast("title should have 5 min characters ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.client) {
      return toast("please add project client", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (project.client.length < 3) {
      return toast("client should have minimum 3 characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }



    if (!project.workFromYear) {
      return toast("please add work from year ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.workFromMonth) {
      return toast("please add work from month ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.detailsOfProject) {
      return toast("please add project details", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.projectLocation) {
      return toast("please add project location", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.projectSite) {
      return toast("please add projectSite", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.natureOfEmployment) {
      return toast("please add nature of employement", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.teamSize) {
      return toast("please add  teamSize", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!project.role) {
      return toast("please add  project role", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!project.roleDescription) {
      return toast("please add description role", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (project.roleDescription.length < 10) {
      return toast(" role description should have atleast 10 characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.skillUsed) {
      return toast("please add skill used", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    // console.log("experience", search);

    delete project?.id;

    const user = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        project: {
          create: [project],
        },
      },
    });

    if (user.updateUser) {
      // alert('inside')

      toast(`project added`, {
        className: "green-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

      const button = document.getElementById("closeAddProject");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const addResume = async () => {
    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        resume: formData.resume,
      },
    });

    if (user.updateUser) {
      const button = document.getElementById("closeAddResume");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const addPhotoGraph = async () => {
    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        photograph: formData.photograph,
      },
    });

    if (user.updateUser) {
      const button = document.getElementById("closeAddPhotograph");

      // console.log("bu", button);

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  const addHeadline = async () => {
    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        resume_headline: form.getInputProps("resume_headlineForMutation")
          ?.value,
      },
    });

    // console.log("skils updated", user);

    if (user.updateUser) {
      const button = document.getElementById("closeAddHeadline");

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
      <AddResume
        form={form}
        inEditResume={inEditResume}
        addResume={addResume}
        handleFileUploadResume={handleFileUploadResume}
        
      />

      <AddPhotograph
        form={form}
        inEditPhoto={inEditPhoto}
        addPhotoGraph={addPhotoGraph}
        handleFileUpload={handleFileUpload}
        image={image}
      />

      <AddHeadline form={form} addHeadline={addHeadline} />

      <AddProject
        form={form}
        project={project}
        handleChangeProject={handleChangeProject}
        addProject={addProject}
      />

      <AddEducation
        education={education}
        addEducation={addEducation}
        setEducation={setEducation}
        handleChangeEducation={handleChangeEducation}
      />

      <AddSkills
        form={form}
        updateKeySkills={updateKeySkills}
        DefaultItSkills={DefaultItSkills}
        DefaultKeySkills={DefaultKeySkills}
      />

      <AddExperience
        experience={experience}
        handleChange={handleChange}
        addExperience={addExperience}
      />

      <EditExperience
        experience={experience}
        deleteSpecificExperience={deleteSpecificExperience}
        updateExperience={updateExperience}
        handleChange={handleChange}
      />

      <EditEducation
        education={education}
        handleChangeEducation={handleChangeEducation}
        updateExperienceEducation={updateExperienceEducation}
        deleteSpecificEducation={deleteSpecificEducation}
      />

      <EditProject
        project={project}
        updateThisProject={updateThisProject}
        deleteSpecificProject={deleteSpecificProject}
        handleChangeProject={handleChangeProject}
      />

      <EditBasicInformation
        form={form}
        updateBasicDetails={updateBasicDetails}
      />

      <div
        className=""
        style={{
          width: "100%",
        }}
      >
        
<Breadcrumbs className="pt-2"  separator="→" mt="xs">{items.map((item:any,index:any)=>  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
  
  )}</Breadcrumbs>

        <div className="text-black text-2xl py-3  font-semibold">Profile</div>
        <div className="flex flex-col lg:flex-row  justify-center  gap-5 xl:12">
          <div className="w-full lg:w-1/4 px-3 py-4 h-full rounded bg-white">
            <ProfileSection form={form} setinEditPhoto={setinEditPhoto}         editHide={false}
        addHide={true} />
          </div>

          <div className="w-full lg:w-3/4 px-3 h-full rounded ">
            <Stack>
              <BasicProfile form={form}         editHide={false}
        addHide={true} />
            </Stack>

            <div className="flex flex-col lg:flex-row mt-3  justify-center  gap-5 xl:12 ">
              <div className="lg:w-1/2">
                <ExperienceSection form={form} setExperience={setExperience}          editHide={false}
        addHide={true} />
              </div>

              <div className="lg:w-1/2">
                <EducationSection
                  form={form}
                  setExperience={setExperience}
                  setEducation={setEducation}
                  editHide={false}
                  addHide={true}
                />
              </div>
            </div>

            <div
              className="lg:w-full"
              style={{
                marginTop: "1rem",
              }}
            >
              <ProjectSection form={form} setProject={setProject}          editHide={false}
        addHide={true} />
            </div>
            <div className=" flex flex-col lg:flex-row justify-center  gap-5 xl:12 mt-3">
              <div className="lg:w-full">
                <ResumeSection form={form} setinEditResume={setinEditResume}         editHide={false}
        addHide={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
