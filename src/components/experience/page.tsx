import { Textarea } from "@mantine/core";
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
import useThemeContext from "@/context/context";

const ExperienceDetails = () => {
  const { setFormData, formData }: any = useThemeContext();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (field, value) => {
    console.log("field", field, value);

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);
  };

  const handleCancel = () => {
    // Reset the form
    setFormData({
      profileSummary: "",
    });
  };

  const data = Array(20)
    .fill(0)
    .map((_, index) => `${index} years`);
  const releventmonths = Array(13)
    .fill(0)
    .map((_, index) => `${index} months`);

  console.log("data", data);

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
        <Paper
          style={{
            width: "30rem",
          }}
          shadow="xl"
          p="md"
        >
          <h6 className="box-heading"> Add experience details </h6>
          <p className="box-sub-heading">
            Specify total experience and relevant experience
          </p>

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <h6 className="experience-label">Total Experience</h6>
              </Grid.Col>

              <Grid.Col span={6}>
                <Select
                  placeholder="Years"
              
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  onChange={(e) => handleChange("total_experience", e)}
                  data={data}
                  value={formData.total_experience}
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
                  placeholder="Months"
                
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  onChange={(e) => handleChange("total_experience_months", e)}
                  data={releventmonths}
                  value={formData.total_experience_months}
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
                <h6 className="experience-label">Relevant Experience</h6>
              </Grid.Col>

              <Grid.Col span={6}>
                <Select
                  placeholder="Years"
                
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  onChange={(e) => handleChange("relevent_experience", e)}
                  data={data}
                  value={formData.relevent_experience}
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
                  placeholder="Months"
            
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  onChange={(e) => handleChange("total_relevant_months", e)}
                  data={releventmonths}
                  value={formData.total_relevant_months}
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

export default ExperienceDetails;
