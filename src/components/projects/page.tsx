import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Input,
  Paper,
  Select,
  Textarea,
  Radio
} from "@mantine/core";

import { toast } from "react-toastify";
import useThemeContext from "@/context/context";

const ProjectForm = () => {
  const { setFormData, formData, projectopen, setprojectOpen }: any =
    useThemeContext();

  const [flag, setFlag] = useState(true);

  const [editOpen, seteditopen] = useState("");

  const [project, setProject] = useState({
    projectTitle: "",
    client: "",
    projectStatus: "inprogress",
    workFromYear: "",
    workFromMonth: "",
    detailsOfProject: "",
    projectLocation: "",
    projectSite: "",
    natureOfEmployment: "fulltime",
    teamSize: "",
    role: "",
    roleDescription: "",
    skillUsed: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (fieldName, value) => {
    setProject({ ...project, [fieldName]: value });
  };

  const handleCancel = () => {
    setFormData({
      projectTitle: "",
      client: "",
      projectStatus: "inProgress",
      workFromYear: "",
      workFromMonth: "",
      detailsOfProject: "",
      projectLocation: "",
      projectSite: "",
      natureOfEmployment: "",
      teamSize: "",
      role: "",
      roleDescription: "",
      skillUsed: "",
    });
    setFormErrors({});
  };

  const formatExperience = (
    end_year: any,
    start_year: any,
    start_month: any,
    end_month: any
  ) => {
    const releventMonthsData = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ].map((item, index) => ({ label: item, value: index + 1 }));
  };

  const saveEntry = () => {
    console.log("g", project, formData);

    if (!project.projectTitle) {
      return toast("please add title", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (project.projectTitle.length < 5) {
      return toast("title should have 5 min characters ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.client) {
      return toast("please add project client", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (project.client.length < 3) {
      return toast("client should have minimum 3 characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.workFromYear) {
      return toast("please add work from year ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.workFromMonth) {
      return toast("please add work from month ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.detailsOfProject) {
      return toast("please add project details", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.projectLocation) {
      return toast("please add project location", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.projectSite) {
      return toast("please add projectSite", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.natureOfEmployment) {
      return toast("please add nature of employement", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!project.teamSize) {
      return toast("please add  teamSize", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!project.role) {
      return toast("please add  project role", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!project.roleDescription) {
      return toast("please add description role", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (project.roleDescription.length < 10) {
      return toast(" role description should have atleast 10 characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!project.roleDescription) {
      return toast("please add description role", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!project.skillUsed) {
      return toast("please add skill used", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (editOpen !== "") {
      // alert(editOpen);

      const changed = formData?.projects.map((item: any) => {
        if (item.id === editOpen) {
          (item.projectTitle = project.projectTitle),
            (item.client = project.client),
            (item.projectStatus = project.projectStatus),
            (item.workFromYear = project.workFromYear),
            (item.detailsOfProjec = project.detailsOfProject),
            (item.projectLocation = project.projectLocation),
            (item.projectSite = project.projectSite),
            (item.natureOfEmployment = project.natureOfEmployment),
            (item.teamSize = project.teamSize),
            (item.role = project.role),
            (item.roleDescription = project.roleDescription),
            (item.skillUsed = project.skillUsed);
        }

        return item;
      });

      console.log("ch", changed);

      setFormData((prevData: any) => ({
        ...prevData,
        ["projects"]: changed,
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        ["projects"]: [...formData.projects, project],
      }));
    }

    setProject({
      id: "id" + new Date().getTime(),
      projectTitle: "",
      client: "",
      projectStatus: "inprogress",
      workFromYear: "",
      workFromMonth: "",
      // detailsOfProject: "",
      projectLocation: "",
      projectSite: "Offsite",
      natureOfEmployment: "fulltime",
      teamSize: "",
      role: "",
      roleDescription: "",
      skillUsed: "",
    });

    setFlag(false);

    setprojectOpen(false);
  };

  const deleteExperience = (id: any) => {
    const filterExperiences = formData.projects.filter(
      (item: any) => item.id !== id
    );

    // console.log("d", filterExperiences);

    setFormData((prev: any) => ({
      ...prev,
      projects: filterExperiences,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const errors = {};
    // if (!formData.projectTitle) {
    //   errors.projectTitle = "Project Title is required";
    // }
    // if (!formData.client) {
    //   errors.client = "Client is required";
    // }
    // if (!formData.workFromYear) {
    //   errors.workFromYear = "Year is required";
    // }
    // if (!formData.workFromMonth) {
    //   errors.workFromMonth = "Month is required";

    // }
    // if (!formData.detailsOfProject) {
    //   errors.detailsOfProject = "Detail is required";
    // }
    // if (!formData.projectLocation) {
    //   errors.projectLocation = "Project LOcation is required";
    // }
    // if (!formData.teamSize) {
    //   errors.teamSize = "Team Size is required";
    // }
    // if (!formData.role) {
    //   errors.role = "Role is required";
    // }
    // if (!formData.roleDescription) {
    //   errors.roleDescription = "Role Description is required";
    // }
    // if (!formData.skillUsed) {
    //   errors.skillUsed = "Role Description is required";
    // }
    // if (Object.keys(errors).length === 0) {
    //   // Handle successful submission here (e.g., API request)
    //   setFormSubmitted(true);
    // } else {
    //   setFormErrors(errors);
    // }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "100%",
      }}
    >
      <Container size="xs" px="xs">
        <Paper
          // shadow="xl"
          p="md"
          style={{
            width: "30rem",
          }}
        >
          <div
            className=" mt-4"
            style={{
              position: "absolute",
              left: "12%",
            }}
          >
            <div className="heading">
              <h6 className="box-heading"> Add project </h6>
              <p className="box-sub-heading mb-8">
                Complete your project details
              </p>
            </div>

            <div className="">
              {formData?.projects?.length > 0 &&
                formData?.projects.map((item: any) => {
                  return (
                    <div className="d-flex">
                      <p className="box-sub-heading "> {item.projectTitle} </p>

                      <div className="mx-2">
                        {project.projectTitle === item.projectTitle ? (
                          <img
                            onClick={() => {
                              setFlag(false);
                              setprojectOpen(false);
                              seteditopen("");

                              setProject({
                                projectTitle: "",
                                client: "",
                                projectStatus: "inprogress",
                                workFromYear: "",
                                workFromMonth: "",
                                detailsOfProject: "",
                                projectLocation: "",
                                projectSite: "",
                                natureOfEmployment: "fulltime",
                                teamSize: "",
                                role: "",
                                roleDescription: "",
                                skillUsed: "",
                              });
                            }}
                            className="cursor"
                            src={"images/minus_circle.svg"}
                            alt=""
                          />
                        ) : (
                          <img
                            onClick={() => {
                              setFlag(false);
                              setprojectOpen(true);
                              seteditopen(item.id);

                              setProject({
                                projectTitle: item.projectTitle,
                                client: item.client,
                                projectStatus: item.projectStatus,
                                workFromYear: item.workFromYear,
                                workFromMonth: item.workFromMonth,
                                detailsOfProject: item.detailsOfProject,
                                projectLocation: item.projectLocation,
                                projectSite: item.projectSite,
                                natureOfEmployment: item.natureOfEmployment,
                                teamSize: item.teamSize,
                                role: item.role,
                                roleDescription: item.roleDescription,
                                skillUsed: item.skillUsed,
                              });
                            }}
                            className="cursor"
                            src={"images/addPlusIcon.svg"}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  );
                })}

              <div className="d-flex">
                <p className="box-sub-heading ">
                  {" "}
                  {formData?.projects?.length > 0
                    ? " Add another project"
                    : " Add project "}{" "}
                </p>{" "}
                <div className="mx-2">
                  {projectopen && !editOpen ? (
                    <img
                      onClick={() => {
                        setFlag(true);
                        setprojectOpen(false);
                        seteditopen("");

                        setProject({
                          projectTitle: "",
                          client: "",
                          projectStatus: "inprogress",
                          workFromYear: "",
                          workFromMonth: "",
                          detailsOfProject: "",
                          projectLocation: "",
                          projectSite: "",
                          natureOfEmployment: "fulltime",
                          teamSize: "",
                          role: "",
                          roleDescription: "",
                          skillUsed: "",
                        });
                      }}
                      className="cursor"
                      src={
                        // flag
                        //   ? "images/minus_circle.svg"
                        // flag
                        "images/minus_circle.svg"
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      onClick={() => {
                        setFlag(true);
                        setprojectOpen(true);
                        setProject({
                          projectTitle: "",
                          client: "",
                          projectStatus: "inprogress",
                          workFromYear: "",
                          workFromMonth: "",
                          detailsOfProject: "",
                          projectLocation: "",
                          projectSite: "",
                          natureOfEmployment: "fulltime",
                          teamSize: "",
                          role: "",
                          roleDescription: "",
                          skillUsed: "",
                        });

                        seteditopen("");
                      }}
                      className="cursor"
                      src={
                        "images/addPlusIcon.svg"
                        // : "images/addPlusIcon.svg"
                      }
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {projectopen && (
            <form>
              <Grid>
                {/* <h6 className="box-heading">Add Project</h6> */}
                <Grid.Col span={12}>
                  <Input
                    placeholder="Project title"
                    required
                    value={project.projectTitle}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
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
                      handleChange("projectTitle", e.target.value)
                    }
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input
                    placeholder="Client"
                    required
                    value={project.client}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
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
                    onChange={(e) => handleChange("client", e.target.value)}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Project status"
                    error={formErrors.projectStatus}
                    styles={() => ({
                      label: {
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal"
                      },
                    })}
                  >
                    <div>
                      <label style={{ marginRight: "10px" }}>
                        <Radio
                          type="radio"
                          name="projectStatus"
                          value="inprogress"
                          label="In Progress"
                          required
                          checked={project.projectStatus === "inprogress"}
                          onChange={() =>
                            handleChange("projectStatus", "inprogress")
                          }
                        />
                   
                      </label>
                      <label style={{ marginRight: "10px" }}>
                        <Radio
                          type="radio"
                          name="projectStatus"
                          value="finished"
                          label="Finished"
                          required
                          checked={project.projectStatus === "finished"}
                          onChange={() =>
                            handleChange("projectStatus", "finished")
                          }
                        />
            
                      </label>
                    </div>
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ flex: 1, marginRight: "10px" }}>
                      <Input.Wrapper
                        label="Work from year"
                        error={formErrors.workFromYear}
                        styles={() => ({
                          input:{
                            "::placeholder":{
                              color: "#9D9D9D",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "normal"
                            }
                          },
                          label: {
                            color: "#000",
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "normal"
                          },
                        })}

                      >
                        <Select
                          placeholder="Year"
                          data={["2022", "2023", "2024"]} // Your list of years
                          value={formData.workFromYear}
                          onChange={(value) =>
                            handleChange("workFromYear", value)
                          }
                          styles={(theme) => ({
                            input: {
                              height: "100%",
                              "::placeholder":{
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal"
                              }
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
                      </Input.Wrapper>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Input.Wrapper
                        label="Work from month"
                        error={formErrors.workFromMonth}
                        styles={() => ({
                          label: {
                            color: "#000",
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "normal"
                          },
                        })}
                      >
                        <Select
                          placeholder="Month"
                          data={[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ]} // Your list of months
                          value={formData.workFromMonth}
                          onChange={(value) =>
                            handleChange("workFromMonth", value)
                          }
                          styles={(theme) => ({
                            input: {
                              height: "100%",
                              "::placeholder":{
                                color: "#9D9D9D",
                                fontSize: "16px",
                                fontStyle: "normal",
                                fontWeight: 500,
                                lineHeight: "normal"
                              }
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
                      </Input.Wrapper>
                    </div>
                  </div>
                </Grid.Col>
                <Grid.Col span={12}>
                  {/* <Input.Wrapper
                    label="Details of project"
                    error={formErrors.detailsOfProject}
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
                  <Textarea
                    placeholder="Details of project"
                    required
                    styles={(theme) => ({


                      input:{

                        width: "100%", // Adjust the width as needed
                        padding: "10px", // Add padding for a consistent look
                        borderRadius: "4px", // Add rounded corners
                        border: "1px solid #ccc", // Add a border
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
                        
                      },
               

                    })}

                    value={project.detailsOfProject}
                    onChange={(e) =>
                      handleChange("detailsOfProject", e.target.value)
                    }
                  />
                  {/* </Input.Wrapper> */}
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input
                    placeholder="Project location"
                    required
                    value={project.projectLocation}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
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
                      handleChange("projectLocation", e.target.value)
                    }
                  />
                  {/* </Input.Wrapper> */}
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Project site"
                    error={formErrors.projectSite}
                    styles={() => ({
                      input:{
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
                      },
                      label: {
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal"
                      },
                    })}
                  >
                    <div>
                      <label style={{ marginRight: "10px" }}>
                        <Radio
                          type="radio"
                          name="projectSite"
                          value="Offsite"
                          label="Offsite"
                          required
                          checked={project.projectSite === "offsite"}
                          onChange={() =>
                            handleChange("projectSite", "offsite")
                          }
                        />
              
                      </label>
                      <label style={{ marginRight: "10px" }}>
                        <Radio
                          type="radio"
                          name="projectSite"
                          value="finished"
                          label="Onsite"
                          required
                          checked={project.projectSite === "onsite"}
                          onChange={() => handleChange("projectSite", "onsite")}
                        />
      
                      </label>
                    </div>
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Nature of employment"
                    error={formErrors.natureOfEmployment}
                    styles={() => ({
                      label: {
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal"
                      },
                    })}
                  >
                    <div>


                      <label style={{ marginRight: "10px" }}>
                        <Radio
                          type="radio"
                          name="natureOfEmployment"
                          value="fulltime"
                          label="Full Time"
                          required
                          checked={project.natureOfEmployment === "fulltime"}
                          onChange={() =>
                            handleChange("natureOfEmployment", "fulltime")
                          }
                        />
             
                      </label>

                      <label style={{ marginRight: "10px" }}>
                        <Radio
                          type="radio"
                          name="natureOfEmployment"
                          value="parttime"
                          label="Part Time"
                          required
                          checked={project.natureOfEmployment === "parttime"}
                          onChange={() =>
                            handleChange("natureOfEmployment", "parttime")
                          }
                        />
            
                      </label>


                      <label>
                        <Radio
                          type="radio"
                          name="natureOfEmployment"
                          value="contractual"
                          label="Contractual"
                          required
                          checked={project.natureOfEmployment === "contractual"}
                          onChange={() =>
                            handleChange("natureOfEmployment", "contractual")
                          }
                        />
          
                      </label>
                    </div>
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  {/* <Input.Wrapper label="Team size" error={formErrors.teamSize}> */}
                  <Select
                    placeholder="Select team size"
                    data={[
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                    ]} // Your list of size
                    value={project.teamSize}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
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
                    onChange={(value) => handleChange("teamSize", value)}
                  />
                  {/* </Input.Wrapper> */}
                </Grid.Col>
                <Grid.Col span={12}>
                  {/* <Input.Wrapper label="Role" error={formErrors.role}> */}
                  <Select
                    placeholder="Role"
                    data={[
                      "java dev",
                      "reactJs dev",
                      "python dev",
                      "javascript dev",
                      "nextJs dev",
                    
                 
                 
                    ]} // Your list of size
                    value={project.role}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
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
                    onChange={(value) => handleChange("role", value)}
                  />
                  {/* </Input.Wrapper> */}
                </Grid.Col>

                <Grid.Col span={12}>
                  {/* <Input.Wrapper
                    label="Role description"
                    error={formErrors.roleDescription}
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
                  <Textarea
                    placeholder="Role description"
                    required
                    styles={() => ({
                      input:{
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
                      },
                      label: {
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal"
                      },
                    })}
                    value={project.roleDescription}
                    onChange={(e) =>
                      handleChange("roleDescription", e.target.value)
                    }
                  />
                  {/* </Input.Wrapper> */}
                </Grid.Col>

                <Grid.Col span={12}>
                  {/* <Input.Wrapper
                    label="Skills used"
                    error={formErrors.roleDescription}
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
                  <Textarea
                    placeholder="Skills used"
                    required
                    styles={() => ({
                      input:{
                        "::placeholder":{
                          color: "#9D9D9D",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal"
                        }
                      },
                      label: {
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal"
                      },
                    })}
                    value={project.skillUsed}
                    onChange={(e) => handleChange("skillUsed", e.target.value)}
                  />
                  {/* </Input.Wrapper> */}
                </Grid.Col>

                <Grid.Col
                  span={12}
                  style={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    // paddingTop: "10px",
                  }}
                >
                  <Group position="right" mt="md">
                    <Button
                      onClick={() => saveEntry()}
                      type="button"
                      className="btn-info"
                      style={{
                        height:"50px",  
                        width:"100%"
                      }}
                    >
                      Save
                    </Button>
                  </Group>
                </Grid.Col>
              </Grid>
            </form>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default ProjectForm;
