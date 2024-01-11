import * as React from 'react';

export interface IAppProps {
}

import { Container, FileInput, Image,Paper,Group ,Textarea,Input ,Grid ,Radio ,Select } from "@mantine/core";

import useThemeContext from '@/context/context';

export function AddProject ({ form, project , handleChangeProject , addProject  }) {

const {formData} :any  = useThemeContext()

  return (
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
                          // error={formErrors.workFromYear}
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
                          // error={formErrors.workFromMonth}
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
                      // error={formErrors.projectSite}
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
                      // error={formErrors.natureOfEmployment}
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
                        "javascript dev",
                        "next dev",
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

  );
}
