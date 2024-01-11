import * as React from "react";
import { Dropzone } from "@mantine/dropzone";

import useThemeContext from "@/context/context";

import { Container, FileInput, Image,Paper,Group } from "@mantine/core";

import { createStyles } from "@mantine/core";


export interface IAppProps {}

const useStyles = createStyles(() => ({
    inner: {
      width: "90%",
      margin: "auto",
    },
    ml: {
      marginRight: "0.3em",
    },
    bar: {
      background: "#FCA312",
      width: "438px",
      height: "201px",
    },
    barRoot: {
      // background:"yellow",
      width: "100%",
    },
    dropZoneRoot: {
      marginTop: "20px",
      width: "100%",
      height: "201px",
      border: "none",

      outlineWidth: "2px",

      outlineStyle: "dashed !important",
      outlineColor: "#C6C6C6 !important",
      background: "#FFF !important",


      cursor: "pointer",
      "&:hover": {
        // background: "red",
        // display:"none"
      },

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    step1: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    step1Content: {
      color: "rgba(0, 0, 0, 0.45)",
      textAlign: "center",
      // fontFamily: Inter;
      fontSize: "11px",
      fontWeight: 400,
      lineHeight: "16px",
      width: "70%",
      margin: "auto",
      marginBottom: "1rem",
    },
    progress: {},
    para: {
      /* H5/regular */
      marginTop: "0rem !important",
      fontFamily: "Roboto",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "24px",
    },
    marginTop: {
      marginTop: "1rem",
    },
    spaceBetween: {
      width: "20rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    image: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // width:"80%"
    },
    dragBar: {
      display: "flex",
      flexDirection: "column",
      transform: "translateX(-40px)",
      //  justifyContent:"start"
    },
    flex: {
      display: "flex",
      width: "8rem",
      // background:"red",
      justifyContent: "space-between",
    },
    imgUpload: {
      display: "flex",
      alignItems: "center",
      height: "2rem",
    },
    upload: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "96%",
      height: "80%",
      margin: "auto",
    },
    wrapper: {
      width: "161.934px",
      height: "43.816px",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      zIndex: 4,
      ".mantine-Input-icon": {
        marginLeft: "1rem",
      },
    },
    dragOverPara: {
      transform: "translateY(-38px)",
    },
    paraUpload: {
      color: "#000000",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 600,
    },
    icon: {
      padding: "0 1rem",
      img: {
        width: "200px",
        height: "200px",
      },
    },
    paraDrag: {
      color: "rgba(0, 0, 0, 0.85)",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "24px",
    },
    message: {
      color: "#000",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "24px",
    },
    input: {
      // background: "orange",
      ".mantine-Text-root": {
        paddingLeft: "1rem",
      },
      span: {
        paddingLeft: "1rem",
      },
    },
    rightSection: {},
    root: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    camera: {
      width: "200px",
      height: "200px",
    },
    label: {},
    error: {},
    description: {},
    required: {},
    placeholder: {
      color: "#4D47C3 !important",
      textAlign: "center",
      // font-family: Inter;
      fontSize: "10px",

      fontWeight: 400,
      lineHeight: "10px",
    },
  }));

export function AddResume({ inEditResume, addResume, handleFileUploadResume,form }  ) {

  const { formData }: any = useThemeContext();
  
  const { classes } = useStyles();

  return (
    <div>
      <div
        class="modal fade"
        id="addResume"
        tabindex="-1"
        aria-labelledby="addResume"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
                  <img className="experience-icon" src="images/education.svg" />

                  <h6> {inEditResume ? "" : "Add"} Resume </h6>
                </div>

                <div>
                  <img
                    id="closeAddResume"
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
                    <Group
                      position="center"
                      mt="xl"
                      style={{
                        position: "relative",
                      }}
                    >
                      <Container px="xs" className="">
                        <div className="">
                          <Paper
                            // shadow="xl"
                            // p="md"
                            style={{
                              width: "100%",

                              // padding:"16px"
                            }}
                          >
                            <h6 className="box-heading text-left">
                              {" "}
                              Upload resume{" "}
                            </h6>
                            <p className="box-sub-heading">
                              Insert a high-quality, professional headshot
                            </p>

                            <Dropzone
                              multiple
                              activateOnClick={false}
                              styles={{ inner: { pointerEvents: "all" } }}
    
                              maxSize={3 * 1024 ** 2}
                              classNames={{
                                inner: classes.inner,
                                root: classes.dropZoneRoot,
                              }}
                              accept={[
                                "image/png",
                                "image/jpeg",
                                "image/sgv+xml",
                                "image/gif",
                              ]}
                            >
                              <div>
                                <div>
                                  <div className={classes.step1}>
                                    <p className={classes.paraDrag}>
                                      {" "}
                                      Click or drag file to this area to upload{" "}
                                    </p>
                                    <p className={classes.step1Content}>
                                      {" "}
                                      Support for a single or bulk upload.
                                      Strictly prohibit from uploading company
                                      data or other band files{" "}
                                    </p>
                                  </div>

                                  <FileInput
                                    name="myImage"
                                    icon={
                        
                                      <Image
                                        alt=""
                                        src="assets/document.svg"
                                        width={20}
                                        height={20}
                                      />
                                    }
                                    onChange={(files) => {
                                      // customDrop(files);
                                      handleFileUploadResume(files);
                                    }}
                                    classNames={{
                                      wrapper: classes.wrapper,
                                      // icon: classes.icon,
                                      input: classes.input,
                                      rightSection: classes.rightSection,
                                      root: classes.root,
                                      // label: classes.label,
                                      error: classes.error,
                                      description: classes.description,
                                      required: classes.required,
                                      placeholder: classes.placeholder,
                                    }}
                                    placeholder={
                                      formData.resume ||
                                      form.getInputProps("resume")?.value
                                        ? inEditResume
                                          ? form
                                              .getInputProps("resume")
                                              ?.value?.slice(6, 28)
                                          : formData.resume.slice(6, 28)
                                        : "Upload file"
                                    }
                                  />
                                </div>
                              </div>
                            </Dropzone>
                          </Paper>
                        </div>
                      </Container>
                    </Group>
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
                  onClick={() => addResume()}
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
