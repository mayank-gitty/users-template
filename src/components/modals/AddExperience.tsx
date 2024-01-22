import * as React from 'react';

export interface IAppProps {
}

import { Container, FileInput, Image,Paper,Group ,TextInput , Select , Grid , Checkbox  } from "@mantine/core";

import { yearsData , allDegreesArray ,  indianEducationArray ,fields , type ,releventMonths  , locationType } from '@/util/formDefault.Data'

export function AddExperience ({ experience , handleChange , addExperience }) {
  return (
    <div>
       <div
        class="modal fade"
        id="addExperience"
        tabindex="-1"
        aria-labelledby="addExperience"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <img className="experience-icon" src="images/education.svg" />

                  <h6> Add Experience </h6>
                </div>

                <div>
                  <img
                    id="closeAddExperience"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>
              <div class="modal-body">
                <Paper p="md">
                  {
                    <form>
                      <Grid>
                        <Grid.Col span={12}>
                          {/* <label htmlFor=" "> Title </label> */}
                          <TextInput
                            minLength={5}
                            maxLength={30}
                            id="experience-title"
                            // error={'jjj'}

                            placeholder="Title"
                            size="md"
                            value={experience.title}
                            onChange={(e) =>
                              handleChange("title", e.target.value)
                            }
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
                          {/* <label htmlFor=" "> Employment type </label> */}

                          <Select
                            // value={experience.experience}
                            value={experience.employment_type}
                            onChange={(value) =>
                              handleChange("employment_type", value)
                            }
                            data={type}
                            placeholder="Employment type"
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
                          {/* <label htmlFor=" "> Company name </label> */}
                          <TextInput
                            placeholder="Company name"
                            size="md"
                            minLength={5}
                            maxLength={30}
                            value={experience.company}
                            onChange={(e) =>
                              handleChange("company", e.target.value)
                            }
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
                          {/* <label htmlFor=" "> location </label> */}
                          <TextInput
                            placeholder="Location"
                            size="md"
                            value={experience.location}
                            onChange={(e) =>
                              handleChange("location", e.target.value)
                            }
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
                          {/* <label htmlFor=" "> Location type </label> */}
                          <Select
                            value={experience.location_type}
                            onChange={(value) =>
                              handleChange("location_type", value)
                            }
                            data={locationType}
                            placeholder="Location type"
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
                          <Checkbox
                            // style={{
                            //   justifyContent:"flex-start !important"
                            // }}
                            checked={
                              experience.currently_working ? true : false
                            }
                            label="I am currently working in this role"
                            onChange={(e: any) =>
                              handleChange(
                                "currently_working",
                                e.target.checked
                              )
                            }
                          />
                          {/* 
                    {experience.currentlyWorking ? "true" : "false"} */}
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
                              handleChange("start_year_month", e)
                            }
                            data={releventMonths}
                            value={experience.start_year_month}
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
                            onChange={(e) => handleChange("start_year", e)}
                            data={yearsData}
                            value={experience.start_year}
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

                        {!experience.currently_working && (
                          <Grid.Col span={12}>
                            <h6 className="experience-label">End Date</h6>
                          </Grid.Col>
                        )}

                        {!experience.currently_working && (
                          <>
                            <Grid.Col span={6}>
                              <Select
                                placeholder="Month"
                                nothingFound="No options"
                                maxDropdownHeight={280}
                                onChange={(e) =>
                                  handleChange("end_year_month", e)
                                }
                                data={releventMonths}
                                value={experience.end_year_month}
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
                                onChange={(e) => handleChange("end_year", e)}
                                data={yearsData}
                                value={experience.end_year}
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
                          </>
                        )}
                      </Grid>
                    </form>
                  }
                </Paper>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="save-btn-modal-footer"
                  style={{
                    width: "100%",
                  }}
                  onClick={() => addExperience()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
