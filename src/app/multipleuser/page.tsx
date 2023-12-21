//@ts-nocheck comment at the top of the file.
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Textarea,
  NumberInput,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
// import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/Navbar";
import { randomId } from "@mantine/hooks";
import { Manrope } from "next/font/google";

import { toast, ToastContainer } from "react-toastify";

import { dropDown, projectsData } from "../../utils/data";
// import { useSession } from "next-auth/react";
import {
  FiChevronDown,
  FiChevronRight,
  FiTrash,
  FiCalendar,
} from "react-icons/fi";

// import LayoutNav from "../../components/LayoutNav";
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
const manrope = Manrope({ subsets: ["latin"] });
// import client from "../../apolloClient/index";
import { DateInput } from "@mantine/dates";
import {
  getProjectsTasks,
  getProjectType,
  getProjectManagerId,
  getReportingManagerId,
} from "../../utils/serverQueries";

import { GET_USER } from "@/util/queries";
import { createMultipleUsers } from "../../utils/serverMutations";
import { useTransition } from "react";
import client from "../../../helpers/request";
import { Console } from "console";

const COMPANIES = gql`
  query Query {
    companies {
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

const ADD_MULTIPLE_USER = gql`
  mutation Mutation($data: [UserCreateInput!]!) {
    createUsers(data: $data) {
      role
      password {
        isSet
      }
    }
  }
