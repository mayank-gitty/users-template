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
  Select,
} from "@mantine/core";
// import Select from "react-select";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import useThemeContext from "@/context/context";

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

function generateArrayOfYears() {
  var max = new Date().getFullYear();
  var min = max - 30;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i.toString());
  }
  return years;
}

function calculateDuration(
  end_year: any,
  start_year: any,
  end_month: any,
  start_month: any
) {
  // Create Date objects for the selected start and end dates
  const startDateObj = new Date(start_year, start_month - 1, 1);
  const endDateObj = new Date(end_year, end_month - 1, 1);

  // Calculate the difference in months
  const monthsDifference =
    (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 +
    endDateObj.getMonth() -
    startDateObj.getMonth();

  // Calculate the number of years and remaining months
  const years = Math.floor(monthsDifference / 12);
  const remainingMonths = monthsDifference % 12;

  return { years, months: remainingMonths };
}

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

  const startMonthNumber = releventMonthsData.filter(
    (item) => item.label === start_month
  )[0]?.value;

  const endMonthNumber = releventMonthsData.filter(
    (item) => item.label === end_month
  )[0]?.value;

  const duration = calculateDuration(
    end_year,
    start_year,
    endMonthNumber,
    startMonthNumber
  );

  return ` ${duration.years} years and ${duration.months} months`;
};

const yearsData = generateArrayOfYears();

const releventMonths = [
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

const indianEducationArray = [
  // Schools
  "other",
  "Delhi Public School (DPS)",
  "Kendriya Vidyalaya",
  "Doon School, Dehradun",
  "Sanskriti School, New Delhi",
  "The Shri Ram School, Delhi",
  "St. Xavier's School, Mumbai",
  "La Martiniere College, Lucknow",
  "Mayo College, Ajmer",
  "Modern School, Delhi",
  "Welham Girls' School, Dehradun",
  // Add more common schools as needed

  // Universities
  "University of Delhi",
  "Jawaharlal Nehru University (JNU)",
  "Banaras Hindu University (BHU)",
  "St. Stephen's College, Delhi",
  "Christ University, Bangalore",
  "BITS Pilani",
  "Xavier Labour Relations Institute (XLRI), Jamshedpur",
  "Indian Statistical Institute (ISI), Kolkata",
  "Indian Institutes of Technology (IITs)",
  "Indian Institutes of Management (IIMs)",
  // Add more common universities as needed
];

const allDegreesArray = [
  "other",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BS)",
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Engineering (BEng)",
  "Bachelor of Computer Science (BCS)",
  "Bachelor of Nursing (BN)",
  "Bachelor of Architecture (BArch)",
  "Bachelor of Education (BEd)",
  "Bachelor of Music (BMus)",
  "Bachelor of Social Work (BSW)",
  "Bachelor of Laws (LLB)",
  // Add more Bachelor's degrees as needed

  "Master of Arts (MA)",
  "Master of Science (MS)",
  "Master of Fine Arts (MFA)",
  "Master of Business Administration (MBA)",
  "Master of Engineering (MEng)",
  "Master of Computer Science (MCS)",
  "Master of Public Health (MPH)",
  "Master of Architecture (MArch)",
  "Master of Education (MEd)",
  "Master of Music (MMus)",
  "Master of Social Work (MSW)",
  "Master of Laws (LLM)",
  // Add more Master's degrees as needed
];

const fields = [
  "other",
  "Delhi Public",
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "Environmental Science",
  "Psychology",
  "Economics",
  "Business Administration",
  "Marketing",
  "Finance",
  "Political Science",
  "International Relations",
  "English Literature",
  "History",
  "Sociology",
  "Nursing",
  "Medicine",
  "Law",
  "Education",
  "Architecture",
  // Add more common fields of study as needed
];

