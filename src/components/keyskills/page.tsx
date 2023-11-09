import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Input,
  Paper,
  Select,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import client from "../../../helpers/request";

// Define mutation
const KEY_SKILLS = gql`
  query KeySkills {
    keySkills {
      name
      id
    }
  }
`;

const KeySkills = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [DefaultSkills, setDefaultSkills] = useState([]);

  const { setFormData, formData }: any = useThemeContext();

  const handleChange = (field) => {
    console.log("field", field);

    setFormData({ ...formData, ["keyskills"]: field });
  };

  // form.getInputProps('skills')

  console.log("m", formData.itskills);

  const handleSubmit = (e) => {
    e.preventDefault();

    // setFormData({ ...formData, ['field]: value });
  };

  const getSkills = async () => {
    const users: any = await client.request(KEY_SKILLS);

    console.log("usersaa", users);

    const DefaultSkills = users?.keySkills?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    setDefaultSkills(DefaultSkills);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const handleCancel = () => {
    // Reset the form
    // setFormData({
    //   skillName: "",
    //   // softwareVersion: "",
    //   // lastUsed: "",
    //   // experienceYear: "",
    //   // experienceMonth: "",
    // });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1.5rem",
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
          <h6 className="box-heading"> Add your key skills </h6>
          <p className="box-sub-heading mb-8">
            Specify key skills that your have strong command
          </p>

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <MultiSelect
                  // clearButtonProps={
                  //   <p> jj</p>
                  // }
                  styles={(theme) => ({
                    input: {
                      // height: "50px",
                      padding: "6px 8px",
                    },
                    values: {
                      height: "100%",
                      bg: "red",
                    },

                    wrapper: {
                      height: "auto",
                      ".mantine-MultiSelect-value": {
                        background: "#FFFFFF",
                        boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.18)",
                        border: "1px solid #DCDCDC",
                        borderLeft: "5px solid #478FC3",
                        color: "#000",
                        // font-family: Inter;
                        fontSize: "12px",

                        fontWeight: 500,

                        padding: "14px 0px",
                        "::before": {
                          content: '""',
                        },
                      },
                      ".mantine-MultiSelect-defaultValueLabel": {
                        paddingLeft: "6px",
                      },
                      ".mantine-CloseButton-root": {
                        // margin:"0 10px",
                        marginRight: "4px",
                        marginLeft: "18px",
                        background: "#2E3A59",
                        borderRadius: "50%",
                        height: "14px",
                        minHeight: "18px",
                        minWidth: "18px",

                        svg: {
                          color: "#fff",
                          height: "12px !important",
                          width: "10px !important",
                        },
                      },
                    },
                    pill: {
                      color: "red",
                      background: "red",
                    },

                    leftIcon: {
                      marginRight: theme.spacing.md,
                    },
                  })}
                  // label="select skill"
                  placeholder="Select your skills"
                  maxSelectedValues={5}
                  onChange={(e) => handleChange(e)}
                  value={formData.keyskills}
                  data={DefaultSkills}
                />
              </Grid.Col>
              {/* <Grid.Col span={6}>
                <Input.Wrapper
                  label="Software Version"
                  styles={() => ({
                    label: {
                      color: '#01041b',
                      fontSize: '1.2em',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      marginBottom: 10,
                    },
                  })}
                >
                  <Input
                    placeholder="Software Version"
                    required
                    value={formData.softwareVersion}
                    onChange={(e) => handleChange('softwareVersion', e.target.value)}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Input.Wrapper
                  label="Last Used"
                  styles={() => ({
                    label: {
                      color: '#01041b',
                      fontSize: '1.2em',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      marginBottom: 10,
                    },
                  })}
                >
                  <Select
                    placeholder="Select year"
                    data={['2023', '2022', '2021', '2020', '2019', '2018']}
                    value={formData.lastUsed}
                    onChange={(value) => handleChange('lastUsed', value)}
                  />
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Experience Year"
                  placeholder="Select year"
                  data={['10+', '9', '8', '7', '6', '5', '4', '3', '2', '1', 'Less than 1']}
                  value={formData.experienceYear}
                  onChange={(value) => handleChange('experienceYear', value)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Experience Month"
                  placeholder="Select month"
                  data={['12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']}
                  value={formData.experienceMonth}
                  onChange={(value) => handleChange('experienceMonth', value)}
                />
              </Grid.Col>
              <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
                <Group position="right" mt="md">
                  <Button
                    type="button"
                    style={{
                      height: '50px',
                      width: '120px',
                      borderRadius: '8px',
                      backgroundColor: 'gray',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#FFFFFF',
                      marginRight: '10px',
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{
                      height: '50px',
                      width: '120px',
                      borderRadius: '8px',
                      backgroundColor: 'red',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#FFFFFF',
                    }}
                  >
                    Save
                  </Button>
                </Group>
              </Grid.Col> */}
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

export default KeySkills;
