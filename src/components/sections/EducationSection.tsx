import * as React from "react";

export interface IAppProps {}

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

export function EducationSection({
  form,
  setExperience,
  setEducation,
  addHide,
  editHide,
}) {
  return (
    <div>
      <Stack>
        <div
          className="p-4 h-full rounded bg-white"
          style={{
            height: "310.897px",
            background: "pink",

            // background: "red",
          }}
        >
          <Group
            position="apart"
            className="border-b pb-[10px]"
            style={
              {
                // background: "pink",
                // background: "red",
              }
            }
          >
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


{

!addHide &&     
form.getInputProps("education")?.value?.length > 0 &&
  form.getInputProps("education")?.value?.length < 3 && (
    <Image
      src="/assets/addIcon.svg"
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
  )

}

        
              
            


          </Group>

          <Group
            position="apart"
            py={12}
            style={{
              width: "100%",
              height: "100%",
              // background:"red"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                // background:"red"
              }}
            >
              <Stack
                spacing={8}
                style={{
                  width: "100%",
                  height: "100%",
                  // background:"red",
                  transform: "translateY(-8px)",
                }}
              >
                <div className="text-indigo-950 text-sm font-bold">
                  {/* Highest Education */}
                  {/* {form.getInputProps("education")?.value?.length} */}
                </div>

                <div
                  className="text-custom-light"
                  style={{
                    width: "100%",
                    height: "100%",
                    // background:"red"
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      // background:"red"
                    }}
                  >
                    <Stack
                      spacing={8}
                      style={{
                        width: "100%",
                        height: "100%",
                        // background:"red"
                      }}
                    >
                      {form.getInputProps("education")?.value?.length > 0 ? (
                        form
                          .getInputProps("education")
                          ?.value.slice(0, 3)
                          .map((item: any) => {
                            return (
                              <div
                                className="d-flex justify-content-between"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  // background:"red"
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
                                      marginBottom: "0.1rem",
                                    }}
                                  >
                                    {" "}
                                    {item.degree} ,{" "}
                                    {/* <span> {item.employment_type} </span>{" "} */}
                                  </h6>

                                  <p
                                    style={{
                                      marginBottom: "0em",
                                    }}
                                  >
                                    {" "}
                                    <span> {item.start_year} - </span>{" "}
                                    <span> {item.end_year} </span> ,
                                    {item.end_year - item.start_year + "yrs"}{" "}
                                  </p>
                                </div>

                                {!editHide && (
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
                                      // marginLeft: "10rem",
                                    }}
                                    width={54}
                                  />
                                )}
                              </div>
                            );
                          })
                      ) : (
                        <div
                          className="empty-state-content d-flex align-items-center justify-content-center"
                          style={{
                            height: "100%",
                            // background:"red"
                          }}
                        >
                          <div className="">
                            <span className="user-no-information-text">
                              {" "}
                              No Information here{" "}
                            </span>

                            {!addHide && (
                              <div className="d-flex align-items-center">
                                <Image
                                  width={24}
                                  className="custom-align-image"
                                  src="./assets/addIcon.svg"
                                  alt="Google"
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

                                <span className="user-add-education-text">
                                  {" "}
                                  Add Education{" "}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Stack>
                  </div>
                </div>
              </Stack>
            </div>
          </Group>
        </div>
      </Stack>
    </div>
  );
}