const Education1: React.FC = () => {
  const { setFormData, formData }: any = useThemeContext();

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

  const [schoolOther, setSchoolOther] = useState("");
  const [degreeOther, setDegreeOther] = useState("");
  const [fieldOther, setFieldOther] = useState("");

  const [flag, setFlag] = useState(true);

  const deleteExperience = (id: any) => {
    const filterExperiences = formData.educations.filter(
      (item: any) => item.id !== id
    );

    // console.log("d", filterExperiences);

    setFormData((prev: any) => ({
      ...prev,
      educations: filterExperiences,
    }));
  };

  const [education, setEducation] = useState({
    id: "id" + new Date().getTime(),
    school: "",
    // schoolOther: "",
    degree: "",
    // degreeOther: "",
    field_of_study: "",
    // field_of_studyOther: "",
    grade: "",
    activities: "",
    description: "",
    start_year: "",
    start_year_month: "",
    end_year: "",
    end_year_month: "",
  });

  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear; i++) {
      years.push({ value: i, label: i.toString() });
    }
    return years;
  }

  const handleChange = (field: string, value: any) => {
    console.log("f", field, value);

    setEducation({ ...education, [field]: value });

    // setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    // const newErrors = { ...initialErrors };
    // if (!formData.education) {
    //   newErrors.education = "Education is required";
    // }
    // if (!formData.university.trim()) {
    //   newErrors.university = "University is required";
    // }
    // if (!formData.course) {
    //   newErrors.course = "Course is required";
    // }
    // if (!formData.specialization) {
    //   newErrors.specialization = "Specialization is required";
    // }
    // if (!formData.coursetype) {
    //   newErrors.coursetype = "Course Type is required";
    // }
    // if (!formData.startingYear || !formData.endingYear) {
    //   newErrors.startingYear = "Course Duration is required";
    //   newErrors.endingYear = "Course Duration is required";
    // }
    // if (!formData.gradingsystem) {
    //   newErrors.gradingsystem = "Grading System is required";
    // }
    // if (!formData.marks) {
    //   newErrors.marks = "marks are required";
    // }
    // setErrors(newErrors);
    // return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const newErrors = validateForm();

    // if (Object.values(newErrors).every((error) => !error)) {
    //   console.log("Form data submitted:", formData);
    //   setSubmissionSuccess(true);
    // } else {
    //   console.log("Form contains errors:", newErrors);
    //   setSubmissionSuccess(false);
    // }
  };

  const saveEntry = () => {
    console.log("edu", education);

    console.log("formdate", formData);

    if (education.school === "other") {
      education.school = schoolOther;
    }

    if (education.degree === "other") {
      education.school = degreeOther;
    }

    if (education.field_of_study === "other") {
      education.school = fieldOther;
    }

    // if (!experience.title) {
    //   return toast("please add title", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (experience.title.length < 5) {
    //   return toast("title should have 5 min characters ", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }

    // if (!experience.employment_type) {
    //   return toast("please add employment type", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!experience.company) {
    //   return toast("please add company", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (experience.company.length < 5) {
    //   return toast("company name should have 5 min characters", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }

    // if (!experience.location) {
    //   return toast("please add  location", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!experience.location_type) {
    //   return toast("please add location type", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!experience.start_year) {
    //   return toast("please add start year", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!experience.start_year_month) {
    //   return toast("please add start year month", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!experience.end_year && experience.currently_working) {
    //   return toast("please add end year", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }
    // if (!experience.end_year_month && experience.currently_working) {
    //   return toast("please add end year month", {
    //     className: "black-background",
    //     bodyClassName: "grow-font-size",
    //     progressClassName: "fancy-progress-bar",
    //   });
    // }

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
      ["educations"]: [...formData.educations, education],
    }));

    setEducation({
      id: "id" + new Date().getTime(),
      school: "",
      degree: "",
      field_of_study: "",
      grade: "",
      activities: "",
      description: "",
      start_year: "",
      start_year_month: "",
      end_year: "",
      end_year_month: "",
    });

    setFlag(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1.5rem",
        height: "auto",
      }}
    >
      {formData?.educations?.length > 0 && (
        <div className="translateLeftEducation">
          {" "}
          <div className="mb-2 font-700">
            {formData.educations.length > 0 ? (
              <span className="mb-2"> total </span>
            ) : (
              ""
            )}
            {formData.educations.length > 0 &&
              formData.educations.length + " educations"}{" "}
          </div>
          {formData.educations.length > 0 &&
            formData.educations.map((item: any) => {
              return (
                <div className="experience-item text-indigo-950 text-sm font-bold">
                  <div
                    className="
        before"
                  >
                    .
                  </div>

                  <div className="inside">
                    <h6 className="font-600"> {item.school} </h6>{" "}
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
                    <h6
                      style={{
                        fontWeight: "400",
                      }}
                    >
                      {" "}
                      {item.degree}
                    </h6>
                    <p
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      {" "}
                      <span> {item.start_year} - </span>{" "}
                      <span> {item.end_year} </span> ,
                      {formatExperience(
                        item.end_year,
                        item.start_year,
                        item.start_year_month,
                        item.end_year_month
                      )}{" "}
                    </p>
                    <p> {item.grade} </p>
                    <p> {item.activities} </p>
                    <p> {item.description} </p>
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
          <h6 className="box-heading"> Add education </h6>
          {/* <p className="box-sub-heading">Select your highest education</p> */}

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

          {flag && (
            <form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Col span={12}>
                  <Input.Wrapper
                    styles={() => ({
                      label: {
                        color: "#01041b",
                        fontSize: "1.2em",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: 10,
                      },
                    })}
                  ></Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="school,University,Institute"
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
                      value={education.school}
                      onChange={(value) => handleChange("school", value)}
                      data={indianEducationArray}
                      placeholder="Select Insiitue"
                    />
                    {/* {errors.university && (
        <p style={{ color: "red", fontSize: "0.8em" }}>
          {errors.university}
        </p>
      )} */}
                  </Input.Wrapper>

                  {education.school === "other" && (
                    <Grid.Col span={12}>
                      <Input.Wrapper
                        label="write here"
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
                          placeholder="write other school name here"
                          required
                          onChange={(e) => setSchoolOther(e.target.value)}
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
                  )}
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
                      value={education.degree}
                      onChange={(value) => handleChange("degree", value)}
                      data={allDegreesArray}
                      placeholder="Select Course"
                    />

                    {/* {errors.course && (
        <p style={{ color: "red", fontSize: "0.8em" }}>
          {errors.course}
        </p>
      )} */}
                  </Input.Wrapper>
                </Grid.Col>

                {education.degree === "other" && (
                  <Grid.Col span={12}>
                    <Input.Wrapper
                      label="write course name here"
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
                        placeholder="write here"
                        required
                        onChange={(e) => setDegreeOther(e.target.value)}
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
                )}

                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="field of study"
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
                      value={education.field_of_study}
                      onChange={(value: any) =>
                        handleChange("field_of_study", value)
                      }
                      data={fields}
                      placeholder="field of study"

                      // styles={customStyles}
                    />
                    {errors.specialization && (
                      <p style={{ color: "red", fontSize: "0.8em" }}>
                        {errors.specialization}
                      </p>
                    )}
                  </Input.Wrapper>
                </Grid.Col>

                {education.field_of_study === "other" && (
                  <Grid.Col span={12}>
                    <Input.Wrapper
                      label="write here"
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
                        placeholder="write field name here"
                        required
                        onChange={(e) => setFieldOther(e.target.value)}
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
                )}

                <Grid.Col span={12}>
                  <h6 className="experience-label">Start Date</h6>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Month"
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    onChange={(e) => handleChange("start_year_month", e)}
                    data={releventMonths}
                    // value={formData.total_experience_months}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
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
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Year"
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    onChange={(e) => handleChange("start_year", e)}
                    data={yearsData}
                    // value={formData.total_experience}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
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
                </Grid.Col>

                <Grid.Col span={12}>
                  <h6 className="experience-label">End Date</h6>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Month"
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    onChange={(e) => handleChange("end_year_month", e)}
                    data={releventMonths}
                    // value={formData.total_relevant_months}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
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
                </Grid.Col>

                <Grid.Col span={6}>
                  <Select
                    placeholder="Year"
                    nothingFound="No options"
                    maxDropdownHeight={280}
                    onChange={(e) => handleChange("end_year", e)}
                    data={yearsData}
                    // value={formData.relevent_experience}
                    styles={(theme) => ({
                      input: {
                        height: "100%",
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
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Grade"
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
                      placeholder="grade"
                      required
                      onChange={(e) => handleChange("grade", e.target.value)}
                      value={education.grade}
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
                    label="Activities"
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
                      placeholder="activities"
                      required
                      value={education.activities}
                      onChange={(e) =>
                        handleChange("activities", e.target.value)
                      }
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

                    {/* {errors.gradingsystem && (
        <p style={{ color: "red", fontSize: "0.8em" }}>
          {errors.gradingsystem}
        </p>
      )} */}
                  </Input.Wrapper>
                </Grid.Col>

                <Grid.Col span={12}>
                  <Input.Wrapper
                    label="Description"
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
                      placeholder="description"
                      required
                      value={education.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
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

                <button className="common-btn mt-4" onClick={() => saveEntry()}>
                  {" "}
                  Save{" "}
                </button>
              </Grid>
            </form>
          )}

          {!flag && (
            <button className="common-btn mt-4" onClick={() => setFlag(true)}>
              {" "}
              Add another education{" "}
            </button>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Education1;
