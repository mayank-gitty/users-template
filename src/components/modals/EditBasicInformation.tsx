"use client";

import * as React from "react";
export interface IAppProps {}

import {
  Container,
  FileInput,
  Image,
  Paper,
  Group,
  Textarea,
  Grid,
  Radio,
  Input,
  Select,
} from "@mantine/core";

import { useSession } from "next-auth/react";

export function EditBasicInformation({ form, updateBasicDetails }) {
  const { data: session } = useSession();

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalBasic"
        tabindex="-1"
        aria-labelledby="exampleModalSkills"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <Image
                    src="./images/profile.svg"
                    alt="Google"
                    style={{ width: "32px", height: "32px" }}
                  />

                  <h6> Basic Information </h6>
                </div>

                <div>
                  <img
                    id="closeAddBasic"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>

              <div class="modal-body basic">
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
                          label="Phone"
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
                            placeholder="Phone"
                            required
                            {...form.getInputProps("userPhone")}
                            onChange={(e) =>
                              form.setFieldValue("userPhone", e.target.value)
                            }
                            value={form.getInputProps("userPhone").value}
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
                          label="Email"
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
                            placeholder="Email"
                            required
                            onChange={(e) =>
                              form.setFieldValue("userEmail", e.target.value)
                            }
                            value={form.getInputProps("userEmail").value}
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
                          label="Address"
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
                            placeholder="Address"
                            required
                            onChange={(e) =>
                              form.setFieldValue("userAddress", e.target.value)
                            }
                            value={form.getInputProps("userAddress").value}
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
                          label="Company"
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
                          <Select
                            // label="Please select company"
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
                            onChange={(e) => {
                              // console.log("", e);
                              form.setFieldValue("userCompany", e);
                            }}
                            placeholder="Please select company"
                            value={form.getInputProps(`userCompany`)?.value}
                            data={form.getInputProps("companies").value}
                          />
                        </Input.Wrapper>
                      </Grid.Col>

                      {session?.user?.user.role !== "manager" && (
                        <>
                          <Grid.Col span={6}>
                            <Radio.Group
                              name="favoriteFramework1"
                              label="Status"
                              value={
                                form.getInputProps("statusForMutation")?.value
                              }
                              onChange={(e: any) => {
                                form.setFieldValue(`statusForMutation`, e);

                                // console.log("mmmm", e);
                              }}
                              // description="This is anonymous"

                              withAsterisk
                            >
                              <Group mt="xs">
                                <Radio value={"true"} label="Active" />
                                <Radio value={"false"} label="Not Active" />
                              </Group>
                            </Radio.Group>
                          </Grid.Col>

                          <Grid.Col span={6}>
                            <Radio.Group
                              name="favoriteFramework2"
                              label="Work Status"
                              value={
                                form.getInputProps("workForMutation")?.value
                              }
                              onChange={(e: any) => {
                                // console.log("e", e);

                                form.setFieldValue(`workForMutation`, e);
                              }}
                              // description="This is anonymous"
                              withAsterisk
                            >
                              <Group mt="xs">
                                <Radio value={"true"} label="Open to work" />
                                <Radio value={"false"} label="Engaged" />
                              </Group>
                            </Radio.Group>
                          </Grid.Col>
                        </>
                      )}
                    </Grid>
                  </form>
                </Paper>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="save-btn-modal-footer "
                  style={{
                    width: "100%",
                  }}
                  onClick={() => updateBasicDetails()}
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
