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

export function ProjectSection({ form, setProject }) {
  return (
    <div>
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
              <div className="text-black text-base font-semibold">Projects</div>
            </Group>

            {form.getInputProps("project")?.value?.length > 0 && (
              <Image
                width={24}
                className="custom-align-image"
                data-bs-toggle="modal"
                data-bs-target="#addProject"
                src="./assets/addIcon.svg"
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
                      {form.getInputProps("project")?.value?.length > 0 ? (
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
                                    <span> {item.workFromMonth} - </span>{" "}
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
                                      location: {item.projectLocation}{" "}
                                    </span>{" "}
                                  </h6>
                                  <h6>
                                    {" "}
                                    <span>
                                      {" "}
                                      projectSite: {item.projectSite}{" "}
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
                                    role description: {
                                      item.roleDescription
                                    }{" "}
                                  </h6>
                                </div>

                                <div className="">
                                  <Image
                                    onClick={() => {
                                      setProject({
                                        id: item.id,
                                        projectTitle: item.projectTitle,
                                        client: item.client,
                                        projectStatus: item.projectStatus,
                                        workFromYear: item.workFromYear,
                                        workFromMonth: item.workFromMonth,
                                        detailsOfProject: item.detailsOfProject,
                                        projectLocation: item.projectLocation,
                                        projectSite: item.projectSite,
                                        natureOfEmployment:
                                          item.natureOfEmployment,
                                        teamSize: item.teamSize,
                                        role: item.role,
                                        roleDescription: item.roleDescription,
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
                                data-bs-target="#addProject"
                                src="./assets/addIcon.svg"
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

                              <span className="user-add-education-text">
                                {" "}
                                Add Project{" "}
                              </span>
                            </div>
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
