import * as React from 'react';
export interface IAppProps {
}

import { Container, FileInput, Image,Paper,Group,Grid,Input ,Select} from "@mantine/core";
import { Autocomplete } from '@mantine/core';

import { yearsData , allDegreesArray ,  indianEducationArray ,fields , type } from '@/util/formDefault.Data';

export function AddEducation ({education,addEducation, handleChangeEducation}) {

  return (
    <div>
        <div
        class="modal fade"
        id="addEducation"
        tabindex="-1"
        aria-labelledby="addExperience"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <img className="experience-icon" src="images/education.svg" />

                  <h6> Add Education </h6>
                </div>

                <div>
                  <img
                    id="closeAddEducation"
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
                      <>
                        {/* <Grid.Col span={12}>
                        <Input.Wrapper
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        ></Input.Wrapper>
                      </Grid.Col> */}

                        <Grid.Col span={12}>
                          {/*                         
                        <Input.Wrapper
                          label="School,University,Institute"
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        > */}
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

                          {/* </Input.Wrapper> */}

                          {/* <p> {education.school} </p> */}
                        </Grid.Col>

                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
                          label="Course"
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        > */}
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
                          {/* </Input.Wrapper> */}
                        </Grid.Col>

                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
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
                        > */}
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

                            // styles={customStyles}
                          />

                          {/* </Input.Wrapper> */}
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
                              handleChangeEducation("end_year_month", e)
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
                          {/* <Input.Wrapper
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
                        > */}
                          <Input
                            placeholder="Grade"
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
                          {/* </Input.Wrapper> */}
                        </Grid.Col>
                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
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
                        > */}
                          <Input
                            placeholder="Activities"
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
                          {/* </Input.Wrapper> */}
                        </Grid.Col>

                        <Grid.Col span={12}>
                          {/* <Input.Wrapper
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
                        > */}
                          <Input
                            placeholder="Description"
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
                          {/* </Input.Wrapper> */}
                        </Grid.Col>
                      </>
                    </Grid>
                    <div
                      className="d-flex justify-content-end"
                      style={{
                        width: "100%",
                        marginTop: "1rem",
                        // background:"red"
                      }}
                    ></div>
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
                  onClick={() => addEducation()}
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
