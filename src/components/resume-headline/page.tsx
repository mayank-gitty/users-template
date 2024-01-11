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
        marginTop: "3.5rem",
      }}
    >
      <Container size="xs" px="xs">
        <Paper
          // shadow="xl"
          p="md"
          style={{
            width: "30rem",
            padding:"0rem"
          }}
        >
          <h6 className="box-heading"> Resume Headline </h6>
          <p className="box-sub-heading">Write the resume headline</p>

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <Textarea
                  placeholder="write here"
                  size="md"
                  minLength={5}
                  maxLength={100}
                  value={formData.resume_headline} 
                  styles={(theme) => ({
                    input: {
                      height: "125.324px",
                    },  
           
                  })}
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
