"use client";

import { Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MDBDataTable } from "mdbreact";
import { useEffect, useState } from "react";

import { Group, Image, MantineProvider } from "@mantine/core";
import useThemeContext from "@/context/context";
import { GET_USER, VIEW_USER } from "@/util/queries";
import { gql } from "graphql-request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import client from "../../helpers/request";
import Master from "../components/master/page";
import { ADD_MULTIPLE_USER } from "@/util/mutationQueries";
import { randomId } from "@mantine/hooks";
import HomeProfile from "@/components/homeProfile/page";
import { useSession } from "next-auth/react";
import { ALL_USERS, USERS, COMPANIES } from "@/util/queries";

import {
  FiChevronDown,
  FiChevronRight,
  FiTrash,
  FiCalendar,
} from "react-icons/fi";

import {
  IconUsers,
  IconCirclePlus,
  IconUser,
  IconDashboard,
  IconLiveView,
  IconEdit,
  IconPlus,
  IconEye,
} from "@tabler/icons-react";

import { NavBar  as CustomNabBar} from "@clipl/ds-base"

export default function Home() {
  const [main, setMain] = useState();

  const { data: session }: any = useSession();

  const router = useRouter();

  const sendEmails = async (users) => {
    const recipients = users.map((item) => {
      return {
        to: item.email,
        subject: "Resource management credentails",
        text: `welcome ${item?.name} your password is ${item?.password}`,
      };
    });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: recipients,
        }),
      });

      if (response.ok) {
        // console.log("Emails sent successfully");
        return true;
      } else {
        // console.error("Failed to send emails");
        return false;
      }
    } catch (error) {
      console.error("Error sending emails:", error.message);
    }
  };

  function generateSecurePassword5(inputString, length, company) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";

    // Create a random portion with uppercase, numbers, and special characters
    let randomPart = "";
    for (let i = 0; i < 5; i++) {
      const charSet = i % 3;
      switch (charSet) {
        case 0:
          randomPart += uppercaseChars.charAt(
            Math.floor(Math.random() * uppercaseChars.length)
          );
          break;
        case 1:
          randomPart += numberChars.charAt(
            Math.floor(Math.random() * numberChars.length)
          );
          break;
      }
    }

    // console.log("c", randomPart);

    const password = inputString + randomPart + "@" + "cloud";

    return password;
  }

  const form: any = useForm({
    initialValues: {
      userId: "",
      role: "",
      company: "",
      photograph: "",
      stepperFilled: false,
      companies: [],
      profile_summary: "",
      resume_headline: "",
      name: "",
      status: "",
    },
    validate: {
      company: (value) => (value ? null : "please select company"),
    },
  });

  const formEmployees: any = useForm({
    initialValues: {
      company: "",
      entries: [
        {
          userName: "",
          mobileNumber: "",
          email: "",
          address: "",
          //   company: "",
          key: 0,
        },
      ],
    },
    validate: {
      company: (value) => (value ? null : "please select company"),
      entries: {
        userName: (value) => (value ? null : "select userName"),
        mobileNumber: (value) => {
          if (!value) {
            return "please select number";
          }

          const mobileNumber = value;

          const check = formEmployees?.values?.entries.filter(
            (item) => item.mobileNumber === value
          );

          if (check.length > 1) {
            return "duplicate phone";
          }

          if (/^[0-9]{10}$/.test(mobileNumber)) {
            // console.log("inside", mobileNumber);
            return null;
          } else {
            // console.log("outside", mobileNumber);
            return "The mobile number is not valid.";
          }
        },

        email: (value) => {
          //     console.log("index", value);

          if (!value) {
            return "please enter mail";
          }

          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return "please enter valid mail";
          }

          const check = formEmployees?.values?.entries.filter(
            (item) => item.email === value
          );

          if (check.length > 1) {
            return "duplicate mail";
          }

          return null;
        },
        address: (value) => (value ? null : "add address"),
        // company: (value) => (value ? null : "please select company"),
      },
    },
  });

  const formManagers: any = useForm({
    initialValues: {
      company: "",
      entries: [
        {
          userName: "",
          mobileNumber: "",
          email: "",
          address: "",
          //   company: "",
          key: 0,
        },
      ],
    },
    validate: {
      company: (value) => (value ? null : "please select company"),
      entries: {
        userName: (value) => (value ? null : "select userName"),
        mobileNumber: (value) => {
          if (!value) {
            return "please select number";
          }

          const mobileNumber = value;

          const check = formManagers?.values?.entries.filter(
            (item) => item.mobileNumber === value
          );

          if (check.length > 1) {
            return "duplicate phone";
          }

          if (/^[0-9]{10}$/.test(mobileNumber)) {
            // console.log("inside", mobileNumber);
            return null;
          } else {
            // console.log("outside", mobileNumber);
            return "The mobile number is not valid.";
          }
        },

        email: (value) => {
          //     console.log("index", value);

          if (!value) {
            return "please enter mail";
          }

          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return "please enter valid mail";
          }

          const check = formManagers?.values?.entries.filter(
            (item) => item.email === value
          );

          if (check.length > 1) {
            return "duplicate mail";
          }

          return null;
        },
        address: (value) => (value ? null : "add address"),
        // company: (value) => (value ? null : "please select company"),
      },
    },
  });

  const getUser = async () => {
    const user: any = await client.request(VIEW_USER, {
      where: {
        id: session?.user.user.id,
      },
    });

    if (session?.user.user.role === "manager") {
      // alert("here");
      formEmployees.setValues({
        company: session?.user?.user?.company_name,
      });
    }

    form.setValues({
      resume_headline: user?.user?.resume_headline,
      profile_summary: user?.user?.profile_summary,
      photograph: user?.user?.photograph,
      name: user?.user?.name,
      work: user?.user?.open_to_work,
      status: user?.user?.active,
      role: user?.user?.role,
      company: user?.user?.company?.name,
      stepperFilled: user?.user?.stepperFilled,
    });
  };

  const getData = async () => {
    console.log("getData", getData);

    const user: any = await client.request(USERS, {
      where: {
        role: {
          equals: "employee",
        },
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });

    console.log("userInsssss", user);

    const users = user.users?.slice(0, 2)?.map((item: any) => {
      return {
        user: item?.name,
        company: item?.company?.name,
        phone: item?.phone,
        address: item?.address,
        // photograph: <img src={item?.photograph} />,
        // // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        // keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        // itskills: item.itskills.map((u: any) => u.name).join(", "),
        // action: (
        //   <button
        //     className="table-button"
        //     onClick={() => router.push(`/edit_master?id=${item.id}`)}
        //   >
        //     {" "}
        //     edit{" "}
        //   </button>
        // ),
        action: (
          <button
            className="table-button"
            onClick={() => router.push(`/view_master?id=${item.id}`)}
          >
            {" "}
            edit{" "}
          </button>
        ),
        resume: item.resume ? (
          <a
            download={
              item.resume.includes("docx") || item.resume.includes("doc")
                ? true
                : false
            }
            target="_blank"
            className="resume-link"
            href={item.resume}
          >
            {" "}
            view resume{" "}
          </a>
        ) : (
          ""
        ),
      };
    });

    const test: any = {
      columns: [
        // {
        //   label: "Name",
        //   field: "user",
        //   sort: "asc",
        //   width: 150,
        // },
        // {
        //   label: "resume_headline",
        //   field: "resume_headline",
        //   sort: "asc",
        //   width: 150,
        // },
        // {
        //   label: "Photograph",
        //   field: "photograph",
        //   sort: "asc",
        //   width: 270,
        // },
        {
          label: "Name",
          field: "user",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Phone",
          field: "phone",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Address",
          field: "address",
          sort: "disabled",
          width: 200,
        },

        // {
        //   label: "Photograph",
        //   field: "photograph",
        //   sort: "disabled",
        //   width: 200,
        // },
        {
          label: "Company",
          field: "company",
          sort: "disabled",
          width: 200,
        },
        // {
        //   label: "Resume Headline",
        //   field: "resume_headline",
        //   sort: "disabled",
        //   width: 200,
        // },
        {
          label: "Key skills",
          field: "keyskills",
          sort: "disabled",
          width: 100,
        },
        // {
        //   label: "Education",
        //   field: "education",

        //   sort: "asc",

        //   width: 150,
        // },
        {
          label: "It Skills",
          field: "itskills",

          sort: "disabled",
          width: 100,
        },
        // {
        //   label: "Total Experience",
        //   field: "total_experience",
        //   sort: "disabled",
        //   width: 100,
        // },
        // {
        //   label: "Relevant Experience",
        //   field: "relevant_experience",
        //   sort: "disabled",
        //   width: 100,
        // },
        // {
        //   label: "Profile Summary",
        //   field: "profile_summary",
        //   sort: "disabled",
        //   width: 100,
        // },
        {
          label: "Resume",
          field: "resume",
          sort: "disabled",
          width: 100,
        },
        {
          label: "Action",
          field: "action",
          sort: "disabled",
          width: 100,
        },
      ],
      rows: users,
    };

    setMain(test);
  };

  const getManagersEmployees = async () => {
    console.log("checkCompany", form.getInputProps("company")?.value);

    const user: any = await client.request(USERS, {
      where: {
        role: {
          equals: "employee",
        },

        company: {
          name: {
            equals: session?.user?.user?.company_name,
          },
        },
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });

    console.log("userInsssss", user);

    const users = user.users?.slice(0, 2)?.map((item: any) => {
      return {
        user: item?.name,
        company: item?.company?.name,
        phone: item?.phone,
        address: item?.address,
        // photograph: <img src={item?.photograph} />,
        // // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        // keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        // itskills: item.itskills.map((u: any) => u.name).join(", "),
        // action: (
        //   <button
        //     className="table-button"
        //     onClick={() => router.push(`/edit_master?id=${item.id}`)}
        //   >
        //     {" "}
        //     edit{" "}
        //   </button>
        // ),
        action: (
          <button
            className="table-button"
            onClick={() => router.push(`/view_master?id=${item.id}`)}
          >
            {" "}
            edit{" "}
          </button>
        ),
        resume: item.resume ? (
          <a
            download={
              item.resume.includes("docx") || item.resume.includes("doc")
                ? true
                : false
            }
            target="_blank"
            className="resume-link"
            href={item.resume}
          >
            {" "}
            view resume{" "}
          </a>
        ) : (
          ""
        ),
      };
    });

    const test: any = {
      columns: [
        // {
        //   label: "Name",
        //   field: "user",
        //   sort: "asc",
        //   width: 150,
        // },
        // {
        //   label: "resume_headline",
        //   field: "resume_headline",
        //   sort: "asc",
        //   width: 150,
        // },
        // {
        //   label: "Photograph",
        //   field: "photograph",
        //   sort: "asc",
        //   width: 270,
        // },
        {
          label: "Name",
          field: "user",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Phone",
          field: "phone",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Address",
          field: "address",
          sort: "disabled",
          width: 200,
        },

        // {
        //   label: "Photograph",
        //   field: "photograph",
        //   sort: "disabled",
        //   width: 200,
        // },
        {
          label: "Company",
          field: "company",
          sort: "disabled",
          width: 200,
        },
        // {
        //   label: "Resume Headline",
        //   field: "resume_headline",
        //   sort: "disabled",
        //   width: 200,
        // },
        {
          label: "Key skills",
          field: "keyskills",
          sort: "disabled",
          width: 100,
        },
        // {
        //   label: "Education",
        //   field: "education",

        //   sort: "asc",

        //   width: 150,
        // },
        {
          label: "It Skills",
          field: "itskills",

          sort: "disabled",
          width: 100,
        },
        // {
        //   label: "Total Experience",
        //   field: "total_experience",
        //   sort: "disabled",
        //   width: 100,
        // },
        // {
        //   label: "Relevant Experience",
        //   field: "relevant_experience",
        //   sort: "disabled",
        //   width: 100,
        // },
        // {
        //   label: "Profile Summary",
        //   field: "profile_summary",
        //   sort: "disabled",
        //   width: 100,
        // },
        {
          label: "Resume",
          field: "resume",
          sort: "disabled",
          width: 100,
        },
        {
          label: "Action",
          field: "action",
          sort: "disabled",
          width: 100,
        },
      ],
      rows: users,
    };

    setMain(test);
  };

  console.log("---------------------------------------", session);

  useEffect(() => {
    console.log("session122222", session);

    var element: any = document.getElementsByClassName("table-bordered");

    console.log(element);

    if (element) {
      // console.log("ll", element);
      element[0]?.classList?.remove("table-bordered");
    }

    if (session?.user.user.role === "employee") {
      getData();
    } else {
      getManagersEmployees();
    }

    getUser();
  }, [session]);

  const {
    loggedIn,
    setLoggedIn,
    setFormData,
    setActive,
    hasMaster,
    sethasMaster,
    role,
    setRole,
    formData,
  }: any = useThemeContext();

  useEffect(() => {
    console.log(
      "session idggggggggggggggggg---------------------------------",
      session
    );

    const id = session?.user?.user.id;

    console.log("session id---------------------------------");

    if (id) {
      getData();
    }
  }, [session]);

  const checkExistingUser = async (email) => {
    console.log("checking email", email);

    const checking = await client.request(GET_USER, {
      where: {
        email: email,
      },
    });

    console.log("response", checking?.user?.email);

    return checking?.user?.email;
  };

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

  const addEntryManager = () => {
    // console.log('form',form.values)

    if (!formManagers.getInputProps("company")?.value) {
      return formManagers.setFieldError("company", "select company");
    }

    console.log("form", form.values);
    formManagers.insertListItem("entries", {
      userName: "",
      mobileNumber: "",
      email: "",
      address: "",
      key: randomId(),
    });
  };

  const addEntryEmployee = () => {
    console.log("mmmmm", form.getInputProps("company")?.value);

    if (formEmployees.getInputProps("role")?.value === "admin") {
      if (!formEmployees.getInputProps("company")?.value) {
        return formEmployees.setFieldError("company", "select company");
      }
    }

    console.log("form", form.values);
    formEmployees.insertListItem("entries", {
      userName: "",
      mobileNumber: "",
      email: "",
      address: "",
      key: randomId(),
    });
  };

  const getRole = async () => {
    const user: any = await client.request(GET_USER, {
      where: {
        id: session?.user?.user?.id,
      },
    });

    console.log("seeing user in sidebar", user);
    setRole(user?.user?.role);
  };

  useEffect(() => {
    getComapanies();

    getRole();
  }, [session]);

  console.log("rolessssssssssssssssssssssssssss", role);

  const saveAllManagers = async () => {
    console.log("form enteries", formManagers.values.entries);

    if (formManagers.validate().hasErrors) {
      console.log("yes", formManagers.errors);

      return;
    } else {
      console.log("formManagers valuess ", formManagers.values);

      const users: any = await client.request(ALL_USERS);

      console.log("users", users);

      const checkDuplicatePhone = formManagers.values.entries.map((item) => {
        const flag = users.users.filter(
          (phone) => phone.phone === item.mobileNumber
        );

        if (flag.length > 0) {
          return flag;
        }
      });

      const filterDuplicatesNumbers = checkDuplicatePhone.filter(
        (item) => item !== undefined
      );

      console.log("duplicatePhone", checkDuplicatePhone);

      const Mutatedata = formManagers.values.entries.map(async (item) => {
        return checkExistingUser(item.email);
      });

      const values = await Promise.all(Mutatedata);

      console.log("valuessssssssssss0", values);

      const checkDuplicatesMail = values.filter((item) => item !== undefined);

      console.log("valuessssssssssssinngg", checkDuplicatesMail);

      if (checkDuplicatesMail.length > 0) {
        return toast(`${checkDuplicatesMail[0]} already registered`, {
          className: "black-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
      }

      if (filterDuplicatesNumbers.length > 0) {
        return toast(
          `${filterDuplicatesNumbers[0][0].phone} already registered`,
          {
            className: "black-background",
            bodyClassName: "grow-font-size",
            progressClassName: "fancy-progress-bar",
          }
        );
      }

      const MutatedataForSending = formManagers.values.entries.map((item) => {
        return {
          name: item.userName,
          // role:['Admin'],
          // mobilenumber: item.mobileNumber,
          role: "manager",
          email: item.email,
          // address: item.address,
          company: {
            connect: {
              id: formManagers.getInputProps(`company`)?.value,
            },
          },
          password: generateSecurePassword5(item.userName, 12, item.company),
          address: item.address,
          phone: item.mobileNumber,
        };
      });

      console.log("generate", MutatedataForSending);

      const user = await client.request(ADD_MULTIPLE_USER, {
        data: MutatedataForSending,
      });

      if (user.createUsers) {
        toast("managers invited", {
          className: "green-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });

        formManagers.setFieldValue("entries", [
          {
            userName: "",
            mobileNumber: "",
            email: "",
            address: "",
            //   company: "",
            key: 0,
          },
        ]);

        formManagers.setFieldValue("company", "");

        const check = await sendEmails(MutatedataForSending);

        if (check) {
          toast("managers credentials sent ", {
            className: "green-background",
            bodyClassName: "grow-font-size",
            progressClassName: "fancy-progress-bar",
          });
        }

        // Redirect or perform other actions
        setTimeout(() => {
          // router.push("/registered_managers");
        }, 1000);
      } else {
        // console.log("error",);
      }
    }
  };

  const saveAllEmployees = async () => {
    // console.log("formManagers enteries", form.entries);

    if (formEmployees.validate().hasErrors) {
      // console.log("yes", formEmployees.errors);

      return;
    } else {
      // console.log("formEmployees valuess ", formEmployees.values);

      const users: any = await client.request(ALL_USERS);

      // console.log("users", users);

      const checkDuplicatePhone = formEmployees.values.entries.map((item) => {
        const flag = users.users.filter(
          (phone) => phone.phone === item.mobileNumber
        );

        if (flag.length > 0) {
          return flag;
        }
      });

      const filterDuplicatesNumbers = checkDuplicatePhone.filter(
        (item) => item !== undefined
      );

      const Mutatedata = formEmployees.values.entries.map(async (item) => {
        return checkExistingUser(item.email);
      });

      const values = await Promise.all(Mutatedata);

      const checkDuplicatesMail = values.filter((item) => item !== undefined);

      // console.log("valuessssssssssssinngg", checkDuplicatesMail);

      if (checkDuplicatesMail.length > 0) {
        return toast(`${checkDuplicatesMail[0]} already registered`, {
          className: "black-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
      }

      if (filterDuplicatesNumbers.length > 0) {
        return toast(
          `${filterDuplicatesNumbers[0][0].phone} already registered`,
          {
            className: "black-background",
            bodyClassName: "grow-font-size",
            progressClassName: "fancy-progress-bar",
          }
        );
      }

      const MutatedataForSending = formEmployees.values.entries.map((item) => {
        return {
          name: item.userName,
          // role:['Admin'],
          role: "employee",
          email: item.email,
          // address: item.address,
          company: {
            connect: {
              id: formEmployees.getInputProps("company")?.value,
            },
          },
          password: generateSecurePassword5(item.userName, 12, item.company),
          address: item.address,
          phone: item.mobileNumber,
        };
      });

      // console.log("generate", MutatedataForSending);

      const user = await client.request(ADD_MULTIPLE_USER, {
        data: MutatedataForSending,
      });

      if (user.createUsers) {
        toast("employees invited", {
          className: "green-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });

        formEmployees.setFieldValue("entries", [
          {
            userName: "",
            mobileNumber: "",
            email: "",
            address: "",
            //   company: "",
            key: 0,
          },
        ]);

        formEmployees.setFieldValue("company", "");

        const check = await sendEmails(MutatedataForSending);

        if (check) {
          toast("employees credentials sent", {
            className: "green-background",
            bodyClassName: "grow-font-size",
            progressClassName: "fancy-progress-bar",
          });

          // Redirect or perform other actions
          setTimeout(() => {
            // router.push("/invited_employees");
          }, 1000);
        }
      } else {
        // setFormErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <MantineProvider>

      <CustomNabBar 
        bellIcon={true}
        profileImage={FiCalendar}
        links={[
          { link: "hone", label: "Home" },
          { link: "abput", label: "About" },
        ]}
        searchable={true}  
        // searchableCenter = {true} 
        searchableLeft={true}
        />


        <div className="">
          <div className="dashboard">
            {form.getInputProps("role")?.value !== "employee" && (
              <div
                className=""
                style={{
                  marginBottom: "18px",
                  marginTop: "80px",
                }}
              >
                <span className="px-[48px] dashboard-heading">Dashboard</span>
              </div>
            )}

            {form.getInputProps("role")?.value === "manager" && (
              <div className="px-5  ">
                <div className="">
                  <div className="">
                    <div className="page-heading w-full  pt-2 pb-2 mb-4 d-flex align-items-center">
                      <div className="home_layer in_manager_dashboard">
                        <div className="home_card custom-rounded custom-box-shadow">
                          <h6 className="text-center mt-4 card-main-heading">
                            {" "}
                            Employees{" "}
                          </h6>

                          <div className="home-card-bottom-layer">
                            <div className="d-flex">
                              <div className="icon">
                                <IconEye />
                              </div>

                              <span
                                className="card-span-tag"
                                onClick={() =>
                                  router.push("/view_employees_in_manager")
                                }
                              >
                                {" "}
                                View employees{" "}
                              </span>
                            </div>

                            <div className="d-flex">
                              <div className="icon">
                                <IconPlus />
                              </div>

                              <span
                                className="card-span-tag"
                                onClick={() =>
                                  router.push("/add_manager_employees_profiles")
                                }
                              >
                                {" "}
                                Add employees{" "}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="home_card custom-rounded custom-box-shadow mx-4">
                          <h6 className="text-center mt-4 card-main-heading">
                            {" "}
                            Invite{" "}
                          </h6>

                          <div
                            className="home-card-bottom-layer"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div className="d-flex">
                              <div className="icon">
                                <IconEye />
                              </div>

                              <span
                                className="card-span-tag"
                                onClick={() =>
                                  router.push(
                                    "/view_manager_employees_profiles"
                                  )
                                }
                              >
                                {" "}
                                Invite employees{" "}
                              </span>
                            </div>

                            {/* <div className="d-flex">
                              <div className="icon">
                                <IconPlus />
                              </div>

                              <span
                                className="card-span-tag"
                                onClick={() =>
                                  router.push("/add_manager_employees_profiles")
                                }
                              >
                                {" "}
                                Invite Managers{" "}
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="">
              {form.getInputProps("role")?.value === "admin" && (
                <div className="">
                  <form onSubmit={formManagers.onSubmit((values) => {})}>
                    {/* <div className="px-5  ">
                      <div className="">
                        <div className="">
                          <div className="page-heading w-full  pt-2 pb-2 mb-4 d-flex align-items-center justify-content-between">
                            <div className="home_layer">
                              <div className="home_card custom-rounded custom-box-shadow">
                                <h6 className="text-center mt-4 card-main-heading">
                                  {" "}
                                  Managers{" "}
                                </h6>

                                <div className="home-card-bottom-layer">
                                  <div className="d-flex">
                                    <div className="icon">
                                      <IconEye />
                                    </div>

                                    <span
                                      className="card-span-tag"
                                      onClick={() =>
                                        router.push("/view_managers")
                                      }
                                    >
                                      {" "}
                                      View managers{" "}
                                    </span>
                                  </div>

                                  <div className="d-flex">
                                    <div className="icon">
                                      <IconPlus />
                                    </div>

                                    <span
                                      className="card-span-tag"
                                      onClick={() =>
                                        router.push("/add_managers")
                                      }
                                    >
                                      {" "}
                                      Add managers{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="home_card custom-rounded custom-box-shadow">
                                <h6 className="text-center mt-4 card-main-heading">
                                  {" "}
                                  Employees{" "}
                                </h6>

                                <div className="home-card-bottom-layer">
                                  <div className="d-flex">
                                    <div className="icon">
                                      <IconEye />
                                    </div>

                                    <span
                                      className="card-span-tag"
                                      onClick={() =>
                                        router.push("/view_employees")
                                      }
                                    >
                                      {" "}
                                      View employees{" "}
                                    </span>
                                  </div>

                                  <div className="d-flex">
                                    <div className="icon">
                                      <IconPlus />
                                    </div>

                                    <span
                                      className="card-span-tag"
                                      onClick={() =>
                                        router.push("/add_employees")
                                      }
                                    >
                                      {" "}
                                      Add employees{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="home_card custom-rounded custom-box-shadow">
                                <h6 className="text-center mt-4 card-main-heading">
                                  {" "}
                                  Invite{" "}
                                </h6>

                                <div className="home-card-bottom-layer">
                                  <div className="d-flex">
                                    <div className="icon">
                                      <IconEye />
                                    </div>

                                    <span
                                      className="card-span-tag"
                                      onClick={() =>
                                        router.push("/add_employees")
                                      }
                                    >
                                      {" "}
                                      Invite employees{" "}
                                    </span>
                                  </div>
                                  
                                  <div className="d-flex">
                                    <div className="icon">
                                      
                                      <IconPlus />
                                    </div>

                                    <span
                                      className="card-span-tag"
                                      onClick={() =>
                                        router.push("/add_managers")
                                      }
                                    >
                                      {" "}
                                      Invite managers{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="px-5  ">
                      <div className="">
                        <div className="">
                          <div className="page-heading w-full  pt-2 pb-2 mb-4 d-flex align-items-center justify-content-between">
                            <div className="home_layer">
                              <div className="home_card custom-rounded custom-box-shadow">
                                <h6 className="text-center mt-4 card-main-heading">
                                  {" "}
                                  Total Managers{" "}
                                </h6>

                                <div className="text-center">
                                  <span> {789} </span>
                                </div>

                                <div className="d-flex justify-content-between">
                                  <div className="mt-2">
                                    <h6> open to work : {80} </h6>

                                    <h6> engaged in project : {120} </h6>
                                  </div>

                                  <div className="mt-2">
                                    <h6> active : {80} </h6>

                                    <h6> not active : {120} </h6>
                                  </div>
                                </div>
                              </div>
                              <div className="home_card custom-rounded custom-box-shadow">
                                <h6 className="text-center mt-4 card-main-heading">
                                  {" "}
                                  Total Employees{" "}
                                </h6>

                                <div className="text-center">
                                  <span> {789} </span>

                                  <div className="d-flex justify-content-between">
                                    <div className="mt-2">
                                      <h6> open to work : {80} </h6>

                                      <h6> engaged in project : {120} </h6>
                                    </div>

                                    <div className="mt-2">
                                      <h6> active : {80} </h6>

                                      <h6> not active : {120} </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="home_card custom-rounded custom-box-shadow">
                                <h6 className="text-center mt-4 card-main-heading">
                                  {" "}
                                  Total Projects{" "}
                                </h6>

                                <div className="text-center">
                                  <span> {789} </span>

                                  <div className="d-flex justify-content-between">
                                    <div className="mt-2">
                                      <h6> in progress : {80} </h6>

                                      <h6> finished : {120} </h6>
                                    </div>

                                    {/* <div className="mt-2">
                                      <h6> active : {80} </h6>

                                      <h6> not active : {120} </h6>
                                    </div> */}
                                  </div>

                                </div>
                              </div>


                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 home_card custom-rounded custom-box-shadow"></div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {form.getInputProps("role")?.value === "employee" &&
        form.getInputProps("stepperFilled")?.value === false ? (
          <Master />
        ) : (
          ""
        )}

        {form.getInputProps("role")?.value === "employee" &&
          form.getInputProps("stepperFilled")?.value === true && (
            <HomeProfile />
          )}
      </MantineProvider>
    </>
  );
}
