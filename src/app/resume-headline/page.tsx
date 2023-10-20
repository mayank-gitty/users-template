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

const ResumeHeadline = () => {
  // const [formData, setFormData] = useState({

  //   resumeHeadline: "",

  // });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { setFormData, formData }: any = useThemeContext();

  const handleChange = (field, value) => {
    console.log(field, value);
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
      resumeHeadline: "",
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
        <Paper
          shadow="xl"
          p="md"
          style={{
            width: "30rem",
          }}
        >
          <h6 style={{ textAlign: "left", fontSize: "20px" }}>
            Resume Headline
          </h6>

          <Divider my="sm" />

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <Textarea
                  placeholder="write here"
                  size="md"
                  value={formData.resume_headline}
                  onChange={(e) =>
                    handleChange("resume_headline", e.target.value)
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

export default ResumeHeadline;
