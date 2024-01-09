import * as React from 'react';

export interface IAppProps {
}


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


  import { useRouter } from 'next/navigation';

  import { useSession } from "next-auth/react";
  
export function ResumeSection ({ form ,  setinEditResume }) {


    const router = useRouter()

    const  {  data: session }   = useSession()


  return (
    <div>
      

      <Stack
                  style={{
                    width: "100%",
                  }}
                >
                  {/* <div className="p-4 h-full xl:w-[420px] rounded "></div> */}
                  <div className="p-4 h-full rounded bg-white ">
                    <Group position="apart" className="border-b pb-[10px]">
                      <Group
                        position="left"
                        style={{
                          width: "100%",
                        }}
                      >
                        <div
                          className="d-flex justify-content-between"
                          style={{
                            width: "100%",
                          }}
                        >
                          <div className="d-flex">
                            <Image
                              src="./images/resume.svg"
                              alt="Google"
                              style={{ width: "24px", height: "24px" }}
                              onClick={() =>
                                router.push(
                                  `/edit_user?id=${session?.user?.user.id}`
                                )
                              }
                            />
                            <div className="text-black text-base font-semibold" style={{
                              marginLeft:"1rem"
                            }} >
                              Resume
                            </div>
                          </div>

                          {form.getInputProps("resume")?.value && (
                            <div className="">
                              <Image
                                onClick={() => {
                                  setinEditResume(true);
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
                                data-bs-target="#addResume"
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
                          )}
                        </div>
                      </Group>
                    </Group>

                    <Group
                      position="apart"
                      py={12}
                      style={{
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        <Stack
                          spacing={8}
                          style={{
                            width: "100%",
                          }}
                        >
                          <div className="text-indigo-950 text-sm font-bold d-flex align-items-center">
                            {form.getInputProps("resume")?.value ? (
                              <>
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
                                      `/edit_user?id=${session?.user.user.id
                                      }`
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
                              </>
                            ) : (
                              <div
                                className="empty-state-content d-flex align-items-center justify-content-center"
                                style={{
                                  height: "100%",
                                  width: "100%",
                                }}
                              >
                                <div className="">
                                  <span className="user-no-information-text">
                                    {" "}
                                    No Information here{" "}
                                  </span>

                                  <div className="d-flex align-items-center">
                                    <Image
                                      width={24}
                                      className="custom-align-image"
                                      data-bs-toggle="modal"
                                      data-bs-target="#addResume"
                                      alt="Google"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        // marginLeft: "10rem",
                                      }}
                                      src="./assets/addIcon.svg"
                                      alt="Google"
                                      style={{
                                        width: "24px",
                                        height: "32px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {}}
                                    />

                                    <span className="user-add-education-text">
                                      {" "}
                                      Add Resume{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-gray-600 text-xs font-normal"></div>
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
  );
}
