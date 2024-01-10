import * as React from 'react';

export interface IAppProps {
}


import { Container, FileInput, Image,Paper,Group ,TextInput , Select , Grid , Checkbox ,Input , Autocomplete , Radio , Textarea  } from "@mantine/core";

export function EditProject ({  project , updateThisProject  , deleteSpecificProject , handleChangeProject }  ) {
  return (
    <div>
            <div
        class="modal fade"
        id="exampleModalProject"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header ">
              <div className="custom-align">
                <div className="">
                  <img className="experience-icon" src="images/education.svg" />
                </div>

                <h6> Project </h6>
              </div>

              <button
                type="button"
                class="modal-close-btn-project"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div>
                <img
                  id="modal-close-btn-project"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>
            </div>

            <div class="modal-body">
              <Container size="xs" px="xs">
                <Paper
                // shadow="xl"
                // p="md"
                // style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                  <form>
                    <Grid>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project title"
                          // error={formErrors?.projectTitle}
                        >
                          <Input
                            placeholder="Project Title"
                            required
                            value={project.projectTitle}
                            styles={{
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            }}
                            onChange={(e) =>
                              handleChangeProject(
                                "projectTitle",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Client"
                          // error={formErrors?.client}
                        >
                          <Input
                            placeholder="Client"
                            required
                            value={project.client}
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
                            onChange={(e) =>
                              handleChangeProject("client", e.target.value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project status"
                          // error={formErrors?.projectStatus}
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              marginBottom: 10,
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
                              // error={formErrors?.workFromYear}
                            >
                              <Select
                                placeholder="Year"
                                data={["2022", "2023", "2024"]} // Your list of years
                                value={project.workFromYear}
                                styles={() => ({
                                  input: {
                                    width: "100%", // Adjust the width as needed
                                    padding: "10px", // Add padding for a consistent look
                                    borderRadius: "4px", // Add rounded corners
                                    border: "1px solid #ccc", // Add a border
                                    height: "50px",
                                    "::placeholder": {
                                      color: "#CACACA",
                                      // font-family: Inter;
                                      fontSize: "16px",
                                      fontWeight: 500,
                                    },
                                  },
                                })}
                                onChange={(value) =>
                                  handleChangeProject("workFromYear", value)
                                }
                              />
                            </Input.Wrapper>
                          </div>
                          <div style={{ flex: 1 }}>
                            <Input.Wrapper
                              label="Work from month"
                              // error={formErrors?.workFromMonth}
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
                                value={project.workFromMonth}
                                onChange={(value) =>
                                  handleChangeProject("workFromMonth", value)
                                }
                                styles={() => ({
                                  input: {
                                    width: "100%", // Adjust the width as needed
                                    padding: "10px", // Add padding for a consistent look
                                    borderRadius: "4px", // Add rounded corners
                                    border: "1px solid #ccc", // Add a border
                                    height: "50px",
                                    "::placeholder": {
                                      color: "#CACACA",
                                      // font-family: Inter;
                                      fontSize: "16px",
                                      fontWeight: 500,
                                    },
                                  },
                                })}
                              />
                            </Input.Wrapper>
                          </div>
                        </div>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Details of project"
                          // error={formErrors?.detailsOfProject}
                          // styles={() => ({
                          //   label: {
                          //     color: "#01041b",
                          //     fontSize: "1.2em",
                          //     fontWeight: 500,
                          //     lineHeight: 1.2,
                          //     marginBottom: 10,
                          //   },
                          // })}
                        >
                          <Textarea
                            placeholder="Type here..."
                            required
                            style={{
                              width: "100%", // Adjust the width as needed
                              // padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              // border: "1px solid #ccc", // Add a border
                            }}
                            value={project.detailsOfProject}
                            onChange={(e) =>
                              handleChangeProject(
                                "detailsOfProject",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project location"
                          // error={formErrors?.projectLocation}
                        >
                          <Input
                            placeholder="Type here.."
                            required
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
                            value={project.projectLocation}
                            onChange={(e) =>
                              handleChangeProject(
                                "projectLocation",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Project site"
                          // error={formErrors?.projectSite}
                          styles={() => ({
                            input: {
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                              height: "50px",
                              "::placeholder": {
                                color: "#CACACA",
                                // font-family: Inter;
                                fontSize: "16px",
                                fontWeight: 500,
                              },
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
                                label="Offsite"
                                required
                                checked={project.projectStatus === "onsite"}
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
                          // error={formErrors?.natureOfEmployment}
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              marginBottom: 10,
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
                        <Input.Wrapper
                          label="Team size"
                          // error={formErrors?.teamSize}
                        >
                          <Select
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
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
                            onChange={(value) =>
                              handleChangeProject("teamSize", value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Input.Wrapper label="Role">
                          <Select
                            styles={() => ({
                              input: {
                                width: "100%", // Adjust the width as needed
                                padding: "10px", // Add padding for a consistent look
                                borderRadius: "4px", // Add rounded corners
                                border: "1px solid #ccc", // Add a border
                                height: "50px",
                                "::placeholder": {
                                  color: "#CACACA",
                                  // font-family: Inter;
                                  fontSize: "16px",
                                  fontWeight: 500,
                                },
                              },
                            })}
                            placeholder="Role"
                            data={[
                              "java dev",
                              "reactJs dev",
                              "python dev",
                              "javascript dev",
                              "nextJs dev",
                            ]} // Your list of size
                            value={project.role}
                            onChange={(value) =>
                              handleChangeProject("role", value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper
                          label="Role description"
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              marginBottom: 10,
                            },
                          })}
                        >
                          <Textarea
                            placeholder="Role description"
                            required
                            styles={{
                              width: "100%", // Adjust the width as needed
                              padding: "10px", // Add padding for a consistent look
                              borderRadius: "4px", // Add rounded corners
                              border: "1px solid #ccc", // Add a border
                              height: "125.324px",
                              "::placeholder": {
                                color: "#CACACA",
                                // font-family: Inter;
                                fontSize: "16px",
                                fontWeight: 500,
                              },
                            }}
                            value={project.roleDescription}
                            onChange={(e) =>
                              handleChangeProject(
                                "roleDescription",
                                e.target.value
                              )
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col span={12}>
                        <Input.Wrapper label="Skills">
                          <Textarea
                            placeholder="Skills"
                            required
                            styles={() => ({
                              label: {
                                color: "#01041b",
                                fontSize: "1.2em",
                                fontWeight: 500,
                                lineHeight: 1.2,
                                marginBottom: 10,
                              },
                              "::placeholder": {
                                color: "#CACACA",
                                // font-family: Inter;
                                fontSize: "16px",
                                fontWeight: 500,
                              },
                            })}
                            value={project.skillUsed}
                            onChange={(e) =>
                              handleChangeProject("skillUsed", e.target.value)
                            }
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      <Grid.Col
                        span={12}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingTop: "10px",
                        }}
                      ></Grid.Col>
                    </Grid>
                  </form>
                </Paper>
              </Container>
            </div>

            <div class="modal-footer">
              <button
                className="close-btn-modal-footer"
                onClick={() => deleteSpecificProject()}
              >
                {" "}
                delete{" "}
              </button>

              <button
                type="button"
                class="save-btn-modal-footer"
                onClick={() => updateThisProject()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
