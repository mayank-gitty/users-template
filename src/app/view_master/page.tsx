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

const USERS = gql`
  query Users {
    users {
      name
      company {
        name
      }
      role
      email
      phone
      address
    }
  }
`;

export interface IAppProps {}

export default function View(props: IAppProps) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  // const [true, settrue] = useState(true);

  const { setActive, formData, setFormData, setexperienceOpen, seteditopen } =
    useThemeContext();

  const [schoolOther, setSchoolOther] = useState("");
  const [degreeOther, setDegreeOther] = useState("");
  const [fieldOther, setFieldOther] = useState("");

  console.log("formdata", formData);

  const iconStyle = { width: rem(12), height: rem(12) };

  const router = useRouter();

  const [flag, setFlag] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [DefaultSkills, setDefaultSkills] = useState([]);

  //   const { data: session }: any = useSession();

  const checkExistingUser = async (email) => {
    console.log("checking email", email);

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
      education: null,
      keyskills: [],
      userkeyskills: [],
      resume_headline: "",
      profile_summary: "",
      total_experience: "",
      relevent_experience: "",
      photograph: "",
      name: "",
      status: "",
      work: "",
      statusForMutation: "",
      workForMutation: "",
      status: "",
      work: "",
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

  console.log("formssssssssssssssssss", form);

  const COMPANIES = gql`
    query Query {
      companies {
        name
        id
      }
    }
  `;

  const indianEducationArray = [
    // Schools

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

  const getComapanies = async () => {
    const users: any = await client.request(COMPANIES);

    console.log("usersaa", users);

    const DefaultSkills = users?.companies?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    // setDefaultSkills(DefaultSkills);

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
    const user: any = await client.request(VIEW_USER, {
      where: {
        id: search,
      },
    });

    console.log("user profile gotttttttttttttttttttttttttttttttttt", user);

    if (user?.user) {
      // alert('insi')
      // settrue(false);
    }

    form.setValues({
      profileUserId: user?.user?.id,
      itskills: user?.user?.itskills?.map((item: any) => item.name),
      education: user?.user?.education,
      project: user?.user?.project,
      keyskills: user?.user?.keyskills?.map((item: any) => item.id),
      userkeyskills: user?.user?.keyskills?.map((item: any) => item.name),
      resume_headline: user?.user?.resume_headline,
      profile_summary: user?.user?.profile_summary,
      photograph: user?.user?.photograph,
      name: user?.user?.user?.name,
      work: user?.user?.open_to_work,
      status: user?.user?.active,
      workForMutation: user?.user?.open_to_work,
      statusForMutation: user?.user?.active,
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

  // console.log('fv',form.getInputProps('keyskills')?.value)

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

  const getSkills = async () => {
    const users: any = await client.request(KEY_SKILLS);

    console.log("usersaa", users);

    const DefaultSkills = users?.keySkills?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    setDefaultSkills(DefaultSkills);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const handleChangeProject = (field: any, e: any) => {
    console.log("hitting", field, e);

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
      const button = document.getElementById("modal-close-btn-edit-experience");

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
      const button = document.getElementById("modal-close-btn-education");

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

  const handleChange = (field: any, e: any) => {
    console.log("hitting", e);
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
      console.log("inside", mobileNumber);
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

    // const users: any = await client.request(USERS);

    // console.log("users", users);

    // const check = await checkExistingUser(email);

    // console.log("email", check);

    // if (check) {
    //   return toast(`${check} already registered`, {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }

    // const flag = users.users.filter((phone) => phone.phone === mobileNumber);

    // if (flag.length > 0) {
    //   console.log("flag", flag);

    //   return toast(` ${flag[0]?.phone} phone already registered`, {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }

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
      },
    });

    console.log("details updated", user);

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
    console.log("update skills hitting", search);

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
      },
    });

    console.log("skils updated", user);

    if (user.updateUser) {
      const button = document.getElementById("closeAddSkills");

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }
  };

  console.log("valuessss", form.getInputProps(`userCompany`)?.value);

  console.log(
    "statusForMutation",
    form.getInputProps(`statusForMutaion`)?.value
  );

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

        console.log("190", startMonthNumber, endMonthNumber);

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
      toast(`experience added`, {
        className: "green-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

      const button = document.getElementById("closeAddEducation");

      console.log("check", button);

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

        console.log("190", startMonthNumber, endMonthNumber);

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

    console.log("experience", search);

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

    console.log("user", user);

    if (user.updateUser) {
      // alert('inside')

      toast(`experience added`, {
        className: "green-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

      const button = document.getElementById("closeAddExperience");

      console.log("check", button);

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

    console.log("g", project);

    console.log("experience", search);

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

      console.log("check", button);

      setTimeout(() => {
        button?.click();
        setFlag(!flag);
        router.refresh();
      }, 1000);
    }

    // setProject({
    //   id: "id" + new Date().getTime(),
    //   projectTitle: "",
    //   client: "",
    //   projectStatus: "inprogress",
    //   workFromYear: "",
    //   workFromMonth: "",
    //   // detailsOfProject: "",
    //   projectLocation: "",
    //   projectSite: "Offsite",
    //   natureOfEmployment: "fulltime",
    //   teamSize: "",
    //   role: "",
    //   roleDescription: "",
    //   skillUsed: "",
    // });
  };
  return (
    <Box
      mx="auto"
      className="view-profile-page bg-[#F3F7FB] h-screen px-[2%] pr-[60px]"
    >
      <div
        class="modal fade"
        id="addProject"
        tabindex="-1"
        aria-labelledby="addProject"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <img className="experience-icon" src="images/education.svg" />

                  <h6> Add Project </h6>
                </div>

                <div>
                  <img
                    id="closeAddProject"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>
              <div class="modal-body">
                <Paper p="md">
                  <form>
                    <Grid>
                      {/* <h6 className="box-heading">Add Project</h6> */}
                      <Grid.Col span={12}>
                        <Input
                          placeholder="Project title"
                          required
                          value={project.projectTitle}
                          styles={(theme) => ({
                            input: {
                              height: "100%",
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
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
                          onChange={(e) =>
                            handleChangeProject("projectTitle", e.target.value)
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input
                          placeholder="Client"
                          required
                          value={project.client}
                          styles={(theme) => ({
                            input: {
                              height: "100%",
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
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
                          onChange={(e) =>
                            handleChangeProject("client", e.target.value)
                          }
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project status"
                          // error={formErrors.projectStatus}
                          styles={() => ({
                            label: {
                              color: "#000",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "normal",
                            },
                          })}
                        >
                          <div>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="projectStatus"
                                value="inprogress"
                                label="In Progress"
                                required
                                checked={project.projectStatus === "inprogress"}
                                onChange={() =>
                                  handleChangeProject(
                                    "projectStatus",
                                    "inprogress"
                                  )
                                }
                              />
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="projectStatus"
                                value="finished"
                                label="Finished"
                                required
                                checked={project.projectStatus === "finished"}
                                onChange={() =>
                                  handleChangeProject(
                                    "projectStatus",
                                    "finished"
                                  )
                                }
                              />
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
                              label="Work from year"
                              error={formErrors.workFromYear}
                              styles={() => ({
                                input: {
                                  "::placeholder": {
                                    color: "#9D9D9D",
                                    fontSize: "16px",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    lineHeight: "normal",
                                  },
                                },
                                label: {
                                  color: "#000",
                                  fontFamily: "Inter",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "normal",
                                },
                              })}
                            >
                              <Select
                                placeholder="Year"
                                data={["2022", "2023", "2024"]} // Your list of years
                                value={formData.workFromYear}
                                onChange={(value) =>
                                  handleChangeProject("workFromYear", value)
                                }
                                styles={(theme) => ({
                                  input: {
                                    height: "100%",
                                    "::placeholder": {
                                      color: "#9D9D9D",
                                      fontSize: "16px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "normal",
                                    },
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
                          </div>
                          <div style={{ flex: 1 }}>
                            <Input.Wrapper
                              label="Work from month"
                              error={formErrors.workFromMonth}
                              styles={() => ({
                                label: {
                                  color: "#000",
                                  fontFamily: "Inter",
                                  fontSize: "16px",
                                  fontStyle: "normal",
                                  fontWeight: 600,
                                  lineHeight: "normal",
                                },
                              })}
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
                                value={formData.workFromMonth}
                                onChange={(value) =>
                                  handleChangeProject("workFromMonth", value)
                                }
                                styles={(theme) => ({
                                  input: {
                                    height: "100%",
                                    "::placeholder": {
                                      color: "#9D9D9D",
                                      fontSize: "16px",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      lineHeight: "normal",
                                    },
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
                          </div>
                        </div>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        {/* <Input.Wrapper
                    label="Details of project"
                    error={formErrors.detailsOfProject}
                    styles={() => ({
                      label: {
                        color: "#01041b",
                        fontSize: "1.2em",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: 10,
                      },
                    })}
                  > */}
                        <Textarea
                          placeholder="Details of project"
                          required
                          styles={(theme) => ({
                            input: {
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
                            },
                          })}
                          value={project.detailsOfProject}
                          onChange={(e) =>
                            handleChangeProject(
                              "detailsOfProject",
                              e.target.value
                            )
                          }
                        />
                        {/* </Input.Wrapper> */}
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input
                          placeholder="Project location"
                          required
                          value={project.projectLocation}
                          styles={(theme) => ({
                            input: {
                              height: "100%",
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
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
                          onChange={(e) =>
                            handleChangeProject(
                              "projectLocation",
                              e.target.value
                            )
                          }
                        />
                        {/* </Input.Wrapper> */}
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project site"
                          error={formErrors.projectSite}
                          styles={() => ({
                            input: {
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
                            },
                            label: {
                              color: "#000",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "normal",
                            },
                          })}
                        >
                          <div>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="projectSite"
                                value="Offsite"
                                label="Offsite"
                                required
                                checked={project.projectSite === "offsite"}
                                onChange={() =>
                                  handleChangeProject("projectSite", "offsite")
                                }
                              />
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="projectSite"
                                value="finished"
                                label="Onsite"
                                required
                                checked={project.projectSite === "onsite"}
                                onChange={() =>
                                  handleChangeProject("projectSite", "onsite")
                                }
                              />
                            </label>
                          </div>
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Nature of employment"
                          error={formErrors.natureOfEmployment}
                          styles={() => ({
                            label: {
                              color: "#000",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "normal",
                            },
                          })}
                        >
                          <div>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="natureOfEmployment"
                                value="fulltime"
                                label="Full Time"
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
                            </label>

                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="natureOfEmployment"
                                value="parttime"
                                label="Part Time"
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
                            </label>

                            <label>
                              <Radio
                                type="radio"
                                name="natureOfEmployment"
                                value="contractual"
                                label="Contractual"
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
                            </label>
                          </div>
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        {/* <Input.Wrapper label="Team size" error={formErrors.teamSize}> */}
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
                          styles={(theme) => ({
                            input: {
                              height: "100%",
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
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
                          onChange={(value) =>
                            handleChangeProject("teamSize", value)
                          }
                        />
                        {/* </Input.Wrapper> */}
                      </Grid.Col>
                      <Grid.Col span={12}>
                        {/* <Input.Wrapper label="Role" error={formErrors.role}> */}
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
                          styles={(theme) => ({
                            input: {
                              height: "100%",
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
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
                          onChange={(value) =>
                            handleChangeProject("role", value)
                          }
                        />
                        {/* </Input.Wrapper> */}
                      </Grid.Col>

                      <Grid.Col span={12}>
                        {/* <Input.Wrapper
                    label="Role description"
                    error={formErrors.roleDescription}
                    styles={() => ({
                      label: {
                        color: "#01041b",
                        fontSize: "1.2em",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: 10,
                      },
                    })}
                  > */}
                        <Textarea
                          placeholder="Role description"
                          required
                          styles={() => ({
                            input: {
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
                            },
                            label: {
                              color: "#000",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "normal",
                            },
                          })}
                          value={project.roleDescription}
                          onChange={(e) =>
                            handleChangeProject(
                              "roleDescription",
                              e.target.value
                            )
                          }
                        />
                        {/* </Input.Wrapper> */}
                      </Grid.Col>

                      <Grid.Col span={12}>
                        {/* <Input.Wrapper
                    label="Skills used"
                    error={formErrors.roleDescription}
                    styles={() => ({
                      label: {
                        color: "#01041b",
                        fontSize: "1.2em",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: 10,
                      },
                    })} 
                  > */}
                        <Textarea
                          placeholder="Skills used"
                          required
                          styles={() => ({
                            input: {
                              "::placeholder": {
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal",
                              },
                            },
                            label: {
                              color: "#000",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "normal",
                            },
                          })}
                          value={project.skillUsed}
                          onChange={(e) =>
                            handleChangeProject("skillUsed", e.target.value)
                          }
                        />
                        {/* </Input.Wrapper> */}
                      </Grid.Col>
                    </Grid>
                  </form>
                </Paper>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="save-btn-modal-footer"
                  style={{
                    width: "100%",
                  }}
                  onClick={() => addProject()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        class="modal fade"
        id="addEducation"
        tabindex="-1"
        aria-labelledby="addExperience"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <img className="experience-icon" src="images/education.svg" />

                  <h6> Add Education </h6>
                </div>

                <div>
                  <img
                    id="closeAddEducation"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>
              <div class="modal-body">
                <Paper p="md">
                  <form>
                    <Grid>
                      <>
                        {/* <Grid.Col span={12}>
                        <Input.Wrapper
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        ></Input.Wrapper>
                      </Grid.Col> */}

                        <Grid.Col span={12}>
                          {/*                         
                        <Input.Wrapper
                          label="School,University,Institute"
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        > */}
                          <Autocomplete
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
                            value={education.school}
                            onChange={(value) =>
                              handleChangeEducation("school", value)
                            }
                            data={indianEducationArray}
                            placeholder="University Institute"
                          />

                          {/* </Input.Wrapper> */}

                          {/* <p> {education.school} </p> */}
                        </Grid.Col>

                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
                          label="Course"
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        > */}
                          <Autocomplete
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
                            value={education.degree}
                            onChange={(value) =>
                              handleChangeEducation("degree", value)
                            }
                            data={allDegreesArray}
                            placeholder="Course"
                          />
                          {/* </Input.Wrapper> */}
                        </Grid.Col>

                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
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
                        > */}
                          <Autocomplete
                            value={education.field_of_study}
                            onChange={(value: any) =>
                              handleChangeEducation("field_of_study", value)
                            }
                            data={fields}
                            placeholder="Field of study"
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

                            // styles={customStyles}
                          />

                          {/* </Input.Wrapper> */}
                        </Grid.Col>

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
                            onChange={(e) =>
                              handleChangeEducation("end_year_month", e)
                            }
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
                          {/* <Input.Wrapper
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
                        > */}
                          <Input
                            placeholder="Grade"
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
                          {/* </Input.Wrapper> */}
                        </Grid.Col>
                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
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
                        > */}
                          <Input
                            placeholder="Activities"
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
                          {/* </Input.Wrapper> */}
                        </Grid.Col>

                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
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
                        > */}
                          <Input
                            placeholder="Description"
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
                          {/* </Input.Wrapper> */}
                        </Grid.Col>
                      </>
                    </Grid>
                    <div
                      className="d-flex justify-content-end"
                      style={{
                        width: "100%",
                        marginTop: "1rem",
                        // background:"red"
                      }}
                    ></div>
                  </form>
                </Paper>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="save-btn-modal-footer"
                  style={{
                    width: "100%",
                  }}
                  onClick={() => addEducation()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        class="modal fade"
        id="addExperience"
        tabindex="-1"
        aria-labelledby="addExperience"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <img className="experience-icon" src="images/education.svg" />

                  <h6> Add Experience </h6>
                </div>

                <div>
                  <img
                    id="closeAddExperience"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>
              <div class="modal-body">
                <Paper p="md">
                  {
                    <form>
                      <Grid>
                        <Grid.Col span={12}>
                          {/* <label htmlFor=" "> Title </label> */}
                          <TextInput
                            minLength={5}
                            maxLength={30}
                            id="experience-title"
                            // error={'jjj'}

                            placeholder="Title"
                            size="md"
                            value={experience.title}
                            onChange={(e) =>
                              handleChange("title", e.target.value)
                            }
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
                          {/* <label htmlFor=" "> Employment type </label> */}

                          <Select
                            // value={experience.experience}
                            value={experience.employment_type}
                            onChange={(value) =>
                              handleChange("employment_type", value)
                            }
                            data={type}
                            placeholder="Employment Type"
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
                          {/* <label htmlFor=" "> Company name </label> */}
                          <TextInput
                            placeholder="Company Name"
                            size="md"
                            minLength={5}
                            maxLength={30}
                            value={experience.company}
                            onChange={(e) =>
                              handleChange("company", e.target.value)
                            }
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
                          {/* <label htmlFor=" "> location </label> */}
                          <TextInput
                            placeholder="Location"
                            size="md"
                            value={experience.location}
                            onChange={(e) =>
                              handleChange("location", e.target.value)
                            }
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
                          {/* <label htmlFor=" "> Location type </label> */}
                          <Select
                            value={experience.location_type}
                            onChange={(value) =>
                              handleChange("location_type", value)
                            }
                            data={locationType}
                            placeholder="Location Type"
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
                            // style={{
                            //   justifyContent:"flex-start !important"
                            // }}
                            checked={
                              experience.currently_working ? true : false
                            }
                            label="I am currently working in this role"
                            onChange={(e: any) =>
                              handleChange(
                                "currently_working",
                                e.target.checked
                              )
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
                            onChange={(e) =>
                              handleChange("start_year_month", e)
                            }
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

                        {!experience.currently_working && (
                          <Grid.Col span={12}>
                            <h6 className="experience-label">End Date</h6>
                          </Grid.Col>
                        )}

                        {!experience.currently_working && (
                          <>
                            <Grid.Col span={6}>
                              <Select
                                placeholder="Month"
                                nothingFound="No options"
                                maxDropdownHeight={280}
                                onChange={(e) =>
                                  handleChange("end_year_month", e)
                                }
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
                    </form>
                  }
                </Paper>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="save-btn-modal-footer"
                  style={{
                    width: "100%",
                  }}
                  onClick={() => addExperience()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        class="modal fade"
        id="exampleModalBasic"
        tabindex="-1"
        aria-labelledby="exampleModalSkills"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <img className="experience-icon" src="images/education.svg" />

                  <h6> Basic Information </h6>
                </div>

                <div>
                  <img
                    id="closeAddBasic"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>

              <div class="modal-body basic">
                <Paper
                  p="md"
                  // style={{
                  //   width: "30rem",
                  // }}
                >
                  <form>
                    <Grid>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Phone"
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
                            placeholder="Phone"
                            required
                            {...form.getInputProps("userPhone")}
                            onChange={(e) =>
                              form.setFieldValue("userPhone", e.target.value)
                            }
                            value={form.getInputProps("userPhone").value}
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
                          label="Email"
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
                            placeholder="Email"
                            required
                            onChange={(e) =>
                              form.setFieldValue("userEmail", e.target.value)
                            }
                            value={form.getInputProps("userEmail").value}
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
                          label="Address"
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
                            placeholder="Address"
                            required
                            onChange={(e) =>
                              form.setFieldValue("userAddress", e.target.value)
                            }
                            value={form.getInputProps("userAddress").value}
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
                          label="Company"
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
                            // label="Please select company"
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
                            onChange={(e) => {
                              console.log("", e);
                              form.setFieldValue("userCompany", e);
                            }}
                            placeholder="Please select company"
                            value={form.getInputProps(`userCompany`)?.value}
                            data={form.getInputProps("companies").value}
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      {/* <Grid.Col>
                        <Radio.Group
                           name="favoriteFramework"
                           label="Status"
                           value={form.getInputProps(`statusForMutation`)?.value}
                           onChange={(e:any)=> 

                            {

                                                         
                            form.setFieldValue(`statusForMutation`,e) 

                            console.log('mmmm',e)

                            }
 
                          
                          }
                          // description="This is anonymous"
                          withAsterisk
                        >
                          <Group mt="xs">
                            <Radio  value={'true'} label="Active" />
                            <Radio  value={'false'} label="Not Active" />
                          </Group>
                        </Radio.Group>
                      </Grid.Col>

                      <Grid.Col>
                        <Radio.Group
                          name="favoriteFramework"
                          label="Work Status"
                          // description="This is anonymous"
                          withAsterisk
                        >
                          <Group mt="xs">
                            <Radio label="Open to work" />
                            <Radio label="Engaged" />
                          </Group>
                        </Radio.Group>
                      </Grid.Col> */}

                      {/* <Grid.Col span={12}>
                        <Radio
                          label="active"
                          // checked={
                          //   form.getInputProps(`statusForMutation`)?.value
                          // }
                          onChange={(event) => {
                            console.log("sss", event.currentTarget.checked);
                            // form.setFieldValue(`statusForMutation`,event.currentTarget.checked)
                          }}
                        />
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Radio
                          label="open to work"
                          checked={form.getInputProps(`workForMutation`)?.value}
                          onChange={(event) =>
                            form.setFieldValue(
                              `workForMutation`,
                              event.currentTarget.checked
                            )
                          }
                        />
                      </Grid.Col> */}
                    </Grid>

                    <button
                      type="button"
                      class="save-btn-modal-footer mt-4"
                      style={{
                        width: "100%",
                      }}
                      onClick={() => updateBasicDetails()}
                    >
                      Save
                    </button>
                  </form>
                </Paper>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        class="modal fade"
        id="exampleModalSkills"
        tabindex="-1"
        aria-labelledby="exampleModalSkills"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div className="custom-align">
                <img className="experience-icon" src="images/education.svg" />

                <h6> Skills </h6>
              </div>

              <div>
                <img
                  id="closeAddSkills"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>
            </div>

            <div
              class="modal-body skills"
              style={{
                height: "300px !important",
              }}
            >
              <Paper
                p="md"
                // style={{
                //   width: "30rem",
                // }}
              >
                <form>
                  <Grid>
                    <Grid.Col span={12}>
                      <MultiSelect
                        styles={(theme) => ({
                          input: {
                            // height: "50px",
                            padding: "6px 8px",
                          },
                          values: {
                            height: "100%",
                            bg: "red",
                          },

                          wrapper: {
                            height: "auto",
                            ".mantine-MultiSelect-value": {
                              background: "#FFFFFF",
                              boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.18)",
                              border: "1px solid #DCDCDC",
                              borderLeft: "5px solid #478FC3",
                              color: "#000",
                              // font-family: Inter;
                              fontSize: "12px",

                              fontWeight: 500,

                              padding: "14px 0px",
                              "::before": {
                                content: '""',
                              },
                            },
                            ".mantine-MultiSelect-defaultValueLabel": {
                              paddingLeft: "6px",
                            },
                            ".mantine-CloseButton-root": {
                              // margin:"0 10px",
                              marginRight: "4px",
                              marginLeft: "18px",
                              background: "#2E3A59",
                              borderRadius: "50%",
                              height: "14px",
                              minHeight: "18px",
                              minWidth: "18px",

                              svg: {
                                color: "#fff",
                                height: "12px !important",
                                width: "10px !important",
                              },
                            },
                          },
                          pill: {
                            color: "red",
                            background: "red",
                          },

                          leftIcon: {
                            marginRight: theme.spacing.md,
                          },
                        })}
                        // label="select skill"
                        placeholder="Select your skills"
                        searchable
                        maxSelectedValues={5}
                        onChange={(e) => form.setFieldValue("keyskills", e)}
                        value={form.getInputProps("keyskills")?.value}
                        data={DefaultSkills}
                      />
                    </Grid.Col>
                  </Grid>

                  <small
                    style={{
                      color: "grey",
                    }}
                  >
                    {" "}
                    maximum 5 allowed{" "}
                  </small>
                </form>

                <button
                  style={{
                    width: "100%",
                  }}
                  type="button"
                  class="save-btn-modal-footer mt-4"
                  onClick={() => updateKeySkills()}
                >
                  Save
                </button>
              </Paper>
            </div>

            <div class="modal-footer">
              {/* <button
                type="button"
                id="modal-close-btn"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                id="modal-close-btn-experience"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => updateKeySkills()}
              >
                Save 
              </button> */}
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
            <div class="modal-header ">
              <div className="custom-align">
                <div className="">
                  <img
                    className="experience-icon"
                    src="images/experience.svg"
                  />
                </div>

                <h6> Experience </h6>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div>
                <img
                  id="modal-close-btn-edit-experience"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>

              {/* <button
                type="button"
                id="modal-close-btn-experience"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
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
                  <label htmlFor=" "> Employment type </label>

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
                  <label htmlFor=" "> Company </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> Location </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> Location type </label>
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
                    className="center-align"
                    checked={experience.currently_working ? true : false}
                    label="currently working here"
                    onChange={(e: any) =>
                      handleChange("currently_working", e.target.checked)
                    }
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <h6 className="experience-label">Start date</h6>
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

                {!experience.currently_working && (
                  <Grid.Col span={12}>
                    <h6 className="experience-label">End date</h6>
                  </Grid.Col>
                )}

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
                className="close-btn-modal-footer"
                onClick={() => deleteSpecificExperience()}
              >
                {" "}
                delete{" "}
              </button>
              {/* <button
                type="button"
                id="modal-close-btn-experience"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              <button
                type="button"
                class="save-btn-modal-footer"
                onClick={() => updateExperience()}
              >
                Save
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
            <div class="modal-header ">
              <div className="custom-align">
                <div className="">
                  <img className="experience-icon" src="images/education.svg" />
                </div>

                <h6> Education </h6>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div>
                <img
                  id="modal-close-btn-education"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>

              {/* <button
                type="button"
                id="modal-close-btn-experience"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
            </div>

            <div class="modal-body">
              <Grid>
                <Grid.Col span={12}>
                  <Container size="xs" px="xs">
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
                            <Autocomplete
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
                              value={education.school}
                              onChange={(value) =>
                                handleChangeEducation("school", value)
                              }
                              data={indianEducationArray}
                              placeholder="University Institute"
                            />

                            {/* {errors.university && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.university}
                    </p>
                  )} */}
                          </Input.Wrapper>
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
                            <Autocomplete
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
                              value={education.degree}
                              onChange={(value) =>
                                handleChangeEducation("degree", value)
                              }
                              data={allDegreesArray}
                              placeholder="Course"
                            />

                            {/* {errors.course && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.course}
                    </p>
                  )} */}
                          </Input.Wrapper>
                        </Grid.Col>

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
                            <Autocomplete
                              value={education.field_of_study}
                              onChange={(value: any) =>
                                handleChangeEducation("field_of_study", value)
                              }
                              data={fields}
                              placeholder="Field of study"
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
                className="close-btn-modal-footer"
                onClick={() => deleteSpecificEducation()}
              >
                {" "}
                delete{" "}
              </button>

              <button
                type="button"
                class="save-btn-modal-footer"
                onClick={() => updateExperienceEducation()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModalProject"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header ">
              <div className="custom-align">
                <div className="">
                  <img className="experience-icon" src="images/education.svg" />
                </div>

                <h6> Project </h6>
              </div>

              <button
                type="button"
                class="modal-close-btn-project"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div>
                <img
                  id="modal-close-btn-project"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>
            </div>

            <div class="modal-body">
              <Container size="xs" px="xs">
                <Paper
                // shadow="xl"
                // p="md"
                // style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                  <form>
                    <Grid>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project title"
                          error={formErrors?.projectTitle}
                        >
                          <Input
                            placeholder="Project Title"
                            required
                            value={project.projectTitle}
                            styles={{
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            }}
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
                        >
                          <Input
                            placeholder="Client"
                            required
                            value={project.client}
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
                            onChange={(e) =>
                              handleChangeProject("client", e.target.value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project status"
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
                              <Radio
                                type="radio"
                                name="projectStatus"
                                value="inprogress"
                                label="In Progress"
                                required
                                checked={project.projectStatus === "inprogress"}
                                onChange={() =>
                                  handleChangeProject(
                                    "projectStatus",
                                    "inprogress"
                                  )
                                }
                              />
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="projectStatus"
                                value="finished"
                                label="Finished"
                                required
                                checked={project.projectStatus === "finished"}
                                onChange={() =>
                                  handleChangeProject(
                                    "projectStatus",
                                    "finished"
                                  )
                                }
                              />
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
                              label="Work from year"
                              error={formErrors?.workFromYear}
                            >
                              <Select
                                placeholder="Year"
                                data={["2022", "2023", "2024"]} // Your list of years
                                value={project.workFromYear}
                                styles={() => ({
                                  input: {
                                    width: "100%", // Adjust the width as needed
                                    padding: "10px", // Add padding for a consistent look
                                    borderRadius: "4px", // Add rounded corners
                                    border: "1px solid #ccc", // Add a border
                                    height: "50px",
                                    "::placeholder": {
                                      color: "#CACACA",
                                      // font-family: Inter;
                                      fontSize: "16px",
                                      fontWeight: 500,
                                    },
                                  },
                                })}
                                onChange={(value) =>
                                  handleChangeProject("workFromYear", value)
                                }
                              />
                            </Input.Wrapper>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Input.Wrapper
                              label="Work from month"
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
                                styles={() => ({
                                  input: {
                                    width: "100%", // Adjust the width as needed
                                    padding: "10px", // Add padding for a consistent look
                                    borderRadius: "4px", // Add rounded corners
                                    border: "1px solid #ccc", // Add a border
                                    height: "50px",
                                    "::placeholder": {
                                      color: "#CACACA",
                                      // font-family: Inter;
                                      fontSize: "16px",
                                      fontWeight: 500,
                                    },
                                  },
                                })}
                              />
                            </Input.Wrapper>
                          </div>
                        </div>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Details of project"
                          error={formErrors?.detailsOfProject}
                          // styles={() => ({
                          //   label: {
                          //     color: "#01041b",
                          //     fontSize: "1.2em",
                          //     fontWeight: 500,
                          //     lineHeight: 1.2,
                          //     marginBottom: 10,
                          //   },
                          // })}
                        >
                          <Textarea
                            placeholder="Type here..."
                            required
                            style={{
                              width: "100%", // Adjust the width as needed
                              // padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              // border: "1px solid #ccc", // Add a border
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
                        >
                          <Input
                            placeholder="Type here.."
                            required
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
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
                          label="Project site"
                          error={formErrors?.projectSite}
                          styles={() => ({
                            input: {
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                              height: "50px",
                              "::placeholder": {
                                color: "#CACACA",
                                // font-family: Inter;
                                fontSize: "16px",
                                fontWeight: 500,
                              },
                            },
                          })}
                        >
                          <div>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="projectSite"
                                value="Offsite"
                                label="Offsite"
                                required
                                checked={project.projectSite === "offsite"}
                                onChange={() =>
                                  handleChangeProject("projectSite", "offsite")
                                }
                              />
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="projectSite"
                                value="finished"
                                label="Offsite"
                                required
                                checked={project.projectStatus === "onsite"}
                                onChange={() =>
                                  handleChangeProject("projectSite", "onsite")
                                }
                              />
                            </label>
                          </div>
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Nature of employment"
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
                              <Radio
                                type="radio"
                                name="natureOfEmployment"
                                value="fulltime"
                                label="Full Time"
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
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <Radio
                                type="radio"
                                name="natureOfEmployment"
                                value="parttime"
                                label="Part Time"
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
                            </label>
                            <label>
                              <Radio
                                type="radio"
                                name="natureOfEmployment"
                                value="contractual"
                                label="Contractual"
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
                            </label>
                          </div>
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Team size"
                          error={formErrors?.teamSize}
                        >
                          <Select
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
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
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
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
                          <Textarea
                            placeholder="Role description"
                            required
                            styles={{
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                              height: "125.324px",
                              "::placeholder": {
                                color: "#CACACA",
                                // font-family: Inter;
                                fontSize: "16px",
                                fontWeight: 500,
                              },
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
                        <Input.Wrapper label="Skills">
                          <Textarea
                            placeholder="Skills"
                            required
                            styles={() => ({
                              label: {
                                color: "#01041b",
                                fontSize: "1.2em",
                                fontWeight: 500,
                                lineHeight: 1.2,
                                marginBottom: 10,
                              },
                              "::placeholder": {
                                color: "#CACACA",
                                // font-family: Inter;
                                fontSize: "16px",
                                fontWeight: 500,
                              },
                            })}
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
                className="close-btn-modal-footer"
                onClick={() => deleteSpecificProject()}
              >
                {" "}
                delete{" "}
              </button>

              <button
                type="button"
                class="save-btn-modal-footer"
                onClick={() => updateThisProject()}
              >
                Save
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
                  {form.getInputProps("name")?.value}
                </div>
                <div className="text-[#ABABAB] text-base font-medium flex items-center justify-center">
                  {form.getInputProps("resume_headline").value}
                </div>
                <div className="text-[#797878] text-xs font-medium flex items-center justify-center profile-summary-box">
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
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // background:"blue",
                    // width:"100%"
                  }}
                >
                  <div className="d-flex">
                    <Image
                      src="./images/Icon-Skill.svg"
                      alt="Google"
                      style={{ width: "28px", height: "28px" }}
                    />
                    <div className="text-black text-base font-semibold ml-1">
                      Skills
                    </div>
                  </div>

                  <div className="">
                    <Image
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalSkills"
                      src="./images/Edit.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </div>
                </div>

                <Group></Group>
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
                {form
                  .getInputProps("userkeyskills")
                  ?.value?.map((item: any) => {
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
                  <Image
                    onClick={() => {
                      // setExperience({
                      //   title: item.title,
                      //   employment_type: item.employment_type,
                      //   company: item.company,
                      //   location: item.location,
                      //   location_type: item.location_type,
                      //   start_year: item.start_year,
                      //   start_year_month: item.start_year_month,
                      //   end_year: item.end_year,
                      //   end_year_month: item.end_year_month,
                      //   currently_working: item.currently_working,
                      //   id: item.id,
                      // });
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalBasic"
                    // data-toggle="modal"
                    // data-target="#exampleModalLong"
                    src="./images/Edit.svg"
                    alt="Google"
                    style={{
                      width: "24px",
                      height: "32px",
                      // marginLeft: "10rem",
                    }}
                  />
                </Group>
                <Group position="apart" py={12}>
                  <div>
                    <Stack>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Phone:
                      </div>
                    </Stack>
                    <Stack>
                      <div className="text-black text-base font-semibold">
                        {form.getInputProps("phone").value}
                      </div>
                    </Stack>
                  </div>
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
                        Address:
                      </div>
                    </Stack>
                    <Stack>
                      <div className="text-black text-base font-semibold">
                        {form.getInputProps("address").value}
                      </div>
                    </Stack>
                  </div>
                  {
                    <div>
                      <Stack>
                        <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                          company
                        </div>
                      </Stack>
                      <Stack>
                        <div className="text-black text-base font-semibold">
                          {form.getInputProps("company")?.value}
                        </div>
                      </Stack>
                    </div>
                  }
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
                  <div
                    className="p-4 h-full rounded bg-white"
                    style={{
                      height: "350.897px",
                      // background: "red",
                    }}
                  >
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

                      {true && (
                        <Image
                          data-bs-toggle="modal"
                          data-bs-target="#addExperience"
                          alt="Google"
                          style={{
                            width: "24px",
                            height: "24px",
                            // marginLeft: "10rem",
                          }}
                          src="./assets/addIcon.png"
                          alt="Google"
                          style={{
                            width: "24px",
                            height: "32px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setExperience({
                              id: "",
                              title: "",
                              employment_type: "",
                              company: "",
                              location: "",
                              location_type: "",
                              start_year: "",
                              start_year_month: "",
                              end_year: "",
                              currently_working: false,
                              end_year_month: "",
                            });
                          }}
                        />
                      )}
                    </Group>
                    <Group position="apart" py={12}>
                      <div
                        style={{
                          width: "100%",
                          // background:"red"
                        }}
                      >
                        <Stack spacing={8}>
                          {form.getInputProps("experience")?.value?.length >
                            0 &&
                            form
                              .getInputProps("experience")
                              ?.value.slice(0, 3)
                              .map((item: any) => {
                                return (
                                  <div
                                    className="d-flex justify-content-between"
                                    style={{
                                      // background:"yellow",
                                      width: "100%",
                                    }}
                                  >
                                    <div className="text-custom-light">
                                      <h6 className="title"> {item.title} </h6>
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
                                          marginBottom: "0rem",
                                        }}
                                      >
                                        {item.currently_working ? (
                                          "currently working"
                                        ) : (
                                          <>
                                            <span> {item.start_year} - </span>{" "}
                                            <span> {item.end_year} </span> ,
                                            {item.end_year -
                                              item.start_year +
                                              "yrs"}{" "}
                                          </>
                                        )}
                                      </p>

                                      <p
                                        style={{
                                          marginBottom: "0.2rem",
                                        }}
                                      >
                                        {" "}
                                        {item.location}{" "}
                                      </p>
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
                                        height: "32px",
                                        // marginLeft: "10rem",
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
                  <div
                    className="p-4 h-full rounded bg-white"
                    style={{
                      height: "350.897px",
                      // background: "red",

                      // background: "red",
                    }}
                  >
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
                      {true && (
                        <Image
                          src="./assets/addIcon.png"
                          alt="Google"
                          style={{
                            width: "24px",
                            height: "32px",
                            cursor: "pointer",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#addEducation"
                          onClick={() => {
                            setEducation({
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
                          }}
                        />
                      )}
                    </Group>
                    <Group position="apart" py={12}>
                      <div
                        style={{
                          width: "100%",
                          // background:"red"
                        }}
                      >
                        <Stack spacing={8}>
                          <div className="text-indigo-950 text-sm font-bold">
                            {/* Highest Education */}
                            {/* {form.getInputProps("education")?.value?.length} */}
                          </div>

                          <div className="text-custom-light">
                            <div>
                              <Stack spacing={8}>
                                {form.getInputProps("education")?.value
                                  ?.length > 0 &&
                                  form
                                    .getInputProps("education")
                                    ?.value.slice(0, 3)
                                    .map((item: any) => {
                                      return (
                                        <div
                                          className="d-flex justify-content-between"
                                          style={{
                                            // background:"yellow",
                                            width: "100%",
                                          }}
                                        >
                                          <div className="text-custom">
                                            <h6 className="title">
                                              {" "}
                                              <Text w={200} truncate="end">
                                                {item.school}{" "}
                                              </Text>
                                            </h6>
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
                                              <span>
                                                {" "}
                                                {item.start_year} -{" "}
                                              </span>{" "}
                                              <span> {item.end_year} </span> ,
                                              {item.end_year -
                                                item.start_year +
                                                "yrs"}{" "}
                                            </p>
                                          </div>

                                          <Image
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
                                              // marginLeft: "10rem",
                                            }}
                                            width={54}
                                          />
                                        </div>
                                      );
                                    })}
                              </Stack>
                            </div>
                          </div>
                        </Stack>
                      </div>
                    </Group>
                  </div>
                </Stack>
              </div>
            </div>

            <div
              className="lg:w-full"
              style={{
                marginTop: "1rem",
              }}
            >
              <Stack>
                {/* <div className="p-4 h-full xl:w-[420px] rounded "></div> */}
                <div className="p-4 h-full rounded bg-white">
                  <Group position="apart" className="border-b pb-[10px]">
                    <Group position="left">
                      <Image
                        src="./images/educationIcon.svg"
                        alt="Google"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <div className="text-black text-base font-semibold">
                        Projects
                      </div>
                    </Group>

                    {true && (
                      <Image
                        data-bs-toggle="modal"
                        data-bs-target="#addProject"
                        src="./assets/addIcon.png"
                        alt="Google"
                        style={{
                          width: "24px",
                          height: "32px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setProject({
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
                          });
                        }}
                      />
                    )}
                  </Group>
                  <Group
                    position="apart"
                    py={12}
                    style={{
                      width: "100%",
                      // background:"red"
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        // background:"pink"
                      }}
                    >
                      <Stack spacing={8}>
                        <div className="text-indigo-950 text-sm font-bold">
                          {/*                             
                            {form.getInputProps("project")?.value?.length} */}
                        </div>

                        <div className="text-gray-600 text-xs font-normal">
                          <div
                            style={{
                              width: "100%",
                              // background:"yellow"
                            }}
                          >
                            <Stack spacing={8}>
                              {form.getInputProps("project")?.value?.length >
                                0 &&
                                form
                                  .getInputProps("project")
                                  ?.value.slice(0, 3)
                                  .map((item: any) => {
                                    return (
                                      <div
                                        className="d-flex justify-content-between"
                                        style={{
                                          // background:"yellow",
                                          width: "100%",
                                        }}
                                      >
                                        <div className="text-custom-light">
                                          <h6 className="title">
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

                                          <h6
                                            style={{
                                              marginBottom: "0.5rem",
                                            }}
                                          >
                                            {" "}
                                            <span>
                                              {" "}
                                              {item.workFromMonth} -{" "}
                                            </span>{" "}
                                            <span> {item.workFromYear} </span> ,
                                          </h6>

                                          <h6>
                                            {" "}
                                            <span>
                                              {" "}
                                              status: {item.projectStatus}{" "}
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
                                          </h6>

                                          {/* <h6>  activity: {item.activities} </h6> */}
                                          <h6>
                                            {" "}
                                            role description:{" "}
                                            {item.roleDescription}{" "}
                                          </h6>
                                        </div>

                                        <div className="">
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
                                              // marginLeft: "10rem",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                            </Stack>
                          </div>
                        </div>
                      </Stack>
                    </div>
                  </Group>
                </div>
              </Stack>
            </div>
            <div className=" flex flex-col lg:flex-row justify-center  gap-5 xl:12 mt-3">
              <div className="lg:w-full">
                <Stack>
                  {/* <div className="p-4 h-full xl:w-[420px] rounded "></div> */}
                  <div className="p-4 h-full rounded bg-white ">
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
                    </Group>

                    <Group position="apart" py={12}>
                      <div>
                        <Stack spacing={8}>
                          <div className="text-indigo-950 text-sm font-bold d-flex align-items-center">
                            <Image
                              src="./images/resumeIcon.svg"
                              className="resume-icon"
                              alt="Google"
                              style={{
                                width: "32px",
                                height: "44px",
                                marginRight: "1em",
                                borderRadius: "100% !important",
                              }}
                              onClick={() =>
                                router.push(
                                  `/edit_user?id=${localStorage.getItem("id")}`
                                )
                              }
                            />

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
                            {/* 867 Kb. Feb 2022 */}
                          </div>
                        </Stack>
                      </div>
                      {/* <Image
                        src="./images/Edit.svg"
                        alt="Google"
                        style={{ width: "24px", height: "24px" }}
                      /> */}
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
