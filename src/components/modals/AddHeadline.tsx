import * as React from 'react';

export interface IAppProps {
}

import { IconHeading } from '@tabler/icons-react';
import { Container, FileInput, Image,Paper,Group,Grid,Input } from "@mantine/core";

export function AddHeadline ({form,addHeadline}:any) {
  return (
    <div>
         <div
        class="modal fade"
        id="addHeadline"
        tabindex="-1"
        aria-labelledby="addHeadline"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">

                <IconHeading/>

                  <h6> Add Headline </h6>
                </div>

                <div>
                  <img
                    id="closeAddHeadline"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>
              <div
                class="modal-body headline"
                style={{
                  height: "auto !important",
                }}
              >
                <Paper p="md">
                  <form>
                    <Grid>
                      {/* <h6 className="box-heading">Add Project</h6> */}
                      <Grid.Col span={12}>
                        <Input
                          placeholder="Headline"
                          required
                          value={
                            form.getInputProps("resume_headlineForMutation")
                              .value
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
                          onChange={(e) =>
                            form.setFieldValue(
                              "resume_headlineForMutation",
                              e.target.value
                            )
                          }
                        />
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
                  onClick={() => addHeadline()}
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
