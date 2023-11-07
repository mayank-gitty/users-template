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
import { createMultipleUsers } from "../../utils/serverMutations";
import { useTransition } from "react";
import client from "../../../helpers/request";

// import { User_data } from "../context/context";

// Define mutation

const COMPANIES = gql`
  query Query {
    companies {
      name
      id
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
        mobileNumber: (value) => (value ? null : "select mobileNumber"),
        email: (value) => (value ? null : "select email"),
        address: (value) => (value ? null : "add address"),
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

    // setDefaultSkills(DefaultSkills);

    form.setFieldValue("companies", DefaultSkills);
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

  // const saveAll = async () => {

  //   const Mutatedata = form.values.entries.map((item) => {
  //     return {
  //       name: item.userName,
  //       mobilenumber: item.mobileNumber,
  //       email: item.email,
  //       address: item.address,
  //     };
  //   });

  //   console.log(Mutatedata);

  //   const user = await client.request(ADD_MULTIPLE_USER, {
  //     data: Mutatedata,
  //   });
  //   console.log(user);

  //   if (form.username === 'demo' && form.mobileNumber === 'password' && form.email === 'password' && form.address === 'password') {
  //     // Successful login, you can redirect or perform other actions here
  //     router.push('/multi_users_table')
  // } else {
  //     // Failed login, you can show an error message
  //     alert('Login failed. Please check your credentials.');
  // }
  // };

  function generateSecurePassword(length, username) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";

    const allChars =
      lowercaseChars + uppercaseChars + numberChars + specialChars;

    let password = "";
    for (let i = 0; i < length; i++) {
      const charSet = i % 4;
      switch (charSet) {
        case 0:
          password += lowercaseChars.charAt(
            Math.floor(Math.random() * lowercaseChars.length)
          );
          break;
        case 1:
          password += uppercaseChars.charAt(
            Math.floor(Math.random() * uppercaseChars.length)
          );
          break;
        case 2:
          password += numberChars.charAt(
            Math.floor(Math.random() * numberChars.length)
          );
          break;
        case 3:
          password += specialChars.charAt(
            Math.floor(Math.random() * specialChars.length)
          );
          break;
      }
    }

    return username + password;
  }

  // const password = generateSecurePassword(12); // Change the number to set the desired password length
  // console.log(password);

  // function generatePassword(length,username) {
  //   // const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

  //   // let password = "";
  //   // for (let i = 0; i < length; i++) {
  //   //   const randomIndex = Math.floor(Math.random() * charset.length);
  //   //   password += charset[randomIndex];
  //   // }

  //   return username + password;
  // }

  // const password = generatePassword(8); // Change the number to set the desired password length
  // console.log(password);

  function generateSecurePassword5(inputString, length, company) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";

    // Ensure the password length is at least as long as the input string
    if (length < inputString.length) {
      throw new Error(
        "Password length must be greater than or equal to the length of the input string."
      );
    }

    const remainingLength = length - inputString.length;
    const halfLength = Math.floor(remainingLength / 2);

    // Create a random portion with uppercase, numbers, and special characters
    let randomPart = "";
    for (let i = 0; i < 4; i++) {
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

    // Create the final password by combining the input string, underscores, and the random portion
    const underscores = "_".repeat(remainingLength - randomPart.length);
    const password = inputString + randomPart + "@" + company;

    return password;
  }

  // const inputString = "example"; // Replace with your desired input string
  // const passwordLength = 12; // Specify the desired password length
  // const password = generateSecurePassword(inputString, passwordLength);
  // console.log(password);

  function generateSecurePassword3(inputString) {
    // Define a set of special characters
    const specialChars = "!@#$%^&*()_-+=<>?";

    // Add a random number
    const randomNum = Math.floor(Math.random() * 10);

    // Add a random uppercase letter
    const randomUpper = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );

    // Select a random special character
    const randomSpecial = specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );

    // Concatenate all the elements to the input string
    const password =
      inputString + randomNum + randomUpper + "_" + randomSpecial;

    return password;
  }

  // const inputString = "example"; // Replace with your desired input string
  // const password = generateSecurePassword(inputString);
  // console.log(password);

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

  // const seedString = "YourSeedString"; // Replace with your own seed string
  // const password = generateSecurePassword(seedString, 12); // Change the number to set the desired password length
  // console.log(password);

  const saveAll = async () => {
    console.log("fv", form.values);

    const validationErrors: FormErrors = {};

    // if (!form.values.date) {
    //   validationErrors.date = "Date is required";
    // }

    form.values.entries.forEach((entry, index) => {
      if (!entry.userName) {
        validationErrors[`entries.${index}.userName`] = "User Name is required";
      }
      if (!entry.mobileNumber) {
        validationErrors[`entries.${index}.mobileNumber`] =
          "Mobile Number is required";
      }
      if (!entry.email) {
        validationErrors[`entries.${index}.email`] = "Email is required";
      }
      if (!entry.address) {
        validationErrors[`entries.${index}.address`] = "Address is required";
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit the data

      const Mutatedata = form.values.entries.map((item) => {
        return {
          name: item.userName,
          // role:['Admin'],
          // mobilenumber: item.mobileNumber,
          email: item.email,
          // address: item.address,
          company: {
            connect: {
              id: item.company,
            },
          },
          password: generateSecurePassword5(item.userName, 12, item.company),
        };
      });

      console.log("pw", Mutatedata);

      const user = await client.request(ADD_MULTIPLE_USER, {
        data: Mutatedata,
      });

      if (user.createUsers) {
        // Redirect or perform other actions
        router.push("/multi_users_table");
      }
    } else {
      // Form is invalid, show validation errors
      setFormErrors(validationErrors);
    }
  };
  const clickS = "bg-secondary text-white";
  const notClickS = "bg-gray-100 text-black";

  return (
    <>
      <form onSubmit={form.onSubmit((values) => {})}>
        <div className="px-5 py-6 bg-green-600">
          {/* Second Navbar */}
          <div className="p-5 bg-white drop-shadow-md rounded-xl">
            <div className="flex items-center justify-between">
              <h1
                className={`text-[#140F49] text-[1.2em] font-semibold ${manrope.style} `}
              >
                Add Multiple Users
              </h1>
              <div className="flex items-center gap-4 justify-center">
                <div className="relative"></div>

                <div className="relative">
                  <button
                    type="button"
                    className={`${clickS} px-3 py-2 rounded-lg capitalize mr-2`}
                    onClick={() => router.push("/")}
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => saveAll()}
                    type="submit"
                    className={`${clickS} px-3 py-2 rounded-lg capitalize bg-green-600`}
                  >
                    Save Users Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 bg-green-600">
          <div className="p-5 bg-white drop-shadow-md rounded-xl">
            <div className="mb-4">
              <div className="flex mx-5 my-4">
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
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                      <th scope="col" className="px-6 py-3">
                        Company
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-auto">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <TextInput
                          className="border border-gray-300 rounded-lg h-10 w-48 p-2"
                          placeholder="User Name"
                          {...form.getInputProps(`entries.${0}.userName`)}
                        />
                      </th>
                      <td className="px-6 py-4">
                        <TextInput
                          //   label="Name"
                          //   description="Input description"
                          className="border border-gray-300 rounded-lg h-10 w-48 p-2"
                          placeholder="Mobile Number"
                          {...form.getInputProps(`entries.${0}.mobileNumber`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <TextInput
                          //   label="Name"
                          //   description="Input description"
                          className="border border-gray-300 rounded-lg h-10 w-48 p-2"
                          placeholder="Email"
                          {...form.getInputProps(`entries.${0}.email`)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <TextInput
                          //   label="Name"
                          //   description="Input description"
                          className="border border-gray-300 rounded-lg h-10 w-48 p-2"
                          placeholder="Address"
                          {...form.getInputProps(`entries.${0}.address`)}
                        />
                      </td>
                      <td>
                        <Select
                          {...form.getInputProps(`entries.${0}.company`)}
                          placeholder="Please Select Company"
                          data={form.getInputProps("companies").value}
                        />
                      </td>
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
                                  className="border border-gray-300 rounded-lg h-10 w-48 p-2"
                                  placeholder="User Name"
                                  {...form.getInputProps(
                                    `entries.${index}.userName`
                                  )}
                                />
                              </th>
                              <td className="px-6 py-4">
                                <TextInput
                                  //   label="Name"
                                  //   description="Input description"
                                  className="border border-gray-300 rounded-lg h-10 w-48 p-2"
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

                                  className="border border-gray-300 rounded-lg h-10 w-48 p-2"
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
                                  className="border border-gray-300 rounded-lg h-10 w-48 p-2"
                                  placeholder="Address"
                                  {...form.getInputProps(
                                    `entries.${index}.address`
                                  )}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <Select
                                  // label="Please select company"
                                  placeholder="Please select company"
                                  {...form.getInputProps(
                                    `entries.${index}.company`
                                  )}
                                  data={form.getInputProps("companies").value}
                                />
                              </td>
                              <td>
                                <button
                                  className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6 bg-black`}
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

                {
                  <button
                    className={`${clickS} px-3 py-2 rounded-lg capitalize ml-6 mt-2 bg-green-700`}
                    onClick={() => addEntry()}
                    type="button"
                  >
                    Add Users Entry
                  </button>
                }
              </div>
            </div>
          </div>
        </div>

        {/* <ModalProject
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />  */}
      </form>
    </>
  );
};

export default AddTimeLine;
