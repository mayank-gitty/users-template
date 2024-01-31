import * as React from "react";

import { createStyles } from "@mantine/core";
import useThemeContext from "@/context/context";
import { Container, FileInput, Image, Paper, Group } from "@mantine/core";

import { Dropzone } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";

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

    // background:"red",

    // content:`"File Uploaded successfully"`,

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

export function AddPhotograph({
  inEditPhoto,
  addPhotoGraph,
  handleFileUpload,
  form,
  image,
}) {
  const { formData }: any = useThemeContext();

  const { classes } = useStyles();

  return (
    <div>
      <div
        class="modal fade"
        id="addPhotograph"
        tabindex="-1"
        aria-labelledby="closeAddPhotograph"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <div className="custom-align">
           
           <IconPhoto/>

                  <h6> {inEditPhoto ? "" : "Add"} Photograph </h6>
                </div>

                <div>
                  <img
                    id="closeAddPhotograph"
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
                              Upload profile photo{" "}
                            </h6>
                            <p className="box-sub-heading">
                              Insert a high-quality, professional headshot
                            </p>

                            <Dropzone
                              activateOnClick={false}
                              styles={{ inner: { pointerEvents: "all" } }}
                              onDragEnter={() => {
                                // setonFileInputHover(true);
                                console.log("kk");
                              }}
                              onDragLeave={() => {
                                // setonFileInputHover(false);
                                console.log("ma");
                              }}
                              onDrop={(files: any) =>
                                handleFileUpload(files[0])
                              }
                              // onReject={(files: any) => console.log("rejected files", files)}
                              maxSize={3 * 1024 ** 2}
                              classNames={{
                                inner: classes.inner,
                                root: classes.dropZoneRoot,
                              }}
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
                                      Support for a single upload. Strictly
                                      prohibit from uploading company data or
                                      other band files{" "}
                                    </p>
                                  </div>

                                  <FileInput
                                    name="myImage"
                                    icon={
                                      <Image
                                        alt=""
                                        src="assets/camera.svg"
                                        width={20}
                                        height={20}
                                      />
                                    }
                                    onChange={(files) => {
                                      // customDrop(files);
                                      handleFileUpload(files);
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
                                      image ||
                                      form
                                        .getInputProps("photograph")
                                        ?.value?.slice(0, 17)
                                        ? (
                                            image?.slice(0, 17) ||
                                            form.getInputProps("photograph")
                                              ?.value
                                          ).slice(0, 17)
                                        : "Upload Photo"
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
                  onClick={() => addPhotoGraph()}
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