`;

const AddTimeLine = ({ AllProjects }: any) => {
  const router = useRouter();

  let [isPending, startTransition] = useTransition();

  //   const { data: session }: any = useSession();

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

  const form = useForm({
    initialValues: {
      userId: "",
      companies: [],
      entries: [
        {
          userName: "",
          mobileNumber: "",
          email: "",
          address: "",
          company: "",
          key: 0,
        },
      ],
      date: new Date(),
    },

    validate: {
      entries: {
        userName: (value) => (value ? null : "select userName"),
        mobileNumber: (value) => {
          if (!value) {
            return "please select number";
          }

          const mobileNumber = value;

          const check = form?.values?.entries.filter(
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

          const check = form?.values?.entries.filter(
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

  const getComapanies = async () => {
    const users: any = await client.request(COMPANIES);

    console.log("usersaa", users);

    const DefaultSkills = users?.companies?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    console.log("dsss", localStorage.getItem("company"), DefaultSkills);

    const managerCompany = DefaultSkills?.filter(
      (item) => item.label === localStorage.getItem("company")
    );

    console.log("mc", managerCompany);

    // setDefaultSkills(DefaultSkills);

    form.setFieldValue("companies", managerCompany);
  };

  const addEntry = () => {
    // console.log('form',form.values)

    // console.log("form", form.values);
    form.insertListItem("entries", {
      userName: "",
      mobileNumber: "",
      email: "",
      address: "",
      key: randomId(),
    });
  };

  useEffect(() => {
    getComapanies();
  }, []);

  function generateSecurePassword5(inputString, length, company) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";

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

    const password = inputString + randomPart + "@" + "cloud";

    return password;
  }

  function generatePasswordFromUsername(username) {
    // Function to shuffle an array randomly
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Convert the username into a password
    let password = username;

    // Add a random number
    password += Math.floor(Math.random() * 10);

    // Add a random uppercase letter
    password += String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Add a random lowercase letter
    password += String.fromCharCode(97 + Math.floor(Math.random() * 26));

    // Define a set of special characters
    const specialChars = "!@#$%^&*()_-+=<>?";

    // Add a random special character
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Convert the password string into an array for shuffling
    const passwordArray = password.split("");

    // Shuffle the characters randomly
    shuffleArray(passwordArray);

    // Convert the shuffled array back to a string
    password = passwordArray.join("");

    return password;
  }

  const username = "exampleUser"; // Replace with your username
  const password = generatePasswordFromUsername(username);
  console.log(password);

  function findDuplicateObjects(array, property) {
    console.log(array, property);
    const seen = {};
    const duplicates = [];

    array.forEach((item) => {
      const value = item[property];

      if (seen[value]) {
        duplicates.push(item);
      } else {
        seen[value] = true;
      }
    });

    return duplicates;
  }

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

  // Trigger the email sending

  const saveAll = async () => {
    // console.log("form enteries", form.values.entries);

    console.log("form com", form.getInputProps("companies"));

    if (form.validate().hasErrors) {
      console.log("yes", form.errors);
      return;
    } else {
      console.log("form valuess ", form.values);

      const users: any = await client.request(USERS);

      console.log("users", users);

      const checkDuplicatePhone = form.values.entries.map((item) => {
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

      const Mutatedata = form.values.entries.map(async (item) => {
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

      const MutatedataForSending = form.values.entries.map((item) => {
        return {
          name: item.userName,
          // role:['Admin'],
          // mobilenumber: item.mobileNumber,
          role: "employee",
          email: item.email,
          // address: item.address,
          company: {
            connect: {
              id: form.getInputProps("companies")?.value[0].value,
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
        const check = await sendEmails(MutatedataForSending);

        if (check) {
          toast("employees credentials sent", {
            className: "green-background",
            bodyClassName: "grow-font-size",
            progressClassName: "fancy-progress-bar",
          });
        }

        // Redirect or perform other actions
        setTimeout(() => {
          router.push("/multi_users_table");
        }, 1000);
      } else {
      }
    }
  };

  const clickS = "bg-secondary text-white";
  const notClickS = "bg-gray-100 text-black";

  return (
    <>
      {/*     
    <ToastContainer/> */}
      <form onSubmit={form.onSubmit((values) => {})}>
        <div className="px-5 py-6 ">
          <div className="page-heading text-custom-left  pt-2 pb-2">
            <h2 className="page-main-heading"> Create multiple employees </h2>
          </div>
        </div>

        <div className="px-5 py-6 ">
          <div className="p-5 bg-white  custom-rounded custom-box-shadow">
            <div className="">
              <div className="d-flex justify-content-end">
                <button
                  // variant="filled"
                  // color="green"
                  onClick={() => saveAll()}
                  type="button"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    border: "0.0625rem solid transparent",
                    background: "#40c057",
                    color: "#fff",
                    height:"32px",
                    padding:"0 10px",
                    borderRadius:"4.243px"
                  }}
                >
                  {" "}
                  Save employees entries{" "}
                </button>
              </div>
            </div>

            <div className="mb-4">
              {/* <div className="flex mx-5 my-4">
                <DateInput
                  {...form.getInputProps("date")}
                  styles={(theme) => ({
                    input: {
                      padding: "20px !important",
                      borderRadius: "12px !important",
                      width: "270px",
                    },
                  })}
                  placeholder="Date input"
                  label={
                    <div className="flex">
                      {" "}
                      <FiCalendar className="text-2xl" />{" "}
                      <h4 className="mx-2"> select date </h4>
                    </div>
                  }
                />
              </div> */}

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
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-auto">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <TextInput
                          className=" h-10 w-48 p-2"
                          placeholder="Name"
                          {...form.getInputProps(`entries.${0}.userName`)}
                        />
                      </th>
                      <td className="px-6 py-4">
                        <TextInput
                          //   label="Name"
                          //   description="Input description"
                          className=" h-10 w-48 p-2"
                          placeholder="Mobile Number"
                          {...form.getInputProps(`entries.${0}.mobileNumber`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <TextInput
                          //   label="Name"
                          //   description="Input description"
                          className=" h-10 w-48 p-2"
                          placeholder="Email"
                          {...form.getInputProps(`entries.${0}.email`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <TextInput
                          //   label="Name"
                          //   description="Input description"
                          className=" h-10 w-48 p-2"
                          placeholder="Address"
                          {...form.getInputProps(`entries.${0}.address`)}
                        />
                      </td>
                      {/* <td>
                        <Select
                          {...form.getInputProps(`entries.${0}.company`)}
                          placeholder="Please Select Company"
                          data={form.getInputProps("companies").value}
                        />
                      </td> */}
                    </tr>

                    {form.values.entries.length > 1 &&
                      form.values.entries.map((item: any, index) => {
                        if (item.key === 0) {
                        } else {
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
                                  className=" h-10 w-48 p-2"
                                  placeholder="Name"
                                  {...form.getInputProps(
                                    `entries.${index}.userName`
                                  )}
                                />
                              </th>
                              <td className="px-6 py-4">
                                <TextInput
                                  //   label="Name"
                                  //   description="Input description"
                                  className=" h-10 w-48 p-2"
                                  placeholder="Mobile Number"
                                  {...form.getInputProps(
                                    `entries.${index}.mobileNumber`
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <TextInput
                                  //   label="Name"
                                  //   description="Input description"

                                  className=" h-10 w-48 p-2"
                                  placeholder="Email"
                                  {...form.getInputProps(
                                    `entries.${index}.email`
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <TextInput
                                  //   label="Name"
                                  //   description="Input description"
                                  className=" h-10 w-48 p-2"
                                  placeholder="Address"
                                  {...form.getInputProps(
                                    `entries.${index}.address`
                                  )}
                                />
                              </td>
                              {/* <td className="px-6 py-4">
                                <Select
                                  // label="Please select company"
                                  placeholder="Please select company"
                                  {...form.getInputProps(
                                    `entries.${index}.company`
                                  )}
                                  data={form.getInputProps("companies").value}
                                />
                              </td> */}
                              <td>
                                <button
                                  className={`${clickS} px-3 py-2  ml-6`}
                                  onClick={(e) =>
                                    form.removeListItem("entries", index)
                                  }
                                >
                                  <FiTrash />
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>

                <div className="d-flex justify-content-end">
                  <button
                    className={`px-3 py-2 mt-4 new-entry-btn`}
                    onClick={() => addEntry()}
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
    </>
  );
};

export default AddTimeLine;
