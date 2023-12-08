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

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    client: "",
    projectStatus: "inProgress",
    workFromYear: "",
    workFromMonth: "",
    detailsOfProject: "",
    projectLocation: "",
    projectSite: "Offsite",
    natureOfEmployment: "Full Time",
    teamSize: "",
    role: "",
    roleDescription: "",
    skillUsed: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
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
      projectSite: "Offsite",
      natureOfEmployment: "Full Time",
      teamSize: "",
      role: "",
      roleDescription: "",
      skillUsed: "",
    });
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.projectTitle) {
      errors.projectTitle = "Project Title is required";
    }
    if (!formData.client) {
      errors.client = "Client is required";
    }
    if (!formData.workFromYear) {
      errors.workFromYear = "Year is required";
    }
    if (!formData.workFromMonth) {
      errors.workFromMonth = "Month is required";
    }
    if (!formData.detailsOfProject) {
      errors.detailsOfProject = "Detail is required";
    }
    if (!formData.projectLocation) {
      errors.projectLocation = "Project LOcation is required";
    }
    if (!formData.teamSize) {
      errors.teamSize = "Team Size is required";
    }
    if (!formData.role) {
      errors.role = "Role is required";
    }
    if (!formData.roleDescription) {
      errors.roleDescription = "Role Description is required";
    }
    if (!formData.skillUsed) {
      errors.skillUsed = "Role Description is required";
    }

    if (Object.keys(errors).length === 0) {
      // Handle successful submission here (e.g., API request)
      setFormSubmitted(true);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Container size="xs" px="xs">
        <Paper
          shadow="xl"
          p="md"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <h6 style={{ textAlign: "left", fontSize: "20px" }}>Add Project</h6>

          <Divider my="sm" />

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Project Title"
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
                    placeholder="Project Title"
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
                    value={formData.client}
                    onChange={(e) => handleChange("client", e.target.value)}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Project Status"
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
                        value="inProgress"
                        required
                        checked={formData.projectStatus === "inProgress"}
                        onChange={() =>
                          handleChange("projectStatus", "inProgress")
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
                        checked={formData.projectStatus === "finished"}
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
                      label="Work From Year"
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
                      label="Work From Month"
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
                  label="Details Of Project"
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
                    value={formData.detailsOfProject}
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
                    value={formData.projectLocation}
                    onChange={(e) =>
                      handleChange("projectLocation", e.target.value)
                    }
                  />
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Project Site"
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
                        checked={formData.projectSite === "Offsite"}
                        onChange={() => handleChange("projectSite", "Offsite")}
                      />
                      Offsite
                    </label>
                    <label style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name="projectSite"
                        value="finished"
                        required
                        checked={formData.projectStatus === "Onsite"}
                        onChange={() => handleChange("projectSite", "Onsite")}
                      />
                      Onsite
                    </label>
                  </div>
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Nature Of Employment"
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
                        value="Full Time"
                        required
                        checked={formData.natureOfEmployment === "Full Time"}
                        onChange={() =>
                          handleChange("natureOfEmployment", "Full Time")
                        }
                      />
                      Full Time
                    </label>
                    <label style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name="natureOfEmployment"
                        value="Part Time"
                        required
                        checked={formData.natureOfEmployment === "Part Time"}
                        onChange={() =>
                          handleChange("natureOfEmployment", "Part time")
                        }
                      />
                      Part Time
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="natureOfEmployment"
                        value="Contractual"
                        required
                        checked={formData.natureOfEmployment === "Contractual"}
                        onChange={() =>
                          handleChange("natureOfEmployment", "Contractual")
                        }
                      />
                      Contractual
                    </label>
                  </div>
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper label="Team Size" error={formErrors.teamSize}>
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
                    value={formData.teamSize}
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
                    value={formData.role}
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
                    placeholder="Role Description"
                    required
                    style={{
                      width: "100%", // Adjust the width as needed
                      padding: "10px", // Add padding for a consistent look
                      borderRadius: "4px", // Add rounded corners
                      border: "1px solid #ccc", // Add a border
                    }}
                    value={formData.roleDescription}
                    onChange={(e) =>
                      handleChange("roleDescription", e.target.value)
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
                  <Button
                    type="button"
                    style={{
                      height: "50px",
                      width: "120px",
                      borderRadius: "8px",
                      backgroundColor: "gray",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#FFFFFF",
                      marginRight: "10px",
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{
                      height: "50px",
                      width: "120px",
                      borderRadius: "8px",
                      backgroundColor: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#FFFFFF",
                    }}
                  >
                    Save
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </form>
          {formSubmitted && (
            <div
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              Form submitted successfully!
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default ProjectForm;
