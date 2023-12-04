import { Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
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
  Checkbox,
} from "@mantine/core";
import useThemeContext from "@/context/context";
import { toast } from "react-toastify";
import { Console, error } from "console";

const ExperienceDetails = () => {
  const { setFormData, formData }: any = useThemeContext();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [flag, setFlag] = useState(true);

  const [experience, setExperience] = useState({
    id: "id" + new Date().getTime(),
    title: "",
    employment_type: "",
    company: "",
    location: "",
    location_type: "",
    start_year: "",
    start_year_month: "",
    end_year: "",
    end_year_month: "",
    currently_working: false,
  });

  const type = [
    { label: "Full-time", value: "fullTime" },
    { label: "Part-time", value: "partTime" },
    { label: "Self-employed", value: "selfEmployed" },
    { label: "Freelance", value: "freelance" },
    { label: "Internship", value: "internship" },
    { label: "Trainee", value: "trainee" },
  ];

  const locationType = [
    { label: "remote", value: "remote" },
    { label: "office", value: "office" },
  ];

  const handleChange = (field, value) => {
    console.log("field", field, value);

    setExperience({ ...experience, [field]: value });
  };

  const deleteExperience = (id: any) => {
    const filterExperiences = formData.experiences.filter(
      (item: any) => item.id !== id
    );

    // console.log("d", filterExperiences);

    setFormData((prev: any) => ({
      ...prev,
      experiences: filterExperiences,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setFormSubmitted(true);
  };

  const handleCancel = () => {
    // Reset the form
    setFormData({
      profileSummary: "",
    });
  };

  const saveEntry = () => {
    if (!experience.title) {
      return toast("please add title", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (experience.title.length < 5) {
      return toast("title should have 5 min characters ", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!experience.employment_type) {
      return toast("please add employment type", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.company) {
      return toast("please add company", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (experience.company.length < 5) {
      return toast("company name should have 5 min characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (!experience.location) {
      return toast("please add  location", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.location_type) {
      return toast("please add location type", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.start_year) {
      return toast("please add start year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.start_year_month) {
      return toast("please add start year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.end_year && experience.currently_working) {
      return toast("please add end year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.end_year_month && experience.currently_working) {
      return toast("please add end year month", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (experience.start_year && experience.end_year) {
      if (experience.end_year < experience.start_year) {
        return toast(
          "invalid duration, end year can not be smaller than start year",
          {
            className: "black-background",
            bodyClassName: "grow-font-size",

            progressClassName: "fancy-progress-bar",
          }
        );
      }

      if (experience.end_year === experience.start_year) {
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
          (item) => item.label === experience.start_year_month
        )[0].value;

        const endMonthNumber = releventMonths.filter(
          (item) => item.label === experience.end_year_month
        )[0].value;

        console.log("190", startMonthNumber, endMonthNumber);

        if (experience.start_year_month === experience.end_year_month) {
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

    setFormData((prevData: any) => ({
      ...prevData,
      ["experiences"]: [...formData.experiences, experience],
    }));

    setExperience({
      id: "id" + new Date().getTime(),
      title: "",
      employment_type: "",
      company: "",
      location: "",
      location_type: "",
      start_year: "",
      start_year_month: "",
      end_year: "",
      end_year_month: "",
      currently_working: false,
    });

    setFlag(false);
  };

  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 30;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i.toString());
    }
    return years;
  }

  const yearsData = generateArrayOfYears();

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
    )[0].value;

    const endMonthNumber = releventMonthsData.filter(
      (item) => item.label === end_month
    )[0].value;

    const duration = calculateDuration(
      end_year,
      start_year,
      endMonthNumber,
      startMonthNumber
    );

    return ` ${duration.years} years and ${duration.months} months`;
  };



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
  ]




  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        marginTop: "2rem",
      }}
    >
      <Container size="xs" px="xs">
        {formData?.experiences?.length > 0 && (
          <div className="translateLeft">
            {" "}
            <div className="mb-2 font-700">
              {formData.experiences.length > 0 ? (
                <span className="mb-2"> total </span>
              ) : (
                ""
              )}
              {formData.experiences.length > 0 &&
                formData.experiences.length + " experiences"}{" "}
            </div>
            {formData.experiences.length > 0 &&
              formData.experiences.map((item: any) => {
                return (
                  <div className="experience-item text-indigo-950 text-sm font-bold">
                    <div
                      className="
        before"
                    >
                      .
                    </div>

                    <div className="inside">
                      <h6 className="font-600"> {item.title} </h6>{" "}
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
                        {item.company} , <span> {item.employment_type} </span>{" "}
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
                      <p> {item.location} </p>
                    </div>
                  </div>
                );
              })}{" "}
          </div>
        )}

        {
          <Paper
            style={{
              width: "30rem",
            }}
            shadow="xl"
            p="md"
          >
            {flag && (
              <>
                <h6 className="box-heading"> Add experience details </h6>
                {/* <p className="box-sub-heading">
                  Specify total experience and relevant experience
                </p> */}
              </>
            )}

            {flag && (
              <form onSubmit={handleSubmit}>
                <Grid>
      
                  <Grid.Col span={12}>
                    <label htmlFor=" "> Title </label>
                    <TextInput
                      minLength={5}
                      maxLength={30}
                      id="experience-title"
                      // error={'jjj'}
         
                      placeholder="Ex: Retail Sales Manager"
                      size="md"
                      // value={formData.profile_summary}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <label htmlFor=" "> Employment type </label>

                    <Select
                      // value={formData.education}
                      onChange={(value) =>
                        handleChange("employment_type", value)
                      }
                      data={type}
                      placeholder="Please select"
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
                    <label htmlFor=" "> Company name </label>
                    <TextInput
                      placeholder="Ex: Microsoft"
                      size="md"
                      minLength={5}
                      maxLength={30}
                      // value={formData.profile_summary}
                      onChange={(e) => handleChange("company", e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <label htmlFor=" "> location </label>
                    <TextInput
                      placeholder="Ex: London, United Kingdom"
                      size="md"
                      // value={formData.profile_summary}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <label htmlFor=" "> Location type </label>
                    <Select
                      // value={formData.education}
                      onChange={(value) => handleChange("location_type", value)}
                      data={locationType}
                      placeholder="Please select"
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
                    <Checkbox
                      checked={experience.currently_working ? true : false}
                      label="I am currently working in this role"
                      onChange={(e: any) =>
                        handleChange("currently_working", e.target.checked)
                      }
                    />
                    {/* 
                    {experience.currentlyWorking ? "true" : "false"} */}
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

                  {!experience.currently_working && (
                    <>
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
                    </>
                  )}
                </Grid>

                <button className="common-btn mt-4" onClick={() => saveEntry()}>
                  {" "}
                  Save{" "}
                </button>
              </form>
            )}

            {!flag && (
              <button className="common-btn mt-4" onClick={() => setFlag(true)}>
                {" "}
                Add another experience{" "}
              </button>
            )}
            {formSubmitted && (
              <div
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                Form submitted successfully!
              </div>
            )}
          </Paper>
        }
      </Container>
    </div>
  );
};

export default ExperienceDetails;
