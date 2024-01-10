import * as React from 'react';

export interface IAppProps {
}

import { Container, FileInput, Image,Paper,Group ,TextInput , Select , Grid , Checkbox  } from "@mantine/core";

import { yearsData , allDegreesArray ,  indianEducationArray ,fields , type , locationType , releventMonths } from '@/util/formDefault.Data';

export function EditExperience ({ experience, deleteSpecificExperience ,updateExperience ,handleChange }) {
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header ">
              <div className="custom-align">
                <div className="">
                  <img
                    className="experience-icon"
                    src="images/experience.svg"
                  />
                </div>

                <h6> Experience </h6>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div>
                <img
                  id="modal-close-btn-edit-experience"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>

              {/* <button
                type="button"
                id="modal-close-btn-experience"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
            </div>

            <div class="modal-body">
              <Grid>
                <Grid.Col span={12}>
                  <label htmlFor=" "> Title </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> Employment type </label>

                  <Select
                    value={experience.employment_type}
                    onChange={(value) => handleChange("employment_type", value)}
                    data={type}
                    placeholder="Select type"
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
                  <label htmlFor=" "> Company </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> Location </label>
                  <TextInput
                    placeholder="enter here"
                    size="md"
                    value={experience.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <label htmlFor=" "> Location type </label>
                  <Select
                    value={experience.location_type}
                    onChange={(value) => handleChange("location_type", value)}
                    data={locationType}
                    placeholder="Select type"
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
                    className="center-align"
                    checked={experience.currently_working ? true : false}
                    label="currently working here"
                    onChange={(e: any) =>
                      handleChange("currently_working", e.target.checked)
                    }
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <h6 className="experience-label">Start date</h6>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Month"
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    onChange={(e) => handleChange("start_year_month", e)}
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
                    <h6 className="experience-label">End date</h6>
                  </Grid.Col>
                )}

                {!experience.currently_working && (
                  <>
                    <Grid.Col span={6}>
                      <Select
                        placeholder="Month"
                        nothingFound="No options"
                        maxDropdownHeight={280}
                        onChange={(e) => handleChange("end_year_month", e)}
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
            </div>

            <div class="modal-footer">
              <button
                className="close-btn-modal-footer"
                onClick={() => deleteSpecificExperience()}
              >
                {" "}
                delete{" "}
              </button>
              {/* <button
                type="button"
                id="modal-close-btn-experience"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              <button
                type="button"
                class="save-btn-modal-footer"
                onClick={() => updateExperience()}
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
