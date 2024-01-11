// components/FileUpload.js
"use client";
import React from "react";
import useThemeContext from "@/context/context";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import { Container, Paper } from "@mantine/core";

import {
  createStyles,
  getStylesRef,
  rem,
  Table,
  px,
  Group,
  Progress,
  FileInput,
} from "@mantine/core";

import { toast } from 'react-toastify';

const useStyles = createStyles((theme, props: any) => ({
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
    width: "20rem",
  },
  dropZoneRoot: {
    width: "100%",
    height: "201px",
    border: "none",
    // backgroundPosition:  "0 0, 0 0, 100% 0, 0 100%",
    // backgroundSize: "3px 100%, 100% 3px, 3px 100% , 100% 3px",
    // backgroundRepeat: "no-repeat",
    // // borderRadius: "6px",
    // backgroundImage:"linear-gradient(to bottom, #000 10%, rgba(255, 255, 255, 0) 0%)",

    // backgroundPosition: "left",
    // backgroundSize: "3px 10px",
    // backgroundRepeat: "repeat-y",
    // border: "3px dashed #000",
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
    textOverflow: "ellipsis",
    ".mantine-Text-root": {
      paddingLeft: "1rem",
      textOverflow: "ellipsis"
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

const Resume = (props) => {
  const { setFormData, formData }: any = useThemeContext();

  const { classes } = useStyles(props);

  const handleFileUpload = async (e) => {
    const file = e;

    // Allowing file type
    var allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setFormData((prevData: any) => ({
        ...prevData,
        ["resume"]: ``,
      }));

      return toast("Invalid file type. Please upload a  PDF file.", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

    }

    // console.log("below");

    const resumeData = new FormData();
    resumeData.append("file", file);

    try {
      const response = await fetch("/api/upload2", {
        method: "POST",
        body: resumeData,
      });

      // console.log("res", response);

      if (response.ok) {
        console.log("File uploaded successfully.");

        setFormData((prevData) => ({
          ...prevData,
          ["resume"]: `files/${file.name}`,
        }));

        return toast("resume uploaded successfully", {
          className: "green-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });

      } else {
        // console.error("File upload failed.");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
      alert("please upload from your pc directory");
    }
  };

  return (
    <div>
      <Group position="center" mt="xl" className="d-flex flex-column">
        <Container size="xs" px="xs">
          <Paper
        
            p="md"
            style={{
              width: "30rem",
              padding:"0rem"
            }}
          >
            <h6 className="box-heading text-left"> Upload Resume </h6>
            <p className="box-sub-heading">
              {/* Specify key skills that your have strong command */}
            </p>

            <Dropzone
              multiple
              activateOnClick={false}
              styles={{ inner: { pointerEvents: "all" } }}
              onDragEnter={() => {
                props.setonFileInputHover(true);
                // console.log('kk')
              }}
              onDragLeave={() => {
                props.setonFileInputHover(false);
              }}
              // onDrop={(files: any) => customDrop(files)}
              // onReject={(files: any) => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              classNames={{
                inner: classes.inner,
                root: classes.dropZoneRoot,
              }}
              accept={["image/png", "image/jpeg", "image/sgv+xml", "image/gif"]}
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
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files{" "}
                    </p>
                  </div>

                  <FileInput
                    name="myImage"
                    icon={
                      // <img
                      //   className={classes.camera}
                      //   alt="camera"
                      //   src={"/assets/camera.svg"}
                      // />
                      <Image
                      alt=""
                      src="assets/document.svg"
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
                    placeholder={ formData.resume ? 
                       formData.resume.slice(6,28) : "Upload file"}
                  />
                </div>
              </div>
            </Dropzone>

      
          </Paper>
        </Container>
      </Group>
    </div>
  );
};

export default Resume;
