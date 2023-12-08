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
} from "@mantine/core";

import { toast } from "react-toastify";
import useThemeContext from "@/context/context";

const ProjectForm = () => {
  const { setFormData, formData }: any = useThemeContext();

  const [flag, setFlag] = useState(true);

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
      return toast("description should have atleast 10 characters", {
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

    // if (experience.start_year && experience.end_year) {
    //   if (experience.end_year < experience.start_year) {
    //     return toast(
    //       "invalid duration, end year can not be smaller than start year",
    //       {
    //         className: "black-background",
    //         bodyClassName: "grow-font-size",

    //         progressClassName: "fancy-progress-bar",
    //       }
    //     );
    //   }

    //   if (experience.end_year === experience.start_year) {
    //     const releventMonths = [
    //       "January",
    //       "February",
    //       "March",
    //       "April",
    //       "May",
    //       "June",
    //       "July",
    //       "August",
    //       "September",
    //       "October",
    //       "November",
    //       "December",
    //     ].map((item, index) => ({ label: item, value: index + 1 }));

    //     const startMonthNumber = releventMonths.filter(
    //       (item) => item.label === experience.start_year_month
    //     )[0].value;

    //     const endMonthNumber = releventMonths.filter(
    //       (item) => item.label === experience.end_year_month
    //     )[0].value;

    //     console.log("190", startMonthNumber, endMonthNumber);

    //     if (experience.start_year_month === experience.end_year_month) {
    //       return toast(
    //         "invalid duration, start date can not be equal to end date",
    //         {
    //           className: "black-background",
    //           bodyClassName: "grow-font-size",
    //           progressClassName: "fancy-progress-bar",
    //         }
    //       );
    //     }
    //     if (endMonthNumber < startMonthNumber) {
    //       return toast(
    //         "invalid duration, end date can not be small then start date",
    //         {
    //           className: "black-background",
    //           bodyClassName: "grow-font-size",
    //           progressClassName: "fancy-progress-bar",
    //         }
    //       );
    //     }
    //   }
    // }

    setFormData((prevData: any) => ({
      ...prevData,
      ["projects"]: [...formData.projects, project],
    }));

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
      {formData?.projects?.length > 0 && (
        <div className="translateLeftEducation">
          {" "}
          <div className="mb-2 font-700">
            {formData.projects.length > 0 ? (
              <span className="mb-2"> total </span>
            ) : (
              ""
            )}
            {formData.projects.length > 0 &&
              formData.projects.length + " projects"}{" "}
          </div>
          {formData.projects.length > 0 &&
            formData.projects.map((item: any) => {
              return (
                <div className="experience-item text-indigo-950 text-sm font-bold">
                  <div
                    className="
        before"
                  >
                    .
                  </div>
                  <div className="text-indigo-950 text-sm font-bold">
                    <span className="delete-experience">
                      {" "}
                      <img
                        style={{
                          width: "24px",
                          cursor: "pointer",
                        }}
                        src={"assets/bin.png"}
                        onClick={() => deleteExperience(item.id)}
                      />
                    </span>
                    <h6> project: {item.projectTitle} </h6>
                    <h6> role: {item.role} </h6>
                    <h6
                      style={{
                        fontWeight: "400",
                      }}
                    >
                      {" "}
                      client: {item.client} ,{" "}
                      {/* <span> {item.employment_type} </span>{" "} */}
                    </h6>

                    <h6
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      {" "}
                      <span> {item.workFromMonth} - </span>{" "}
                      <span> {item.workFromYear} </span> ,
                    </h6>

                    <h6>
                      {" "}
                      <span> status: {item.projectStatus} </span>{" "}
                    </h6>

                    <h6>
                      {" "}
                      <span> location: {item.projectLocation} </span>{" "}
                    </h6>
                    <h6>
                      {" "}
                      <span> projectSite: {item.projectSite} </span>{" "}
                    </h6>
                    <h6>
                      {" "}
                      <span>
                        {" "}
                        natureOfEmployment: {item.natureOfEmployment}{" "}
                      </span>{" "}
                    </h6>

                    <h6>
                      {" "}
                      <span> teamSize: {item.teamSize} </span>{" "}
                    </h6>
                    <h6>
                      {" "}
                      <span> skillUsed: {item.skillUsed} </span>{" "}
                    </h6>

                    <h6>
                      {" "}
                      <span>
                        {" "}
                        details of project: {item.detailsOfProject}{" "}
                      </span>{" "}
                    </h6>

                    <h6> role description: {item.roleDescription} </h6>
                  </div>
                </div>
              );
            })}{" "}
        </div>
      )}

      <Container size="xs" px="xs">
        <Paper
          shadow="xl"
          p="md"
          style={{
            width: "30rem",
          }}
        >
          <h6 className="box-heading">Add Project</h6>

          {flag && (
            <form>
              <Grid>
                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Project title"
                    error={formErrors.projectTitle}
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
                      placeholder="Project title"
                      required
                      value={formData.projectTitle}
                      onChange={(e) =>
                        handleChange("projectTitle", e.target.value)
                      }
                    />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Client"
                    error={formErrors.client}
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
                      placeholder="Client"
                      required
                      value={project.client}
                      onChange={(e) => handleChange("client", e.target.value)}
                    />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Project status"
                    error={formErrors.projectStatus}
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
                    <div>
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name="projectStatus"
                          value="inprogress"
                          required
                          checked={project.projectStatus === "inprogress"}
                          onChange={() =>
                            handleChange("projectStatus", "inprogress")
                          }
                        />
                        In Progress
                      </label>
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name="projectStatus"
                          value="finished"
                          required
                          checked={project.projectStatus === "finished"}
                          onChange={() =>
                            handleChange("projectStatus", "finished")
                          }
                        />
                        Finished
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
                      >
                        <Select
                          placeholder="Year"
                          data={["2022", "2023", "2024"]} // Your list of years
                          value={formData.workFromYear}
                          onChange={(value) =>
                            handleChange("workFromYear", value)
                          }
                        />
                      </Input.Wrapper>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Input.Wrapper
                        label="Work from month"
                        error={formErrors.workFromMonth}
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
                        />
                      </Input.Wrapper>
                    </div>
                  </div>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input.Wrapper
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
                  >
                    <textarea
                      placeholder="Type here..."
                      required
                      style={{
                        width: "100%", // Adjust the width as needed
                        padding: "10px", // Add padding for a consistent look
                        borderRadius: "4px", // Add rounded corners
                        border: "1px solid #ccc", // Add a border
                      }}
                      value={project.detailsOfProject}
                      onChange={(e) =>
                        handleChange("detailsOfProject", e.target.value)
                      }
                    />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Project location"
                    error={formErrors.projectLocation}
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
                      placeholder="Type here.."
                      required
                      value={project.projectLocation}
                      onChange={(e) =>
                        handleChange("projectLocation", e.target.value)
                      }
                    />
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Project site"
                    error={formErrors.projectSite}
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
                    <div>
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name="projectSite"
                          value="Offsite"
                          required
                          checked={project.projectSite === "offsite"}
                          onChange={() =>
                            handleChange("projectSite", "offsite")
                          }
                        />
                        Offsite
                      </label>
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name="projectSite"
                          value="finished"
                          required
                          checked={project.projectSite === "onsite"}
                          onChange={() => handleChange("projectSite", "onsite")}
                        />
                        Onsite
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
                        color: "#01041b",
                        fontSize: "1.2em",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: 10,
                      },
                    })}
                  >
                    <div>
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name="natureOfEmployment"
                          value="fulltime"
                          required
                          checked={project.natureOfEmployment === "fulltime"}
                          onChange={() =>
                            handleChange("natureOfEmployment", "fulltime")
                          }
                        />
                        Full Time
                      </label>
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="radio"
                          name="natureOfEmployment"
                          value="parttime"
                          required
                          checked={project.natureOfEmployment === "parttime"}
                          onChange={() =>
                            handleChange("natureOfEmployment", "parttime")
                          }
                        />
                        Part Time
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="natureOfEmployment"
                          value="contractual"
                          required
                          checked={project.natureOfEmployment === "contractual"}
                          onChange={() =>
                            handleChange("natureOfEmployment", "contractual")
                          }
                        />
                        Contractual
                      </label>
                    </div>
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper label="Team size" error={formErrors.teamSize}>
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
                      onChange={(value) => handleChange("teamSize", value)}
                    />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Input.Wrapper label="Role" error={formErrors.role}>
                    <Select
                      placeholder="Role"
                      data={[
                        "java dev",
                        "react dev",
                        "python dev",
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
                      value={project.role}
                      onChange={(value) => handleChange("role", value)}
                    />
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
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
                  >
                    <textarea
                      placeholder="Role description"
                      required
                      style={{
                        width: "100%", // Adjust the width as needed
                        padding: "10px", // Add padding for a consistent look
                        borderRadius: "4px", // Add rounded corners
                        border: "1px solid #ccc", // Add a border
                      }}
                      value={project.roleDescription}
                      onChange={(e) =>
                        handleChange("roleDescription", e.target.value)
                      }
                    />
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
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
                  >
                    <textarea
                      placeholder="Skills Used"
                      required
                      style={{
                        width: "100%", // Adjust the width as needed
                        padding: "10px", // Add padding for a consistent look
                        borderRadius: "4px", // Add rounded corners
                        border: "1px solid #ccc", // Add a border
                      }}
                      value={project.skillUsed}
                      onChange={(e) =>
                        handleChange("skillUsed", e.target.value)
                      }
                    />
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "10px",
                  }}
                >
                  <Group position="right" mt="md">
                    <button
                      onClick={() => saveEntry()}
                      type="button"
                      className="common-btn"
                    >
                      Save
                    </button>
                  </Group>
                </Grid.Col>
              </Grid>
            </form>
          )}

          {!flag && (
            <button className="common-btn mt-4" onClick={() => setFlag(true)}>
              {" "}
              Add another project{" "}
            </button>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default ProjectForm;
