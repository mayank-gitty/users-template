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
  Text,
  MultiSelect,
  Avatar,
  Autocomplete,
} from "@mantine/core";

import { toast } from "react-toastify";
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

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

const indianEducationArray = [
  // Schools
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

const data = [
  {
    value: "bob@handsome.inc",
    image: "image-link",
    label: "bob@handsome.inc",
    name: "Bob Handsome",
  },
  {
    value: "bill@outlook.com",
    image: "image-link",
    label: "bill@outlook.com",
    name: "Bill Rataconda",
  },
  {
    value: "amy@wong.cn",
    image: "image-link",
    label: "amy@wong.cn",
    name: "Amy Wong",
  },
];

function SelectItem({ image, label, name, ...others }) {
  return (
    <div {...others}>
      <Group style={{ cursor: "pointer" }}>
        {/* <Avatar src={image} radius="xl" /> */}

        <div>
          <Text>{name}</Text>
          <Text size="xs" color="blue">
            {label}
          </Text>
        </div>
      </Group>
    </div>
  );
}

const fields = [
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
].map((item) => {
  return {
    value: item,
    label: item,
  };
});

const Education1: React.FC = () => {
  const { setFormData, formData  ,open, setOpen }: any = useThemeContext();

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

  const [education2, setEducation2] = useState(false);

  const [education1, setEducation1] = useState(false);

  const [education3, setEducation3] = useState(false);

  // const [open, setOpen] = useState(false);

  const [editOpen, seteditopen] = useState("");

  const [errors, setErrors] = useState(initialErrors);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isFormCancelled, setIsFormCancelled] = useState(false);

  const [schoolOther, setSchoolOther] = useState("");
  const [degreeOther, setDegreeOther] = useState("");
  const [fieldOther, setFieldOther] = useState("");

  const [flag, setFlag] = useState(false);

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

  // function SelectItem({ name , label, ...others }) {
  //   console.log("i", name);

  //   return (
  //     <div {...others}>
  //       <Group style={{ cursor: "pointer" }}>
  //         {/* <Avatar src={image} radius="xl" /> */}

  //         <div>
  //           <Text> {name} </Text>
  //           <Text size="xs" color="blue">
  //             {label}
  //           </Text>
  //         </div>
  //       </Group>
  //     </div>
  //   );
  // }

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

  console.log("f", formData.educations);

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

 
        
    if (!education.school) {
      return toast("please add university", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!education.degree) {
      return toast("please select course", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!education.field_of_study) {
      return toast("please select field of study", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    
    if (!education.start_year) {
      return toast("please add start year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.start_year_month) {
      return toast("please add start year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.end_year) {
      return toast("please add end year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.end_year_month) {
      return toast("please add end year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (education.start_year && education.end_year) {
      if (education.end_year < education.start_year) {
        return toast(
          "invalid duration, end year can not be smaller than start year",
          {
            className: "black-background",
            bodyClassName: "grow-font-size",

            progressClassName: "fancy-progress-bar",
          }
        );
      }

      if (education.end_year === education.start_year) {
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
        ].map((item, index) => ({ label: item, value: index + 1 }));

        const startMonthNumber = releventMonths.filter(
          (item) => item.label === education.start_year_month
        )[0].value;

        const endMonthNumber = releventMonths.filter(
          (item) => item.label === education.end_year_month
        )[0].value;

        console.log("190", startMonthNumber, endMonthNumber);

        if (education.start_year_month === education.end_year_month) {
          return toast(
            "invalid duration, start date can not be equal to end date",
            {
              className: "black-background",
              bodyClassName: "grow-font-size",
              progressClassName: "fancy-progress-bar",
            }
          );
        }
        if (endMonthNumber < startMonthNumber) {
          return toast(
            "invalid duration, end date can not be small then start date",
            {
              className: "black-background",
              bodyClassName: "grow-font-size",
              progressClassName: "fancy-progress-bar",
            }
          );
        }
      }
    }



    if (!education.grade) {
      return toast("please add grade", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!education.activities) {
      return toast("please add activities", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!education.description) {
      return toast("please add  description", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }


    if (editOpen !== "") {
      // alert(editOpen);

      const changed = formData?.educations.map((item: any) => {
        if (item.id === editOpen) {
          // id: "id" + new Date().getTime(),
          (item.school = education.school),
            // schoolOther: "",
            (item.degre = education.degree),
            // degreeOther: "",
            (item.field_of_study = education.field_of_study),
            // field_of_studyOther: "",
            (item.grade = education.grade),
            (item.activities = education.activities),
            (item.description = education.description),
            (item.start_year = education.start_year),
            (item.start_year_month = education.start_year_month),
            (item.end_year = education.end_year),
            (item.end_year_month = education.end_year_month)

        }

        return item;
      });

      console.log("ch", changed);

      setFormData((prevData: any) => ({
        ...prevData,
        ["educations"]: changed,
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        ["educations"]: [...formData?.educations, education],
      }));
    }



    setEducation2(false);

    setEducation1(false);

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

    setOpen(false);
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

      {
        <Container size="xs" px="xs">
          <Paper
            // shadow="xl"
            // p="md"
            style={{
              width: "30rem",
            }}
          >
            {/* <p className="box-sub-heading "> Add education </p>{" "}
              <p className="box-sub-heading "> Add education </p>{" "}
              <p className="box-sub-heading "> Add education </p>{" "}
              <p className="box-sub-heading "> Add education </p>{" "} 
              */}

            <div
              className=" mt-4"
              style={{
                position: "absolute",
                left: "20%",
              }}
            >
              <div className="heading">
                <h6 className="box-heading"> Add education </h6>
                <p className="box-sub-heading mb-8">
                  Complete your education details
                </p>
              </div>

              <div className="">
                {formData?.educations?.length > 0 &&
                  formData?.educations.map((item: any) => {
                    return (
                      <div className="d-flex">
                        <p className="box-sub-heading "> {item.degree} </p>

                        <div className="mx-2">
                          {education.school === item.school ? (
                            <img
                              onClick={() => {
                                setFlag(false);
                                setOpen(false);
                                seteditopen("");
                                setEducation1(true);
                                setEducation2(false);
                                setEducation({
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
                              }}
                              className="cursor"
                              src={"images/minus_circle.svg"}
                              alt=""
                            />
                          ) : (
                            <img
                              onClick={() => {
                                setFlag(false);
                                setOpen(true);
                                seteditopen(item.id);
                                setEducation1(true);
                                setEducation2(false);
                                setEducation({
                                  id: "id" + new Date().getTime(),
                                  school: item.school,
                                  // schoolOther: "",
                                  degree: item.degree,
                                  // degreeOther: "",
                                  field_of_study: item.field_of_study,
                                  // field_of_studyOther: "",
                                  grade: item.grade,
                                  activities: item.activities,
                                  description: item.description,
                                  start_year: item.start_year,
                                  start_year_month: item.start_year_month,
                                  end_year: item.end_year,
                                  end_year_month: item.end_year_month,
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
                    {formData?.educations?.length > 0
                      ? " Add another education "
                      : " Add education "}{" "}
                  </p>{" "}
                  <div className="mx-2">
                    {open && !editOpen ? (
                      <img
                        onClick={() => {
                          setFlag(true);
                          setOpen(false);
                          seteditopen("");

                          setEducation({
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
                          setEducation1(true);
                          setEducation2(false);
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
                          setOpen(true)
                          setEducation({
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
                          setEducation1(true);
                          setEducation2(false);
                          setOpen(true);
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

            {open && (
              <form onSubmit={handleSubmit}>
                <Grid>
                
                    <>
                      {/* <Grid.Col span={12}>
                        <Input.Wrapper
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        ></Input.Wrapper>
                      </Grid.Col> */}

                      <Grid.Col span={12}>
                        {/*                         
                        <Input.Wrapper
                          label="School,University,Institute"
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        > */}
                        <Autocomplete
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
                          value={education.school}
                          onChange={(value) => handleChange("school", value)}
                          data={indianEducationArray}
                          placeholder="University Institute"
                        />
                        {/* </Input.Wrapper> */}

                        {/* <p> {education.school} </p> */}
                      </Grid.Col>

                      <Grid.Col span={12}>
                        {/* <Input.Wrapper
                          label="Course"
                          styles={() => ({
                            label: {
                              color: "#01041b",
                              fontSize: "1.2em",
                              fontWeight: 500,
                              lineHeight: 1.2,
                              // marginBottom: 10,
                            },
                          })}
                        > */}
                        <Autocomplete
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
                          value={education.degree}
                          onChange={(value) => handleChange("degree", value)}
                          data={allDegreesArray}
                          placeholder="Course"
                        />
                        {/* </Input.Wrapper> */}
                      </Grid.Col>

                      <Grid.Col span={12}>
                        {/* <Input.Wrapper
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
                        > */}
                        <Autocomplete
                          value={education.field_of_study}
                          onChange={(value: any) =>
                            handleChange("field_of_study", value)
                          }
                          data={fields}
                          placeholder="Field of study"
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

                          // styles={customStyles}
                        />
                        {errors.specialization && (
                          <p style={{ color: "red", fontSize: "0.8em" }}>
                            {errors.specialization}
                          </p>
                        )}
                        {/* </Input.Wrapper> */}
                      </Grid.Col>

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
                          value={education.start_year_month}
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
                          value={education.start_year}
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
                          value={education.end_year_month}
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
                          value={education.end_year}
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
                        {/* <Input.Wrapper
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
                        > */}
                        <Input
                          placeholder="Grade"
                          required
                          onChange={(e) =>
                            handleChange("grade", e.target.value)
                          }
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
                        {/* </Input.Wrapper> */}
                      </Grid.Col>
                      <Grid.Col span={12}>
                        {/* <Input.Wrapper
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
                        > */}
                        <Input
                          placeholder="Activities"
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
                        {/* </Input.Wrapper> */}
                      </Grid.Col>

                      <Grid.Col span={12}>
                        {/* <Input.Wrapper
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
                        > */}
                        <Input
                          placeholder="Description"
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
                        {/* </Input.Wrapper> */}
                      </Grid.Col>

                      <div
                        className="d-flex justify-content-end"
                        style={{
                          width: "100%",
                          marginTop: "1rem",
                          // background:"red"
                        }}
                      >
             
                        <Button

                        className="btn btn-info"
                          style={{
                            paddingRight: "14px",
                          }}
                          onClick={() => {
                 
                            // setEducation3(true)
                            saveEntry();
                          }}
                        >
                          {" "}
                        save {" "}
                        </Button>
                      </div>

                      <div
                        className="d-flex justify-content-end"
                        style={{
                          width: "100%",
                          marginTop: "1rem",
                          // background:"red"
                        }}
                      >
                        {/* <Button
                          style={{
                            transform: "translateX(8px)",
                          }}
                        >
                          {" "}
                          prev{" "}
                        </Button> */}

          


                      </div>
                    </>
                

              
                </Grid>
              </form>
            )}

            {/* {flag && (
              <button className="common-btn mt-4" onClick={() => setFlag(true)}>
                {" "}
                Add another education{" "}
              </button>
            )} */}
          </Paper>
        </Container>
      }
    </div>
  );
};

export default Education1;
