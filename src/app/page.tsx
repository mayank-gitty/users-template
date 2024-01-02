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




import {
  FiChevronDown,
  FiChevronRight,
  FiTrash,
  FiCalendar,
} from "react-icons/fi";

const COMPANIES = gql`
  query Query {
    companies {
      name
      id
    }
  }
`;

export default function Home() {
  const [main, setMain] = useState();

  const router = useRouter();

  const sendEmails = async (users) => {
    console.log("rec", users);

    const recipients = users.map((item) => {
      return {
        to: item.email,
        subject: "Resource management credentails",
        text: `welcome ${item?.name} your password is ${item?.password}`,
      };
    });

    console.log("rec", recipients);

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
        console.log("Emails sent successfully");
        return true;
      } else {
        console.error("Failed to send emails");
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

    console.log("c", randomPart);

    // Create the final password by combining the input string, underscores, and the random portion
    // const underscores = "_".repeat(remainingLength - randomPart.length);
    const password = inputString + randomPart + "@" + "cloud";

    return password;
  }

  const form: any = useForm({
    initialValues: {
      userId: "",
      role: "",
      company: "",
      stepperFilled:false,
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
            console.log("inside", mobileNumber);
            return null;
          } else {
            console.log("outside", mobileNumber);
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
            console.log("inside", mobileNumber);
            return null;
          } else {
            console.log("outside", mobileNumber);
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
        id: localStorage.getItem("id"),
      },
    });

    console.log("user profile gotttttttttttttttttttttttttttttttttt", user);

    if (user?.user) {


      console.log('mmmm')
      // alert('insi')
      // settrue(false);
    }

    if (localStorage.getItem("role") === "manager") {
      // alert("here");

      // console.log(  'sss',localStorage.getItem('company') )

      formEmployees.setValues({
        company: user?.user?.company?.id,
      });
    }

    form.setValues({
      // profileUserId: user?.user?.id,
      // itskills: user?.user?.itskills?.map((item: any) => item.name),
      // education: user?.user?.education,
      // project: user?.user?.project,
      // keyskills: user?.user?.keyskills?.map((item: any) => item.id),
      // userkeyskills: user?.user?.keyskills?.map((item: any) => item.name),
      resume_headline: user?.user?.resume_headline,
      profile_summary: user?.user?.profile_summary,
      // photograph: user?.user?.photograph,
      name: user?.user?.name,
      work: user?.user?.open_to_work,
      status: user?.user?.active,
      role: user?.user.role,
      company: user?.user?.company?.name,
      stepperFilled:user?.user?.stepperFilled
      // workForMutation: user?.user?.open_to_work,
      // statusForMutation: user?.user?.active,
      // resume: user?.user?.resume,
      // email: user?.user?.email,
      // userEmail: user?.user?.email,
      // userEmailForMutation: user?.user?.email,
      // role: user?.user?.role,
      // company: user?.user?.company?.name,
      // userCompany: user?.user?.company?.id,
      // phone: user?.user?.phone,
      // userPhone: user?.user?.phone,
      // address: user?.user?.address,
      // userAddress: user?.user?.address,
      // experience: user?.user?.experience,
    });
  };

  const GET_ALL_USERS = gql`
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

  const USERS = gql`
    query Users($where: UserWhereInput!) {
      users(where: $where) {
        name
        id
        photograph
        resume
        resume_headline
        itskills {
          id
          name
        }
        itskillsCount
        education {
          id
        }
        educationCount
        project {
          id
        }
        projectCount
        active
        open_to_work
        keyskills {
          id
          name
        }
        keyskillsCount
        experience {
          id
        }
        experienceCount
        profile_summary
        createdAt
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

  const getData = async () => {
    console.log("getData", getData);

    const user: any = await client.request(USERS, {
      where: {
        role: {
          equals: "employee",
        },

        // company: {
        //   name: {
        //     equals: localStorage.getItem('company')
        //   }
        // }
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

    console.log("checkCompanyU", localStorage.getItem("company"));

    const user: any = await client.request(USERS, {
      where: {
        role: {
          equals: "employee",
        },

        company: {
          name: {
            equals: localStorage.getItem("company"),
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

  useEffect(() => {


    var element: any = document.getElementsByClassName("table-bordered");

    console.log(element);

    if (element) {
      // console.log("ll", element);
      element[0]?.classList?.remove("table-bordered");
    }

    if (localStorage.getItem("role")) {
      getData();
    } else {
      getManagersEmployees();
    }

    getUser();
  }, []);

  const {
    loggedIn,
    setLoggedIn,
    setFormData,
    setActive,
    hasMaster,
    sethasMaster,
    role,
    setRole,
    formData
  }: any = useThemeContext();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      // getData();
    } else {
      router.push("/login");
    }
  }, []);

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
        id: localStorage.getItem("id"),
      },
    });

    console.log("seeing user in sidebar", user);
    setRole(user?.user?.role);
  };

  useEffect(() => {
    getComapanies();

    getRole();
  }, []);

  console.log("rolessssssssssssssssssssssssssss", role);

  const saveAllManagers = async () => {
    console.log("form enteries", formManagers.values.entries);

    if (formManagers.validate().hasErrors) {
      console.log("yes", formManagers.errors);

      return;
    } else {
      console.log("formManagers valuess ", formManagers.values);

      const users: any = await client.request(GET_ALL_USERS);

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
        // setFormErrors(validationErrors);
      }
    }
  };

  const saveAllEmployees = async () => {
    console.log("formManagers enteries", form.entries);

    if (formEmployees.validate().hasErrors) {
      console.log("yes", formEmployees.errors);

      return;
    } else {
      console.log("formEmployees valuess ", formEmployees.values);

      const users: any = await client.request(GET_ALL_USERS);

      console.log("users", users);

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

      console.log("duplicatePhone", checkDuplicatePhone);

      const Mutatedata = formEmployees.values.entries.map(async (item) => {
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

      const MutatedataForSending = formEmployees.values.entries.map((item) => {
        return {
          name: item.userName,
          // role:['Admin'],
          // mobilenumber: item.mobileNumber,
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

      console.log("generate", MutatedataForSending);

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
        // console.log("error",);
        // setFormErrors(validationErrors);
      }
    }
  };

  // const getData = async () => {
  //   const user: any = await client.request(HAS_MASTER, {
  //     where: {
  //       user: {
  //         id: {
  //           equals: localStorage.getItem("id"),
  //         },
  //        },
  //     },
  //   });

  //   if (user?.profileUsers.length > 0) {
  //     sethasMaster(true);
  //   }
  //   const profile: any = await client.request(GET_USER, {
  //     where: {
  //       id: localStorage.getItem("id"),
  //     },
  //   });

  //   setRole(profile?.user?.role);
  // };

  console.log("hasMaster", form.getInputProps('stepperFilled')?.value ,role);








  const renderMaster=()=>{


         console.log('home')


  }


  return (
    <>
      {/* <ToastContainer /> */}
      <MantineProvider>

        <div className="">

      

          <div className="dashboard">


{

role !== 'employee' &&    <div className="" style={{
  marginBottom:"18px",
  marginTop:"80px"
}} >

<span className="px-[48px] dashboard-heading">Dashboard</span>

</div>

}

        

            {form.getInputProps("role")?.value ===
              ("manager" ) && (
              <div className="profile-block"  >
                <div className="px-5">
                  <div className="py-4 px-5 custom-rounded-dashboard custom-box-shadow-dashboard"  style={{
                // padding:"17px 17px",
                marginTop:"1rem",
                marginRight:"1rem"

              }} >
                    <div className="profile-header d-flex justify-content-between mb-4">
                      <span
                        className="page-main-heading-dashboard"
                        style={{
                          marginLeft: "0px",
                        }}
                      >
                        Profile
                      </span>

                      <Image
                        width={15}
                        height={15}
                        src="images/dashboard-profile-edit.svg"
                      />
                    </div>
                    <div className="profile-content d-flex">
                      <div className="photograph-in-main-page">
                        <Image
                          width={184}
                          height={138}
                          src="images/profile-photo.svg"
                        />
                      </div>

                      <div className="">
                        <div className="mx-4">
                          <div className="text-black text-[28px] font-semibold ">
                            {form.getInputProps("name")?.value}
                          </div>
                          <div className="text-[#ABABAB] text-base font-medium ">
                            {form.getInputProps("resume_headline").value}
                          </div>
                          <div className="text-[#797878] text-xs font-medium profile-summary-box">
                            {form.getInputProps("profile_summary").value}
                          </div>

                          <Group position="left" mt={"3%"}>
                            <p
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
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
                                <span className="px-4 py-2 bg-rose-100 rounded-sm text-red-700 text-xs font-medium">
                                  Engaged
                                </span>
                              )}
                            </p>
                          </Group>
                        </div>
                      </div>
                    </div>
                    .
                  </div>
                </div>
              </div>
            )}

            {form.getInputProps("role")?.value === "admin" && (
              <div className="create-managers-block">
                <form onSubmit={formManagers.onSubmit((values) => {})}>
                  <div className="px-5  ">
                    <div className="custom-rounded-dashboard">
                      <div className="p-5 ">
                        <div className="page-heading w-full  pt-2 pb-2 mb-4 d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <img src={"images/dashboardIcon.svg"} />

                            <h2 className="page-main-heading-dashboard">
                              {" "}
                              Create managers{" "}
                            </h2>
                          </div>
                          <div className="d-flex justify-content-between">
                            <Select
                              // label="Please select company"

                              style={{
                                marginRight: "1.5rem",
                              }}
                              placeholder="Please select company"
                              {...formManagers.getInputProps(`company`)}
                              data={form.getInputProps("companies").value}
                            />

                            <button
                              // onClick={() => saveAll()}
                              // className={`${"save-all-btn"}`}
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                border: "0.0625rem solid transparent",
                                background: "#40c057",
                                color: "#fff",
                                height: "32px",
                                padding: "0 10px",
                                borderRadius: "4.243px",
                              }}
                              onClick={() => saveAllManagers()}
                              type="button"
                            >
                              {" "}
                              Save managers entries{" "}
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                              <thead className="table-column-links">
                                <tr>
                                  <th scope="col" className="px-6 py-3">
                                    Name
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Mobile Number
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Email
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Address
                                  </th>
                                  {/* <th scope="col" className="px-6 py-3">
            Company
          </th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {formManagers.values?.entries?.length > 0 &&
                                  formManagers.values?.entries?.map(
                                    (item: any, index) => {
                                      return (
                                        <tr
                                          key={item.key}
                                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                          <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                          >
                                            <TextInput
                                              disabled={
                                                formManagers.getInputProps(
                                                  "company"
                                                )?.value
                                                  ? false
                                                  : true
                                              }
                                              className=" h-10 w-48 p-2"
                                              placeholder="Name"
                                              {...formManagers.getInputProps(
                                                `entries.${index}.userName`
                                              )}
                                            />
                                          </th>
                                          <td className="px-6 py-4">
                                            <TextInput
                                              disabled={
                                                formManagers.getInputProps(
                                                  "company"
                                                )?.value
                                                  ? false
                                                  : true
                                              }
                                              className=" h-10 w-48 p-2"
                                              placeholder="Mobile Number"
                                              {...formManagers.getInputProps(
                                                `entries.${index}.mobileNumber`
                                              )}
                                            />
                                          </td>
                                          <td className="px-6 py-4">
                                            <TextInput
                                              //   label="Name"
                                              //   description="Input description"
                                              disabled={
                                                formManagers.getInputProps(
                                                  "company"
                                                )?.value
                                                  ? false
                                                  : true
                                              }
                                              className=" h-10 w-48 p-2"
                                              placeholder="Email"
                                              {...formManagers.getInputProps(
                                                `entries.${index}.email`
                                              )}
                                            />
                                          </td>
                                          <td className="px-6 py-4">
                                            <TextInput
                                              disabled={
                                                formManagers.getInputProps(
                                                  "company"
                                                )?.value
                                                  ? false
                                                  : true
                                              }
                                              className=" h-10 w-48 p-2"
                                              placeholder="Address"
                                              {...formManagers.getInputProps(
                                                `entries.${index}.address`
                                              )}
                                            />
                                          </td>

                                          <td>
                                            <button
                                              className={` px-3 py-2 rounded-lg capitalize ml-6 `}
                                              onClick={(e) =>
                                                formManagers.removeListItem(
                                                  "entries",
                                                  index
                                                )
                                              }
                                            >
                                              <FiTrash />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                              </tbody>
                            </table>

                            {
                              <div className="d-flex justify-content-end">
                                <button
                                  className={`px-3 py-2 mt-4 new-entry-btn`}
                                  onClick={() => addEntryManager()}
                                  type="button"
                                >
                                  + Add new entry
                                </button>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {(form.getInputProps("role")?.value === "admin" ||
              form.getInputProps("role")?.value === "manager") && (
              <div className="create-employee-block mt-16">
                <form onSubmit={formEmployees.onSubmit((values) => {})}>
                  <div className="px-5 ">
                    <div className="py-4 px-5 custom-rounded-dashboard custom-box-shadow-dashboard">
                      <div className="page-heading  pt-2 pb-2 mb-4 d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <img src={"images/dashboardIcon.svg"} />

                          <h2 className="page-main-heading-dashboard">
                            {" "}
                            Create employee{" "}
                          </h2>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex justify-content-between">
                            {form.getInputProps("role")?.value !==
                              "manager" && (
                              <Select
                                style={{
                                  marginRight: "1.5rem",
                                }}
                                placeholder="Please select company"
                                {...formEmployees.getInputProps(`company`)}
                                data={form.getInputProps("companies").value}
                              />
                            )}

                            <button
                              onClick={() => saveAllEmployees()}
                              // type="button"
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                border: "0.0625rem solid transparent",
                                background: "#40c057",
                                color: "#fff",
                                height: "32px",
                                padding: "0 10px",
                                borderRadius: "4.243px",
                              }}
                            >
                              {" "}
                              Save employees entries{" "}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="table-column-links">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Mobile Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Address
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
      Company
    </th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {formEmployees?.values?.entries?.length > 0 &&
                                formEmployees?.values?.entries?.map(
                                  (item: any, index) => {
                                    return (
                                      <tr
                                        key={item.key}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                      >
                                        <th
                                          scope="row"
                                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                          <TextInput
                                            //   label="Name"
                                            //   description="Input description"

                                            disabled={
                                              form.getInputProps("role")
                                                ?.value === "admin" &&
                                              formEmployees.getInputProps(
                                                "company"
                                              )?.value
                                                ? false
                                                : form.getInputProps("role")
                                                    ?.value === "manager"
                                                ? false
                                                : true
                                            }
                                            className=" h-10 w-48 p-2"
                                            placeholder="Name"
                                            {...formEmployees.getInputProps(
                                              `entries.${index}.userName`
                                            )}
                                          />
                                        </th>
                                        <td className="px-6 py-4">
                                          <TextInput
                                            //   label="Name"
                                            //   description="Input description"
                                            disabled={
                                              form.getInputProps("role")
                                                ?.value === "admin" &&
                                              formEmployees.getInputProps(
                                                "company"
                                              )?.value
                                                ? false
                                                : form.getInputProps("role")
                                                    ?.value === "manager"
                                                ? false
                                                : true
                                            }
                                            className=" h-10 w-48 p-2"
                                            placeholder="Mobile Number"
                                            {...formEmployees.getInputProps(
                                              `entries.${index}.mobileNumber`
                                            )}
                                          />
                                        </td>
                                        <td className="px-6 py-4">
                                          <TextInput
                                            //   label="Name"
                                            //   description="Input description"
                                            disabled={
                                              form.getInputProps("role")
                                                ?.value === "admin" &&
                                              formEmployees.getInputProps(
                                                "company"
                                              )?.value
                                                ? false
                                                : form.getInputProps("role")
                                                    ?.value === "manager"
                                                ? false
                                                : true
                                            }
                                            className="h-10 w-48 p-2"
                                            placeholder="Email"
                                            {...formEmployees.getInputProps(
                                              `entries.${index}.email`
                                            )}
                                          />
                                        </td>
                                        <td className="px-6 py-4">
                                          <TextInput
                                            //   label="Name"
                                            //   description="Input description"
                                            disabled={
                                              form.getInputProps("role")
                                                ?.value === "admin" &&
                                              formEmployees.getInputProps(
                                                "company"
                                              )?.value
                                                ? false
                                                : form.getInputProps("role")
                                                    ?.value === "manager"
                                                ? false
                                                : true
                                            }
                                            className=" h-10 w-48 p-2"
                                            placeholder="Address"
                                            {...formEmployees.getInputProps(
                                              `entries.${index}.address`
                                            )}
                                          />
                                        </td>

                                        <td>
                                          <button
                                            className={` px-3 py-2 rounded-lg capitalize ml-6 `}
                                            onClick={(e) =>
                                              formEmployees.removeListItem(
                                                "entries",
                                                index
                                              )
                                            }
                                          >
                                            <FiTrash />
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                            </tbody>
                          </table>

                          <div className="d-flex justify-content-end">
                            <button
                              className={`px-3 py-2 mt-4 new-entry-btn`}
                              onClick={() => addEntryEmployee()}
                              type="button"
                            >
                              + Add new entry
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {(form.getInputProps("role")?.value === "admin" ||
              form.getInputProps("role")?.value === "manager") && (
              <div className="employees-profile-block mt-16">
                <div className="create-employee-block">
                  <form onSubmit={form.onSubmit((values) => {})}>
                    <div className="px-5 ">
                      <div className="py-4 px-5 custom-rounded-dashboard custom-box-shadow-dashboard">
                        <div className="page-heading  pt-2 pb-2 mb-4">
                          <div className="custom-flexbox">
                            <div className="d-flex align-items-center ">
                              <img src={"images/dashboardIcon.svg"} />

                              <h2 className="page-main-heading-dashboard">
                                {" "}
                                Employees profile{" "}
                              </h2>
                            </div>

                            <div className="">
                              <button className="view-all-employees-btn">
                                View all
                              </button>
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="page-heading   pt-2 pb-2  twenty-percent">
<h2
className="page-main-heading mt-2 px-4"
>
{" "}
Employees profile{" "}
</h2>
</div> */}

                            <div className="home-page profile-table no-lift" style={{
                        
                            }} >
                              <MDBDataTable bordered small data={main} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

       {

   role === 'employee' &&  form.getInputProps('stepperFilled')?.value === false ?  <Master/> :   ''  

       }



  {


role === 'employee' &&  form.getInputProps('stepperFilled')?.value === true  && <HomeProfile/>
                      

  }


  

      
      </MantineProvider>
    </>
  );
}
