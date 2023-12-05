"use client";
import React, { useState } from "react";
import {
  Container,
  Paper,
  Button,
  Input,
  Grid,
  Group,
  Divider,
} from "@mantine/core";
import Select from "react-select";
import { gql } from "graphql-request";
import client from "../../../helpers/request";

const options = [
  { value: "doctorate/phd", label: "Doctorate/Phd" },
  { value: "masters/post-graduation", label: "Masters/Post-Graduation" },
  { value: "graduation/diploma", label: "Graduation/Diploma" },
  { value: "12th", label: "12th" },
  { value: "10th", label: "10th" },
  { value: "below10th", label: "Below 10th" },
];

const courseOptions = [
  { value: "bba", label: "Bba" },
  { value: "mca", label: "Mca" },
  { value: "btech", label: "Btech" },
];

const specializationOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "designing", label: "Designing" },
  { value: "backend", label: "Backend" },
];

const gradingSystemOptions = [
  { value: "10", label: "10" },
  { value: "9", label: "9" },
  { value: "8", label: "8" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "55px",
    borderRadius: "8px",
    border: "2px solid #ccc",
    boxShadow: "none",
  }),
  // Add more custom styles as needed
};

const Education: React.FC = () => {
  const initialFormData: any = {
    education: null,
    university: "",
    course: null,
    specialization: null,
    coursetype: null,
    startingYear: null,
    endingYear: null,
    gradingsystem: null,
    marks: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const initialErrors = {
    education: "",
    university: "",
    course: "",
    specialization: "",
    coursetype: "",
    startingYear: "",
    endingYear: "",
    gradingsystem: "",
    marks: "",
  };

  const [errors, setErrors] = useState(initialErrors);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isFormCancelled, setIsFormCancelled] = useState(false);

  // Define mutation
  const ADD_MULTIPLE_USER = gql`
    mutation CreateAddEducation($data: AddEducationCreateInput!) {
      createAddEducation(data: $data) {
        courseDuration
      }
    }
  `;

  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear; i++) {
      years.push({ value: i, label: i.toString() });
    }
    return years;
  }

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const newErrors = { ...initialErrors };

    if (!formData.education) {
      newErrors.education = "Education is required";
    }

    if (!formData.university.trim()) {
      newErrors.university = "University is required";
    }

    if (!formData.course) {
      newErrors.course = "Course is required";
    }

    if (!formData.specialization) {
      newErrors.specialization = "Specialization is required";
    }

    if (!formData.coursetype) {
      newErrors.coursetype = "Course Type is required";
    }

    if (!formData.startingYear || !formData.endingYear) {
      newErrors.startingYear = "Course Duration is required";
      newErrors.endingYear = "Course Duration is required";
    }

    if (!formData.gradingsystem) {
      newErrors.gradingsystem = "Grading System is required";
    }

    if (!formData.marks) {
      newErrors.marks = "marks are required";
    }

    setErrors(newErrors);

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(); 

    if (Object.values(newErrors).every((error) => !error)) {
      console.log("Form data submitted:", formData);

      const user = await client.request(ADD_MULTIPLE_USER, {
        data: {
          courseDuration: `startYear: ${formData.startingYear.value}  endYear : ${formData.endingYear.value}`,
          course_type: formData.coursetype,
          education: formData.education?.value,
          gradingSystem: formData.gradingsystem,
          course: formData.course.value,
          marks: formData.marks,
          specialization: formData.specialization.value,
          university: formData.university,
        },
      });
      console.log("education-created", user);

      setSubmissionSuccess(true);
    } else {
      console.log("Form contains errors:", newErrors);
      setSubmissionSuccess(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData); // Reset the form data
    setErrors(initialErrors); // Reset the form errors
    setIsFormCancelled(true); // Set cancellation flag
    setSubmissionSuccess(false); // Reset submission success flag
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <Container size="xs" px="xs">
        <Paper shadow="xl" p="md">
          <h2 style={{ textAlign: "center", fontSize: "30px" }}>
            Education Form
          </h2>

          {submissionSuccess ? (
            <p
              style={{
                textAlign: "center",
                color: "green",
                fontWeight: "bold",
              }}
            >
              Submission Successful!
            </p>
          ) : null}

          {isFormCancelled ? (
            <p
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              Form Cancelled!
            </p>
          ) : null}

          <Divider my="sm" />

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Education"
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
                    value={formData.education}
                    onChange={(value) => handleChange("education", value)}
                    options={options}
                    placeholder="Select Education"
                    styles={customStyles}
                  />
                  {errors.education && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.education}
                    </p>
                  )}
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="University/Institute"
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
                    placeholder="University/Institute"
                    required
                    onChange={(e) => handleChange("university", e.target.value)}
                    styles={(theme) => ({
                      input: {
                        height: 50,
                        width: 500,
                        fontSize: 16,
                        lineHeight: 50,
                        borderRadius: 8,
                        border: "2px solid #ccc",
                      },
                    })}
                  />
                  {errors.university && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.university}
                    </p>
                  )}
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Course"
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
                    value={formData.course}
                    onChange={(value) => handleChange("course", value)}
                    options={courseOptions}
                    placeholder="Select Course"
                    styles={customStyles}
                  />
                  {errors.course && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.course}
                    </p>
                  )}
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Specialization"
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
                    value={formData.specialization}
                    onChange={(value) => handleChange("specialization", value)}
                    options={specializationOptions}
                    placeholder="Select Specialization"
                    styles={customStyles}
                  />
                  {errors.specialization && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.specialization}
                    </p>
                  )}
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Course Type"
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
                  <div style={{ display: "flex" }}>
                    <label style={{ marginRight: "20px" }}>
                      <input
                        type="radio"
                        name="coursetype"
                        value="fullTime"
                        checked={formData.coursetype === "fullTime"}
                        onChange={(e) =>
                          handleChange("coursetype", e.target.value)
                        }
                      />
                      Full Time
                    </label>
                    <label style={{ marginRight: "20px" }}>
                      <input
                        type="radio"
                        name="coursetype"
                        value="partTime"
                        checked={formData.coursetype === "partTime"}
                        onChange={(e) =>
                          handleChange("coursetype", e.target.value)
                        }
                      />
                      Part Time
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="coursetype"
                        value="correspondence"
                        checked={formData.coursetype === "correspondence"}
                        onChange={(e) =>
                          handleChange("coursetype", e.target.value)
                        }
                      />
                      Correspondence/Distance Learning
                    </label>
                  </div>
                  {errors.coursetype && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.coursetype}
                    </p>
                  )}
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Course Duration"
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Select
                      value={formData.startingYear}
                      onChange={(value) => handleChange("startingYear", value)}
                      options={generateYearOptions()}
                      placeholder="Starting Year"
                      styles={customStyles}
                    />
                    <span style={{ margin: "0 10px" }}>to</span>
                    <Select
                      value={formData.endingYear}
                      onChange={(value) => handleChange("endingYear", value)}
                      options={generateYearOptions()}
                      placeholder="Ending Year"
                      styles={customStyles}
                    />
                  </div>
                  {errors.startingYear && errors.endingYear && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.startingYear} and {errors.endingYear}
                    </p>
                  )}
                </Input.Wrapper>
              </Grid.Col>

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="Grading System"
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
                    value={gradingSystemOptions.find(
                      (option) => option.value === formData.gradingsystem
                    )}
                    onChange={(value) =>
                      handleChange("gradingsystem", value.value)
                    }
                    options={gradingSystemOptions}
                    styles={customStyles}
                  />
                  {errors.gradingsystem && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.gradingsystem}
                    </p>
                  )}
                </Input.Wrapper>
              </Grid.Col>

              {/* Submit button */}

              <Grid.Col span={12}>
                <Input.Wrapper
                  label="marks"
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
                    placeholder="marks"
                    required
                    onChange={(e) => handleChange("marks", e.target.value)}
                    styles={(theme) => ({
                      input: {
                        height: 50,
                        width: 500,
                        fontSize: 16,
                        lineHeight: 50,
                        borderRadius: 8,
                        border: "2px solid #ccc",
                      },
                    })}
                  />
                  {errors.university && (
                    <p style={{ color: "red", fontSize: "0.8em" }}>
                      {errors.university}
                    </p>
                  )}
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
        </Paper>
      </Container>
    </div>
  );
};

export default Education;
