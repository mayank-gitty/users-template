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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        marginTop:"2rem"
      }}
    >
      <Container size="xs" px="xs">
        <Paper shadow="xl" p="md">
          <h6 style={{ textAlign: "left", fontSize: "20px" }}>
            Experience Details
          </h6>

          <Divider my="sm" />

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <label htmlFor=""> Total Experience</label>
                <Textarea
                  placeholder="enter total experience"
                  size="md"
                  value={formData.total_experience}
                  onChange={(e) =>
                    handleChange("total_experience", e.target.value)
                  }
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <label htmlFor=""> Total Relevant Experience</label>
                <Textarea
                  placeholder="enter relevant experience"
                  size="md"
                  value={formData.relevent_experience}
                  onChange={(e) =>
                    handleChange("relevent_experience", e.target.value)
                  }
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
