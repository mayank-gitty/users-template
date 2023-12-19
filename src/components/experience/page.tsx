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
  const { setFormData, formData, experienceOpen, setexperienceOpen }: any =
    useThemeContext();

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

  const [editOpen, seteditopen] = useState("");

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

    if (!experience.end_year && !experience.currently_working) {
      return toast("please add end year", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }
    if (!experience.end_year_month && !experience.currently_working) {
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
        )[0]?.value;

        const endMonthNumber = releventMonths.filter(
          (item) => item.label === experience.end_year_month
        )[0]?.value;

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

    if (experience.currently_working) {
      experience.end_year = experience.start_year;
      experience.end_year_month = experience.start_year_month;
    }

    if (editOpen !== "") {
      alert(editOpen);

      const changed = formData?.experiences.map((item: any) => {
        if (item.id === editOpen) {
          // id: "id" + new Date().getTime(),

          (item.title = experience.title),
            (item.employment_type = experience.employment_type),
            (item.company = experience.company),
            (item.location = experience.location),
            (item.location_type = experience.location_type),
            (item.start_year = experience.start_year),
            (item.start_year_month = experience.start_year_month),
            (item.end_year = experience.end_year),
            (item.end_year_month = experience.end_year_month),
            (item.currently_working = experience.currently_working);
        }

        return item;
      });

      console.log("ch", changed);

      setFormData((prevData: any) => ({
        ...prevData,
        ["experiences"]: changed,
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        ["experiences"]: [...formData.experiences, experience],
      }));
    }

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

    setexperienceOpen(false);
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

    if (!end_year) {
      return `currently-working-here`;
    }

    const duration = calculateDuration(
      end_year,
      start_year,
      endMonthNumber,
      startMonthNumber
    );

    return ` ${duration.years} years and ${duration.months} months`;
  };

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
        {
          <Paper
            style={{
              width: "30rem",
            }}
            // shadow="xl"
            p="md"
          >
            <div
              className=" mt-4"
              style={{
                position: "absolute",
                left: "20%",
              }}
            >
              <div className="heading">
                <h6 className="box-heading"> Add experience </h6>
                <p className="box-sub-heading mb-8">
                  Complete your experience details
                </p>
              </div>

              <div className="">
                {formData?.experiences?.length > 0 &&
                  formData?.experiences.map((item: any) => {
                    return (
                      <div className="d-flex">
                        <p className="box-sub-heading "> {item.title} </p>

                        <div className="mx-2">
                          {experience.title === item.title ? (
                            <img
                              onClick={() => {
                                setFlag(false);
                                setexperienceOpen(false);
                                seteditopen("");
                                // setEducation1(true);
                                // setEducation2(false);
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
                              }}
                              className="cursor"
                              src={"images/minus_circle.svg"}
                              alt=""
                            />
                          ) : (
                            <img
                              onClick={() => {
                                setFlag(false);
                                setexperienceOpen(true);
                                seteditopen(item.id);
                                // setEducation1(true);
                                // setEducation2(false);
                                setExperience({
                                  id: "id" + new Date().getTime(),
                                  title: item.title,
                                  employment_type: item.employment_type,
                                  company: item.company,
                                  location: item.location,
                                  location_type: item.location_type,
                                  start_year: item.start_year,
                                  start_year_month: item.start_year_month,
                                  end_year: item.end_year,
                                  end_year_month: item.end_year_month,
                                  currently_working: item.currently_working,
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
                    {formData?.experiences?.length > 0
                      ? " Add another experience "
                      : " Add experience "}{" "}
                  </p>{" "}
                  <div className="mx-2">
                    {experienceOpen && !editOpen ? (
                      <img
                        onClick={() => {
                          setFlag(true);
                          setexperienceOpen(false);
                          seteditopen("");

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
                          setexperienceOpen(true);
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

            {experienceOpen && (
              <form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Col span={12}>
                    {/* <label htmlFor=" "> Title </label> */}
                    <TextInput
                      minLength={5}
                      maxLength={30}
                      id="experience-title"
                      // error={'jjj'}

                      placeholder="Title"
                      size="md"
                      value={experience.title}
                      onChange={(e) => handleChange("title", e.target.value)}
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
                    {/* <label htmlFor=" "> Employment type </label> */}

                    <Select
                      // value={experience.experience}
                      value={experience.employment_type}
                      onChange={(value) =>
                        handleChange("employment_type", value)
                      }
                      data={type}
                      placeholder="Employment Type"
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
                    {/* <label htmlFor=" "> Company name </label> */}
                    <TextInput
                      placeholder="Company Name"
                      size="md"
                      minLength={5}
                      maxLength={30}
                      value={experience.company}
                      onChange={(e) => handleChange("company", e.target.value)}
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
                    {/* <label htmlFor=" "> location </label> */}
                    <TextInput
                      placeholder="Location"
                      size="md"
                      value={experience.location}
                      onChange={(e) => handleChange("location", e.target.value)}
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
                    {/* <label htmlFor=" "> Location type </label> */}
                    <Select
                      value={experience.location_type}
                      onChange={(value) => handleChange("location_type", value)}
                      data={locationType}
                      placeholder="Location Type"
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
                      value={experience.start_year_month}
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
                      value={experience.start_year}
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

                  {!experience.currently_working && (
                    <Grid.Col span={12}>
                      <h6 className="experience-label">End Date</h6>
                    </Grid.Col>
                  )}

                  {!experience.currently_working && (
                    <>
                      <Grid.Col span={6}>
                        <Select
                          placeholder="Month"
                          nothingFound="No options"
                          maxDropdownHeight={280}
                          onChange={(e) => handleChange("end_year_month", e)}
                          data={releventMonths}
                          value={experience.end_year_month}
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
                          value={experience.end_year}
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

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-info mt-4"
                    onClick={() => saveEntry()}
                  >
                    {" "}
                    Save{" "}
                  </button>
                </div>
              </form>
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
