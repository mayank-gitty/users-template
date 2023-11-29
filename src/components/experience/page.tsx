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

const ExperienceDetails = () => {
  const { setFormData, formData }: any = useThemeContext();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [flag, setFlag] = useState(true);

  const [experience, setExperience] = useState({
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
    { label: "FullTime", value: "fullTime" },
    { label: "PartTime", value: "partTime" },
    { label: "SelfEmployed", value: "selfEmployed" },
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

    // setFormData((prevData) => ({
    //   ...prevData,
    //   [field]: value,
    // }));

    setExperience({ ...experience, [field]: value });
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

    if (!experience.employment_type) {
      return toast("please add employment type", {
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

    console.log("entry", experience);

    setFormData((prevData: any) => ({
      ...prevData,
      ["experiences"]: [...formData.experiences, experience],
    }));

    setExperience({
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

  console.log("data", formData);

  // console.log('years',data,releventMonths)

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


formData.experiences.length > 0 &&

<div className="translateLeft">
          
{" "}
<div className="mb-2 font-700">
  {formData.experiences.length > 0 ? (
    <span className="mb-2"  > total </span>
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

        <div className="
        before">.</div>

        <div className="inside">

        <h6  className="font-600" > {item.title} </h6>
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
          {item.end_year - item.start_year + "yrs"}{" "}
        </p>

        <p> {item.location} </p>
        </div>
  
      </div>
    );
  })}{" "}

</div>

}

      

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
                <p className="box-sub-heading">
                  Specify total experience and relevant experience
                </p>
              </>
            )}

            {flag && (
              <form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Col span={12}>
                    <label htmlFor=" "> Title </label>
                    <TextInput
                      placeholder="enter here"
                      size="md"
                      // value={formData.profile_summary}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <label htmlFor=" "> Employment Type </label>

                    <Select
                      // value={formData.education}
                      onChange={(value) =>
                        handleChange("employment_type", value)
                      }
                      data={type}
                      placeholder="Select type"
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
                    <label htmlFor=" "> company </label>
                    <TextInput
                      placeholder="enter here"
                      size="md"
                      // value={formData.profile_summary}
                      onChange={(e) => handleChange("company", e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <label htmlFor=" "> location </label>
                    <TextInput
                      placeholder="enter here"
                      size="md"
                      // value={formData.profile_summary}
                      onChange={(e) => handleChange("location", e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <label htmlFor=" "> location type </label>
                    <Select
                      // value={formData.education}
                      onChange={(value) => handleChange("location_type", value)}
                      data={locationType}
                      placeholder="Select type"
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
                  {/* 
 <Grid.Col span={12}>
   <h6 className="experience-label"> Start Year </h6>
 </Grid.Col> */}

                  <Grid.Col span={12}>
                    <Checkbox
                      checked={experience.currently_working ? true : false}
                      label="currently working here"
                      onChange={(e: any) =>
                        handleChange("currently_Working", e.target.checked)
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

                <button
                  className="common-btn mt-4"
                  onClick={() => saveEntry()}
                >
                  {" "}
                  Save{" "}
                </button>
              </form>
            )}

            {!flag && (
              <button
                className="common-btn mt-4"
                onClick={() => setFlag(true)}
              >
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
