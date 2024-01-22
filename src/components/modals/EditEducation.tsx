import * as React from "react";

export interface IAppProps {}

import { useState } from "react";

import {
  Container,
  FileInput,
  Image,
  Paper,
  Group,
  TextInput,
  Select,
  Grid,
  Checkbox,
  Input,
  Autocomplete,
} from "@mantine/core";

import {
  yearsData,
  allDegreesArray,
  indianEducationArray,
  fields,
  type,
  locationType,
  releventMonths,
} from "@/util/formDefault.Data";

export function EditEducation({
  education,
  handleChangeEducation,
  updateExperienceEducation,
  deleteSpecificEducation,
}) {
  const [deleteFlag, setdeleteFlag] = useState(false);

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalEducation"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div class="modal-dialog  modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header ">
              <div className="custom-align">
                <div className="">
                  <img className="experience-icon" src="images/education.svg" />
                </div>

                <h6> Education </h6>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div>
                <img
                  onClick={() => setdeleteFlag(false)}
                  id="modal-close-btn-education"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>
            </div>

            <div class="modal-body">
              <Grid>
                <Grid.Col span={12}>
                  <Container size="xs" px="xs">
                    {/* <p className="box-sub-heading">Select your highest education</p> */}

                    {deleteFlag && (
                      <p>
                        {" "}
                        Are you sure , do you really want to delete this
                        experience{" "}
                      </p>
                    )}

                    {!deleteFlag && (
                      <form>
                        <Grid>
                          <Grid.Col span={12}>
                            <Input.Wrapper
                              styles={() => ({
                                label: {
                                  color: "#01041b",
                                  fontSize: "1.2em",
                                  fontWeight: 500,
                                  lineHeight: 1.2,
                                  marginBottom: 10,
                                },
                              })}
                            ></Input.Wrapper>
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="school,University,Institute"
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
                              <Autocomplete
                                styles={(theme) => ({
                                  input: {
                                    height: "100%",
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
                                value={education.school}
                                onChange={(value) =>
                                  handleChangeEducation("school", value)
                                }
                                data={indianEducationArray}
                                placeholder="University Institute"
                              />
                            </Input.Wrapper>
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="Course"
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
                              <Autocomplete
                                styles={(theme) => ({
                                  input: {
                                    height: "100%",
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
                                value={education.degree}
                                onChange={(value) =>
                                  handleChangeEducation("degree", value)
                                }
                                data={allDegreesArray}
                                placeholder="Course"
                              />

                              {/* {errors.course && (
<p style={{ color: "red", fontSize: "0.8em" }}>
{errors.course}
</p>
)} */}
                            </Input.Wrapper>
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="field of study"
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
                              <Autocomplete
                                value={education.field_of_study}
                                onChange={(value: any) =>
                                  handleChangeEducation("field_of_study", value)
                                }
                                data={fields}
                                placeholder="Field of study"
                                styles={(theme) => ({
                                  input: {
                                    height: "100%",
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
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <h6 className="experience-label">Start Date</h6>
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <Select
                              placeholder="Month"
                              nothingFound="No options"
                              maxDropdownHeight={280}
                              onChange={(e) =>
                                handleChangeEducation("start_year_month", e)
                              }
                              data={releventMonths}
                              value={education.start_year_month}
                              styles={(theme) => ({
                                input: {
                                  height: "100%",
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
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <Select
                              placeholder="Year"
                              nothingFound="No options"
                              maxDropdownHeight={280}
                              onChange={(e) =>
                                handleChangeEducation("start_year", e)
                              }
                              data={yearsData}
                              value={education.start_year}
                              styles={(theme) => ({
                                input: {
                                  height: "100%",
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
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <h6 className="experience-label">End Date</h6>
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <Select
                              placeholder="Month"
                              nothingFound="No options"
                              maxDropdownHeight={280}
                              onChange={(e) =>
                                handleChange("end_year_month", e)
                              }
                              data={releventMonths}
                              value={education.end_year_month}
                              styles={(theme) => ({
                                input: {
                                  height: "100%",
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
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <Select
                              placeholder="Year"
                              nothingFound="No options"
                              maxDropdownHeight={280}
                              onChange={(e) =>
                                handleChangeEducation("end_year", e)
                              }
                              data={yearsData}
                              value={education.end_year}
                              styles={(theme) => ({
                                input: {
                                  height: "100%",
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
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="Grade"
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
                              <Input
                                placeholder="grade"
                                required
                                onChange={(e) =>
                                  handleChangeEducation("grade", e.target.value)
                                }
                                value={education.grade}
                                styles={(theme) => ({
                                  input: {
                                    height: 50,
                                    width: "100%",
                                    fontSize: 16,
                                    lineHeight: 50,
                                    borderRadius: 8,
                                    border: "2px solid #ccc",
                                  },
                                })}
                              />
                            </Input.Wrapper>
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="Activities"
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
                              <Input
                                placeholder="activities"
                                required
                                value={education.activities}
                                onChange={(e) =>
                                  handleChangeEducation(
                                    "activities",
                                    e.target.value
                                  )
                                }
                                styles={(theme) => ({
                                  input: {
                                    height: 50,
                                    width: "100%",
                                    fontSize: 16,
                                    lineHeight: 50,
                                    borderRadius: 8,
                                    border: "2px solid #ccc",
                                  },
                                })}
                              />
                            </Input.Wrapper>
                          </Grid.Col>

                          <Grid.Col span={12}>
                            <Input.Wrapper
                              label="Description"
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
                              <Input
                                placeholder="description"
                                required
                                value={education.description}
                                onChange={(e) =>
                                  handleChangeEducation(
                                    "description",
                                    e.target.value
                                  )
                                }
                                styles={(theme) => ({
                                  input: {
                                    height: 50,
                                    width: "100%",
                                    fontSize: 16,
                                    lineHeight: 50,
                                    borderRadius: 8,
                                    border: "2px solid #ccc",
                                  },
                                })}
                              />
                            </Input.Wrapper>
                          </Grid.Col>

                          {/* Submit button */}
                        </Grid>
                      </form>
                    )}
                  </Container>
                </Grid.Col>
              </Grid>
            </div>

            <div class="modal-footer">
              {deleteFlag && (
                <button
                  className="delete-full-btn"
                  onClick={() => {
                    deleteSpecificEducation();
                  }}

                  // onClick={() => deleteSpecificExperience()}
                >
                  {" "}
                  delete{" "}
                </button>
              )}

              {!deleteFlag && (
                <>
                  <button
                    className="close-btn-modal-footer"
                    onClick={() => setdeleteFlag(true)}
                  >
                    {" "}
                    delete{" "}
                  </button>

                  <button
                    type="button"
                    class="save-btn-modal-footer"
                    onClick={() => updateExperienceEducation()}
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
