import * as React from 'react';


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



export interface IAppProps {
}

export function UserBasicProfile ({form}) {
  return (
    <div>
          <div>
          <div className="p-4 h-full rounded bg-white">
                <Group position="apart" className="border-b pb-[10px]">
                  <Group position="left">
                    <Image
                      src="./images/profile.svg"
                      alt="Google"
                      style={{ width: "32px", height: "32px" }}
                    />
                    <div className="text-black text-base font-semibold">
                      Basic Information
                    </div>
                  </Group>
                  <Image
                    onClick={() => {
                      // setExperience({
                      //   title: item.title,
                      //   employment_type: item.employment_type,
                      //   company: item.company,
                      //   location: item.location,
                      //   location_type: item.location_type,
                      //   start_year: item.start_year,
                      //   start_year_month: item.start_year_month,
                      //   end_year: item.end_year,
                      //   end_year_month: item.end_year_month,
                      //   currently_working: item.currently_working,
                      //   id: item.id,
                      // });
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalBasic"
                    // data-toggle="modal"
                    // data-target="#exampleModalLong"
                    src="./images/Edit.svg"
                    alt="Google"
                    style={{
                      width: "24px",
                      height: "32px",
                      // marginLeft: "10rem",
                    }}
                  />
                </Group>
                <Group position="apart" py={12}>
                  <div>
                    <Stack>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Phone:
                      </div>
                    </Stack>
                    <Stack>
                      <div className="text-black text-base font-semibold">
                        {form.getInputProps("phone").value}
                      </div>
                    </Stack>
                  </div>
                  <div>
                    <Stack>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Email:
                      </div>
                    </Stack>
                    <Stack>
                      <div className="text-black text-base font-semibold">
                        {form.getInputProps("email").value}
                      </div>
                    </Stack>
                  </div>

                  <div>
                    <Stack>
                      <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                        Address:
                      </div>
                    </Stack>
                    <Stack>
                      <div className="text-black text-base font-semibold">

                      <Text w={200} truncate="end">
                      {form.getInputProps("address").value}
                                              </Text>

  

                      </div>
                    </Stack>
                  </div>
                  {
                    <div>
                      <Stack>
                        <div className="text-blue-950 text-opacity-50 text-xs font-medium">
                          company
                        </div>
                      </Stack>
                      <Stack>
                        <div className="text-black text-base font-semibold">
                          {form.getInputProps("company")?.value}
                        </div>
                      </Stack>
                    </div>
                  }
                </Group>
                <Group position="left" mt={"3%"}>
                  <p style={{ alignItems: "center", justifyContent: "center" }}>
                    {form.getInputProps("status").value ? (
                      <span className="px-4 py-2 bg-emerald-100 rounded-sm text-green-600 text-xs font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-rose-100 rounded-sm text-red-600 text-xs font-medium">
                        Inactive
                      </span>
                    )}
                  </p>
                  <p className="work">
                    {form.getInputProps("work").value ? (
                      <span className="px-4 py-2 bg-violet-100 rounded-sm text-indigo-500 text-xs font-medium">
                        Open to Work
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-rose-100 rounded-sm text-red-700 text-xs font-medium">
                        Engaged
                      </span>
                    )}
                  </p>
                </Group>
              </div>
    </div>
    </div>
  );
}
