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
const IT_SKILLS = gql`
query ItSkills {
  itSkills {
    name
    id
  }
}
`;


const ItSkills1 = () => {
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
    const users: any = await client.request(IT_SKILLS);

    console.log("usersaa", users);

    const DefaultSkills = users?.itSkills.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    setDefaultSkills(DefaultSkills)
  };

  useEffect(()=>{
    getSkills();
  },[])


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
        marginTop:"2rem"
      }}
    >
      <Container size="xs" px="xs">
        <Paper shadow="xl" p="md" style={{
          width:"30rem"
        }} >
          <h6 style={{ textAlign: "left", fontSize: "20px" }}>
            Key Skills 
          </h6>
          <p style={{ color: "GrayText" }}>
            Specify key skills that your have strong command
          </p>

          <Divider my="sm" />

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <MultiSelect
                  label="select skill"
                  placeholder="Pick value"
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

export default ItSkills1;
