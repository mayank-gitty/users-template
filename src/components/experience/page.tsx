import { SimpleGrid, Textarea } from "@mantine/core";
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
  const data = Array(20)
    .fill(0)
    .map((_, index) => `${index} years`);
    const releventmonths = Array(13)
    .fill(0)
    .map((_, index) => `${index} months`);
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
        <Paper shadow="xl" p="md">
          <h6 style={{ textAlign: "left", fontSize: "20px" }}>
            Experience Details
          </h6>

          <Divider my="sm" />

          <form onSubmit={handleSubmit}>
            <SimpleGrid cols={2}>
              {/* <Textarea
                  placeholder="enter total experience"
                  size="md"
                  value={formData.total_experience}
                  onChange={(e) =>
                    handleChange("total_experience", e.target.value)
                  }
                /> */}
              <Select
                placeholder="select years"
                searchable
                nothingFound="No options"
                maxDropdownHeight={280}
                data={data}
                value={formData.total_experience}
              />
              <Select
                placeholder="select months"
                searchable
                nothingFound="No options"
                maxDropdownHeight={280}
                data={releventmonths}
                value={formData.total_experience}
              />
              <div>
           Total Relevant Experience
                {/* <Textarea
                  placeholder="select years"
                  size="md"
                  value={formData.relevent_experience}
                  onChange={(e) =>
                    handleChange("relevent_experience", e.target.value)
                  }
                /> */}

                <Select
                  placeholder="select months"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={data}
                  value={formData.relevent_experience}
                  />
               
              </div>
              <Select
              mt={23}
                  placeholder="select months"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={releventmonths}
                  value={formData.total_experience}
                />
            </SimpleGrid>
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
