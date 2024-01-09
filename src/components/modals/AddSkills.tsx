import * as React from "react";



export interface IAppProps {}

import { Container, FileInput, Image,Paper,Group ,TextInput , Select , Grid, Textarea, MultiSelect ,Input } from "@mantine/core";

export function AddSkills({form, updateKeySkills , DefaultItSkills  ,DefaultKeySkills }) {
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalSkills"
        tabindex="-1"
        aria-labelledby="exampleModalSkills"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div className="custom-align">
                <img className="experience-icon" src="images/education.svg" />

                <h6> Skills </h6>
              </div>

              <div>
                <img
                  id="closeAddSkills"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  className="modal-close-icon"
                  src={"images/Close.svg"}
                />
              </div>
            </div>

            <div
              class="modal-body skills"
              style={{
                height: "300px !important",
              }}
            >
              <Paper
                p="md"
                // style={{
                //   width: "30rem",
                // }}
              >
                <form>
                  <Grid>
                    <Grid.Col span={12}>
                      <Input.Wrapper
                        label="key skills"
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
                        <MultiSelect
                          styles={(theme) => ({
                            input: {
                              // height: "50px",
                              padding: "6px 8px",
                            },
                            values: {
                              height: "100%",
                              bg: "red",
                            },

                            wrapper: {
                              height: "auto",
                              ".mantine-MultiSelect-value": {
                                background: "#FFFFFF",
                                boxShadow:
                                  "0px 0px 2px 0px rgba(0, 0, 0, 0.18)",
                                border: "1px solid #DCDCDC",
                                borderLeft: "5px solid #478FC3",
                                color: "#000",
                                // font-family: Inter;
                                fontSize: "12px",

                                fontWeight: 500,

                                padding: "14px 0px",
                                "::before": {
                                  content: '""',
                                },
                              },
                              ".mantine-MultiSelect-defaultValueLabel": {
                                paddingLeft: "6px",
                              },
                              ".mantine-CloseButton-root": {
                                // margin:"0 10px",
                                marginRight: "4px",
                                marginLeft: "18px",
                                background: "#2E3A59",
                                borderRadius: "50%",
                                height: "14px",
                                minHeight: "18px",
                                minWidth: "18px",

                                svg: {
                                  color: "#fff",
                                  height: "12px !important",
                                  width: "10px !important",
                                },
                              },
                            },
                            pill: {
                              color: "red",
                              background: "red",
                            },

                            leftIcon: {
                              marginRight: theme.spacing.md,
                            },
                          })}
                          // label="select skill"
                          placeholder="Select your Key skills"
                          searchable
                          maxSelectedValues={5}
                          onChange={(e) => form.setFieldValue("keyskills", e)}
                          value={form.getInputProps("keyskills")?.value}
                          data={DefaultKeySkills}
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                    <small
                      style={{
                        color: "grey",
                      }}
                    >
                      {" "}
                      maximum 5 allowed{" "}
                    </small>
                    <Grid.Col span={12}>
                      <Input.Wrapper
                        label="It skills"
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
                        <MultiSelect
                          placeholder="Select your It skills"
                          searchable
                          maxSelectedValues={5}
                          onChange={(e) =>
                            form.setFieldValue("itskillsForMutation", e)
                          }
                          value={
                            form.getInputProps("itskillsForMutation")?.value
                          }
                          data={DefaultItSkills}
                          styles={(theme) => ({
                            // ".mantine-MultiSelect-value mantine-u656bh":{
                            //    backgroundColor:"red !important"
                            // },
                            input: {
                              padding: "6px 8px",
                              ".mantine-MultiSelect-value": {
                                background: "#FFFFFF",
                                boxShadow:
                                  "0px 0px 2px 0px rgba(0, 0, 0, 0.18)",
                                border: "1px solid #DCDCDC",
                                borderLeft: "5px solid #478FC3",
                                color: "#000",
                                // font-family: Inter;
                                fontSize: "12px",

                                fontWeight: 500,

                                padding: "14px 0px",
                                "::before": {
                                  content: '""',
                                },
                              },
                              ".mantine-MultiSelect-defaultValueLabel": {
                                paddingLeft: "6px",
                              },
                              ".mantine-CloseButton-root": {
                                // margin:"0 10px",
                                marginRight: "4px",
                                marginLeft: "18px",
                                background: "#2E3A59",
                                borderRadius: "50%",
                                height: "14px",
                                minHeight: "18px",
                                minWidth: "18px",

                                svg: {
                                  color: "#fff",
                                  height: "12px !important",
                                  width: "10px !important",
                                },
                              },
                            },
                            values: {
                              height: "100%",
                              // color:"red",
                              // background:"red"
                            },
                            wrapper: {
                              // height: "50px",
                              // background:"red",
                              height: "auto",
                            },

                            leftIcon: {
                              marginRight: theme.spacing.md,
                              background: "red",
                            },
                            pill: {
                              background: "red",
                              color: "yellow",
                            },
                            option: {
                              background: "red",
                            },
                          })}
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Input.Wrapper
                        label="profile summary"
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
                          placeholder="Enter profile summary "
                          size="md"
                          value={
                            form.getInputProps("profile_summaryForMutation")
                              ?.value
                          }
                          minLength={10}
                          maxLength={1000}
                          styles={(theme) => ({
                            input: {
                              height: "125.324px",
                            },
                          })}
                          onChange={(e) =>
                            form.setFieldValue(
                              "profile_summaryForMutation",
                              e.target.value
                            )
                          }
                        />
                      </Input.Wrapper>
                    </Grid.Col>{" "}
                  </Grid>
                </form>

                <button
                  style={{
                    width: "100%",
                  }}
                  type="button"
                  class="save-btn-modal-footer mt-4"
                  onClick={() => updateKeySkills()}
                >
                  Save
                </button>
              </Paper>
            </div>

            <div class="modal-footer">
              {/* <button
                type="button"
                id="modal-close-btn"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                id="modal-close-btn-experience"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => updateKeySkills()}
              >
                Save 
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
