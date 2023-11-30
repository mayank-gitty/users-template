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
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import useThemeContext from "@/context/context";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Thanku from "../../app/thanku/page";
import { updateUser } from "@/util/mutationQueries";
import { toast } from "react-toastify";

// Define mutation
const PROFILE_USER = gql`
  mutation CreateProfileUser($data: ProfileUserCreateInput!) {
    createProfileUser(data: $data) {
      experience {
        title
      }
    }
  }
`;

const PROFILE_USERS = gql`
  query Query {
    profileUsers {
      total_experience
      resume_headline
      relevent_experience
      profile_summary
      keyskillsCount
      user {
        name
        email
        company {
          name
        }
      }

      keyskills {
        name
      }
      photograph
      itskillsCount
      itskills {
        name
      }
    }
  }
`;

const Profile = () => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    setFormData,
    formData,
    active,
    setActive,
    inEditPage,
    setinEditPage,
  }: // createdExperiencesOnEdit,
  // deletedExperiencesOnEdit
  any = useThemeContext();

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const updateUserProfile = async () => {
    console.log("updateUserProfile", formData.profileUserId);
    console.log("updateUserProfile1", formData.experiences);

    for (var i = 0, len = formData.experiences.length; i < len; i++) {
      delete formData.experiences[i].id;
    }


    console.log('form',formData.experiences)

    const user: any = await client.request(updateUser, {
      where: {
        id: formData.profileUserId,
      },
      data: {
        // total_experience: formData.total_experience,
        resume_headline: formData.resume_headline,
        // relevent_experience: values.relevant_experience,
        experience: {
          create: formData.experiences
        },
        profile_summary: formData.profile_summary,
        photograph: formData.photograph,
        keyskills: {
          connect: formData.keyskills.map((item: any) => {
            return {
              id: item,
            };
          }),
        },
        itskills: {
          connect: formData.itskills.map((item: any) => {
            return {
              id: item,
            };
          }),
        },
        education: formData.education,
        // active: formData.status,
        // // open_to_work: formData.work,
        // createdAt: new Date(),
      },
    });

    console.log("updated", user);

    if (user?.updateProfileUser) {
      setinEditPage(false);
      setActive(0);

      setFormData((prevData) => ({
        profileUserId: "",
        itskills: [],
        education: null,
        keyskills: [],
        resume_headline: "",
        profile_summary: "",
        // total_experience:"",
        // total_experience_months:"",
        // // relevent_experience:"",
        // total_relevant_months:"",
        experiences: [],
        photograph: "",
        resume: "",
      }));

      toast("details updated", {
        className: "green-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });

      return router.push(`profile?id=${localStorage.getItem("id")}`);
    }
  };

  const save = async () => {
    if (!formData.profile_summary) {
      return alert("please enter profile summaary");
    }

    const itskills = formData?.itskills?.map((item: any) => {
      return {
        id: item,
      };
    });

    const keyskills = formData?.keyskills?.map((item: any) => {
      return {
        id: item,
      };
    });
    // console.log("fm", keyskills);


    for (var i = 0, len = formData.experiences.length; i < len; i++) {
      delete formData.experiences[i].id;
    }


    const user = await client.request(PROFILE_USER, {
      data: {
        keyskills: {
          connect: keyskills,
        },
        itskills: {
          connect: itskills,
        },
        user: {
          connect: {
            id: localStorage.getItem("id"),
          },
        },
        // courseDuration: `startYear: ${formData?.startingYear?.value}  endYear : ${formData?.endingYear?.value}`,
        // course_type: formData.coursetype,
        photograph: formData.photograph,
        education: formData.education,
        resume_headline: formData.resume_headline,
        // relevent_experience: `${formData.relevent_experience}  ${formData.total_relevant_months} `,
        // total_experience: ` ${formData.total_experience}  ${formData.total_experience_months}  `,
        experience: {
          create: formData.experiences,
        },
        profile_summary: formData.profile_summary,
        resume: formData.resume,
        // gradingSystem: formData.gradingsystem,
        // course: formData.course.value,
        // marks: formData.marks,
        // specialization: formData.specialization.value,
        // university: formData.university,
      },
    });

    console.log("profile-user", user);

    setActive(8);
    setFormSubmitted(true);

    setTimeout(() => {
      router.push("/thanku");
    }, 500);

    // alert('details submitted')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        marginTop: "1.5rem",
      }}
    >
      <Container
        size="xs"
        px="xs"
        style={
          {
            // width:"100%",
            // position:"relative"
          }
        }
      >
        <Paper
          shadow="xl"
          p="md"
          style={{
            width: "30rem",
          }}
        >
          <h6 className="box-heading">Profile summary</h6>
          {/* <p style={{ color: "GrayText" }}>
          This form is designed to help individuals and organizations evaluate their educational and experiential requirements. By gathering pertinent information, we aim to tailor educational or training programs and career development plans to meet your unique needs.
          </p> */}

          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid.Col span={12}>
                <Textarea
                  placeholder="enter here"
                  size="md"
                  value={formData.profile_summary}
                  onChange={(e) =>
                    handleChange("profile_summary", e.target.value)
                  }
                />
              </Grid.Col>

              <Grid.Col
                span={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "10px",
                }}
              >
                {inEditPage ? (
                  <div className="">
                    <Group position="right" mt="md">
                      <Button
                        className="next-button"
                        type="button"
                        style={{}}
                        onClick={() => updateUserProfile()}
                      >
                        save
                      </Button>

                      <></>
                    </Group>
                  </div>
                ) : (
                  <div className="">
                    <Group position="right" mt="md">
                      <Button
                        className="next-button"
                        type="submit"
                        style={{}}
                        onClick={() => save()}
                      >
                        submit
                      </Button>

                      <></>
                    </Group>
                  </div>
                )}
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
