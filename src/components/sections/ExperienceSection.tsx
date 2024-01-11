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

export function ExperienceSection({ form, setExperience }) {
  return (
    <div>
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

            {form.getInputProps("experience")?.value?.length > 0 && (
              <Image
                width={24}
                className="custom-align-image"
                data-bs-toggle="modal"
                data-bs-target="#addExperience"
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
          <Group
            position="apart"
            style={{
              width: "100%",
              height: "100%",
              // background:"red"
            }}
            py={12}
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
                {form.getInputProps("experience")?.value?.length > 0 ? (
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
                                marginBottom: "0.1rem",
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
                                  {item.end_year - item.start_year + "yrs"}{" "}
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
                                start_year_month: item.start_year_month,
                                end_year: item.end_year,
                                end_year_month: item.end_year_month,
                                currently_working: item.currently_working,
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

                      <div className="d-flex align-items-center">
                        <Image
                          width={24}
                          className="custom-align-image"
                          data-bs-toggle="modal"
                          data-bs-target="#addExperience"
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

                        <span className="user-add-education-text">
                          {" "}
                          Add Experience{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Stack>
            </div>
          </Group>
        </div>
      </Stack>
    </div>
  );
}
