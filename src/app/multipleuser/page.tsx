//@ts-nocheck comment at the top of the file.
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Textarea,
  NumberInput,
  Select,
  Button,
  TextInput,
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
const ADD_MULTIPLE_USER = gql`
  mutation CreateMultipleUsers($data: [MultipleUserCreateInput!]!) {
    createMultipleUsers(data: $data) {
      email
      id
      mobilenumber
      name  
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
      entries: [
        {
          userName: "",
          mobileNumber: "",
          email: "",
          address: "",
          key: 0,
        },
      ],
      date: new Date(),
    },

    validate: {
      entries: {
        userName: (value) => (value ? null : "select userName"),
        mobileNumber: (value) => (value ? null : "select mobileNumber" ),
        email: (value) => (value ? null : "select email"),
        address: (value) => (value ? null : "add address"),
      },
    },
  });

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

  const saveAll = async () => {
      const Mutatedata = form.values.entries.map((item) => {
      return {
        name: item.userName,
        mobilenumber: item.mobileNumber,
        email: item.email,
        address: item.address,
      };
    });
    const user = await client.request(ADD_MULTIPLE_USER, {
         data: Mutatedata,
        });
    const validationErrors: FormErrors = {};

    // if (!form.values.date) {
    //   validationErrors.date = "Date is required";
    // }

    form.values.entries.forEach((entry, index) => {
      if (!entry.userName) {
        validationErrors[`entries.${index}.userName`] = "User Name is required";
      }
      if (!entry.mobileNumber) {
        validationErrors[`entries.${index}.mobileNumber`] = "Mobile Number is required";
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
      // ...

      // Redirect or perform other actions
      router.push('/multi_users_table');
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
                        UserName
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
