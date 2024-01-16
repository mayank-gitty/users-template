import * as React from "react";

export interface IAppProps {}

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

export function ProfileSection({ form, setinEditPhoto, editHide, addHide }) {
  return (
    <div>
      <div className="flex items-center justify-center flex-col bg-white">
        <div
          style={{
            width: "242.215px",
            height: "138.913px",
            borderRadius: "7px",
          }}
        >
          {form.getInputProps("photograph")?.value ? (
            <div
              style={{
                position: "relative",
              }}
            >

{


!editHide &&    <Image
width={24}
className="custom-align-image"
data-bs-toggle="modal"
data-bs-target="#addPhotograph"
alt="Google"
style={{
  width: "24px",
  height: "24px",
  // marginLeft: "10rem",
}}
src="/images/Edit.svg"
alt="Google"
style={{
  width: "24px",
  height: "32px",
  cursor: "pointer",
  position: "absolute",
  right: 0,
}}
onClick={() => {
  setinEditPhoto(true);
}}
/>

}

           

              <img
                src={form.getInputProps("photograph").value}
                alt="User Photograph"
                style={{
                  width: "100%",
                  height: "144.913px",
                }}
              />
            </div>
          ) : (
            <div
              className="empty-state-content d-flex align-items-center justify-content-center"
              style={{
                height: "100%",
                // background:"red"
              }}
            >
              <div className="">
                {/* <span  className="user-no-information-text" >  No Information here   </span> */}

                {!addHide && (
                  <div className="d-flex align-items-center">
                    <Image
                      width={24}
                      className="custom-align-image"
                      data-bs-toggle="modal"
                      data-bs-target="#addPhotograph"
                      alt="Google"
                      style={{
                        width: "24px",
                        height: "24px",
                        // marginLeft: "10rem",
                      }}
                      src="./assets/addIcon.svg"
                      alt="Google"
                      style={{
                        width: "24px",
                        height: "32px",
                        cursor: "pointer",
                      }}
                      onClick={() => {}}
                    />

                    <span className="user-add-education-text"> Add Photo </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <div className="text-black text-[28px] font-semibold pt-3 flex items-center justify-center">
            {form.getInputProps("name")?.value}
          </div>
          <div
            className="text-[#ABABAB] text-base font-medium flex items-center justify-center"
            style={{
              width: "100%",
            }}
          >
            {form.getInputProps("resume_headline").value ? (
              <>
                {form.getInputProps("resume_headline").value}


{

!editHide &&      <Image
width={24}
className="custom-align-image headline-edit-icon"
data-bs-toggle="modal"
data-bs-target="#addHeadline"
alt="Google"
src="/images/Edit.svg"
alt="Google"
style={{
  width: "24px",
  height: "32px",
  cursor: "pointer",
}}
onClick={() => {
  // setExperience({
  //   id: "",
  //   title: "",
  //   employment_type: "",
  //   company: "",
  //   location: "",
  //   location_type: "",
  //   start_year: "",
  //   start_year_month: "",
  //   end_year: "",
  //   currently_working: false,
  //   end_year_month: "",
  // });
}}
/>



}


            

              </>
            ) : (
              <div
                className="empty-state-content d-flex align-items-center justify-content-center"
                style={{
                  height: "100%",
                  // background:"red"
                }}
              >
                <div className="">
                  {!addHide && (
                    <div className="d-flex align-items-center">
                      <Image
                        width={24}
                        className="custom-align-image"
                        data-bs-toggle="modal"
                        data-bs-target="#addHeadline"
                        alt="Google"
                        style={{
                          width: "24px",
                          height: "24px",
                          // marginLeft: "10rem",
                        }}
                        src="./assets/addIcon.svg"
                        alt="Google"
                        style={{
                          width: "24px",
                          height: "32px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          // setExperience({
                          //   id: "",
                          //   title: "",
                          //   employment_type: "",
                          //   company: "",
                          //   location: "",
                          //   location_type: "",
                          //   start_year: "",
                          //   start_year_month: "",
                          //   end_year: "",
                          //   currently_working: false,
                          //   end_year_month: "",
                          // });
                        }}
                      />

                      <span className="user-add-education-text">
                        {" "}
                        Add headline{" "}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="text-[#797878] text-xs font-medium flex items-center justify-center profile-summary-box">
            {form.getInputProps("profile_summary").value}
          </div>
        </div>

        <Group
          spacing={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1em",
            marginTop: "1em",

            // background:"red",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              // background:"blue",
              // width:"100%"
            }}
          >
            <div className="d-flex">
              <Image
                src="./images/Icon-Skill.svg"
                alt="Google"
                style={{ width: "28px", height: "28px" }}
              />
              <div className="text-black text-base font-semibold ml-1">
                Skills
              </div>
            </div>

            {form.getInputProps("userkeyskills")?.value.length !== 0 && (



              <div className="">

{

!editHide &&  
<Image
  data-bs-toggle="modal"
  data-bs-target="#exampleModalSkills"
  src="./images/Edit.svg"
  alt="Google"
  style={{ width: "24px", height: "24px" }}
/>

}





              </div>


            )}
          </div>

          <Group></Group>
        </Group>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            height: "8rem",
            // background:"yellow"
          }}
        >
          {form.getInputProps("userkeyskills")?.value.length !== 0 ? (
            form.getInputProps("userkeyskills")?.value?.map((item: any) => {
              return (
                <div className="w-28 flex border m-1 skill-chip">
                  <div className="bg-[#5847C3] w-3 flex items-start justify-start"></div>
                  <div className="px-2  text-black text-base font-semibold chip-inside">
                    {item}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="empty-state-content d-flex align-items-center justify-content-center"
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <div className="">
                <span className="user-no-information-text">
                  {" "}
                  No Information here{" "}
                </span>

                {!addHide && (
                  <div className="d-flex align-items-center">
                    <Image
                      className="custom-align-image"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalSkills"
                      src="./assets/addIcon.svg"
                      alt="Google"
                      style={{ width: "24px", height: "24px" }}
                    />

                    <span className="user-add-education-text">
                      {" "}
                      Add Information{" "}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
