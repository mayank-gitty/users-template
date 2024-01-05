"use client";
import { useEffect } from "react";
import {
  Button,
  Group,
  PasswordInput,
  TextInput,
  Paper,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useTransition } from "react";
import client from "../../../helpers/request";
import useThemeContext from "@/context/context";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { AUTH_MUTATION, createCode, updateUser } from "@/util/mutationQueries";
import { GET_USER } from "@/util/queries";

import { useSession } from "next-auth/react";

import { signIn, signOut } from "next-auth/react";

import { toast } from "react-toastify";

const updateCode = gql`
  mutation Mutation($where: CodeWhereUniqueInput!, $data: CodeUpdateInput!) {
    updateCode(where: $where, data: $data) {
      id
      expire
      value
    }
  }
`;

const GET_CODE = gql`
  query Codes($where: CodeWhereInput!) {
    codes(where: $where) {
      value
      id
      expire
    }
  }
`;

const Login = () => {
  const { loggedIn, setLoggedIn }: any = useThemeContext();

  const router = useRouter();

  const showPassword = () => {
    // console.log("hitting");

    var x: any = document.getElementById("myInput");

    // console.log("xxxxxx", x);

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const form = useForm({
    initialValues: {
      enablePassword: false,
      email: "",
      code: "",
      password: "",
      forgotEmail: "",
      forgotPassword: "",
      termsOfService: false,
      managerEmail: "",
      managerPassword: "",
      managerTermsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // forgotEmail: (value) =>
      //   /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value) =>
        value.length !== 0 ? null : "Please enter a password",
    },
  });

  const getLoginManager = async () => {
    console.log(form.getInputProps("password").value);

    const user: any = await client.request(AUTH_MUTATION, {
      email: form.getInputProps("managerEmail").value,
      password: form.getInputProps("managerPassword").value,
    });

    // console.log("password", user);

    if (user?.authenticateUserWithPassword?.message) {
      return alert("invalid credentials");
    } else {
      console.log("dd", user?.authenticateUserWithPassword?.item);

      if (user?.authenticateUserWithPassword?.item?.role === "employee") {
        return alert("please login as user");
      }

      setLoggedIn(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);


    }
  };

  const getLogin = async () => {

    console.log(form.getInputProps("password").value);

    const user: any = await client.request(AUTH_MUTATION, {
      email: form.getInputProps("email").value,
      password: form.getInputProps("password").value,
    });


    if (user?.authenticateUserWithPassword.item) {


      console.log('inside',user?.authenticateUserWithPassword?.item)

      let response = await signIn("credentials", {
        redirect: false,
        id: user?.authenticateUserWithPassword.item.id,
        name: user?.authenticateUserWithPassword.item.name,
        email:user?.authenticateUserWithPassword.item.email,
        role:user?.authenticateUserWithPassword.item.role,
        company_id:user?.authenticateUserWithPassword.item?.company?.id,
        company_name:user?.authenticateUserWithPassword.item?.company?.name
      
      
      });

      console.log("ssss", response?.error);

      if (response?.error) { 
        return alert("invalid credentials");
      }
      
      if (!response?.error) {
        console.log(response.error);
        return router.push("/");
      }
      
    }


    if (user?.authenticateUserWithPassword?.message) {
      return alert("invalid credentials");
    } else {


      


   
    }
  };

  const savePassword = async () => {
    console.log("sp");

    if (form.getInputProps("forgotPassword").value.length < 8) {
      return toast("password should have atleast 8 characters", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    const verifyCode = await client.request(GET_CODE, {
      where: {
        value: {
          equals: form.getInputProps("code")?.value,
        },
      },
    });

    console.log("verifyCode", verifyCode);

    if (verifyCode.codes.length > 0) {
      if (verifyCode?.codes[0].expire) {
        return toast("code expired restart process", {
          className: "black-background",
          bodyClassName: "grow-font-size",
          progressClassName: "fancy-progress-bar",
        });
      }

      const code: any = await client.request(updateCode, {
        where: {
          id: verifyCode?.codes[0].id,
        },
        data: {
          expire: true,
        },
      });

      console.log("code expired", code);

      const user: any = await client.request(updateUser, {
        where: {
          email: form.getInputProps("forgotEmail")?.value,
        },
        data: {
          password: form.getInputProps("forgotPassword")?.value,
        },
      });

      // console.log('user',user)

      if (user.updateUser) {
        const button = document.getElementById("forgotPasswordClose");

        const check = await sendPassword(
          form.getInputProps("forgotPassword")?.value
        );

        setTimeout(() => {
          button?.click();
          // setFlag(!flag);
          router.refresh();

          form.setValues({
            enablePassword: false,
            email: "",
            code: "",
            password: "",
            forgotEmail: "",
            forgotPassword: "",
            termsOfService: false,
            managerEmail: "",
            managerPassword: "",
            managerTermsOfService: false,
          });

          return toast("password updated", {
            className: "green-background",
            bodyClassName: "grow-font-size",
            progressClassName: "fancy-progress-bar",
          });
        }, 1000);

        
      }
    } else {
      return toast("invalid code", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    // console.log('up',user)
  };

  const signInProceed = (e) => {
    
    e.preventDefault();

    if(form.validate().hasErrors) {

      console.log('inside',form.validate())
      return

    }

    console.log(form.getInputProps("email").value);

    getLogin();


  };

  const signInManager = (e) => {
    e.preventDefault();

    console.log(form.getInputProps("email").value);

    getLoginManager();
  };

  function generateOTP() {
    // Declare a digits variable
    // which stores all digits
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  console.log("OTP of 4 digits: ");
  console.log(generateOTP());

  useEffect(() => {}, []);

  const sendEmails = async (code) => {
    console.log("rec", code);

    const recipients = {
      to: form.getInputProps("forgotEmail")?.value,
      subject: "change password code ",
      text: `your code for password change ${code} `,
    };

    console.log("rec", recipients);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: [recipients],
        }),
      });

      if (response.ok) {
        console.log("Emails sent successfully");
        return true;
      } else {
        console.error("Failed to send emails");
        return false;
      }
    } catch (error) {
      console.error("Error sending emails:", error.message);
    }
  };

  const sendPassword = async (code) => {
    console.log("codeing", code);

    const recipients = {
      to: form.getInputProps("forgotEmail")?.value,
      subject: ` password change `,
      text: `your new password is ${code} `,
    };

    console.log("rec", recipients);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: [recipients],
        }),
      });

      if (response.ok) {
        console.log("Emails sent successfully");
        return true;
      } else {
        console.error("Failed to send emails");
        return false;
      }
    } catch (error) {
      console.error("Error sending emails:", error.message);
    }
  };

  const forgotPassword = async () => {
    console.log("forgot-password-hitting");

    if (!/^\S+@\S+$/.test(form.getInputProps("forgotEmail")?.value)) {
      return toast("email is not valid", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    const user = await client.request(GET_USER, {
      where: {
        email: form.getInputProps("forgotEmail")?.value,
      },
    });

    console.log("userCredentails", user);

    if (!user.user) {
      return toast("email is not valid", {
        className: "black-background",
        bodyClassName: "grow-font-size",
        progressClassName: "fancy-progress-bar",
      });
    }

    if (user?.user) {
      const user = await client.request(createCode, {
        data: {
          value: generateOTP(),
          expire: false,
        },
      });

      console.log("code created", user);

      if (user?.createCode) {
        form.setFieldValue("codeId", user?.createCode.value);

        const check = await sendEmails(user.createCode.value);

        console.log("check1111", check);

        if (check) {
          form.setFieldValue("enablePassword", true);

          toast("code sent to your mail", {
            className: "green-background",
            bodyClassName: "grow-font-size",
            progressClassName: "fancy-progress-bar",
          });
        }
      }
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="forgotPassword"
        tabindex="-1"
        aria-labelledby="forgotPassword"
        aria-hidden="true"
      >
        <form>
          <div class="modal-dialog">
            <div class="modal-content login">
              <div class="modal-header">
                <div className="custom-align">
                  {/* <img className="experience-icon" src="images/education.svg" /> */}

                  <h6> Change Password </h6>
                </div>

                <div>
                  <img
                    id="forgotPasswordClose"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    className="modal-close-icon"
                    src={"images/Close.svg"}
                  />
                </div>
              </div>
              <div class="modal-body">
                <Paper p="md">
                  <form>
                    <Group
                      position="center"
                      mt="xl"
                      style={{
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      {/* <div className="profile-upload">
        {formData.photograph && <img src={formData.photograph} />}
        {formData.photogarph}
      </div> */}

                      <Container
                        px="xs"
                        style={{
                          width: "100%",
                        }}
                        className=""
                      >
                        <div
                          className=""
                          style={{
                            width: "100%",
                          }}
                        >
                          <Paper
                            // shadow="xl"
                            // p="md"
                            style={{
                              width: "100%",

                              // padding:"16px"
                            }}
                          >
                            <div className="mb-6">
                              <TextInput
                                withAsterisk
                                size="lg"
                                placeholder="Enter Email"
                                styles={(theme) => ({
                                  "& .mantine-Container-root": {
                                    width: "100%",
                                  },

                                  input: {
                                    padding: "22px !important",
                                    borderRadius: "6px !important",
                                  },
                                })}
                                {...form.getInputProps("forgotEmail")}
                              />
                            </div>

                            {form.getInputProps("enablePassword").value ===
                              true && (
                              <div className="mb-8">
                                <div className="">
                                  <TextInput
                                    withAsterisk
                                    size="lg"
                                    placeholder="Enter Code"
                                    styles={(theme) => ({
                                      "& .mantine-Container-root": {
                                        width: "100% !important",
                                      },

                                      input: {
                                        padding: "22px !important",
                                        borderRadius: "6px !important",
                                      },
                                    })}
                                    {...form.getInputProps("code")}
                                  />

                                  <PasswordInput
                                    // id="myInput"
                                    withAsterisk
                                    radius="md"
                                    size="lg"
                                    className="rounded mt-4"
                                    placeholder="new Password"
                                    // type="password"
                                    visibilityToggleIcon={({ reveal }) =>
                                      reveal ? (
                                        <IconEyeCheck
                                          style={{
                                            width: "var(--psi-icon-size)",
                                            height: "var(--psi-icon-size)",
                                          }}
                                        />
                                      ) : (
                                        <IconEyeOff
                                          style={{
                                            width: "var(--psi-icon-size)",
                                            height: "var(--psi-icon-size)",
                                          }}
                                        />
                                      )
                                    }
                                    styles={(theme) => ({
                                      input: {
                                        padding: "22px !important",
                                        borderRadius: "6px !important",
                                      },
                                    })}
                                    defaultValue="password"
                                    {...form.getInputProps("forgotPassword")}
                                  />
                                </div>
                              </div>
                            )}

                            {form.getInputProps("enablePassword")?.value ===
                            true ? (
                              <button
                                type="button"
                                class="save-btn-modal-footer"
                                style={{
                                  width: "100%",
                                }}
                                onClick={() => savePassword()}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                type="button"
                                class="save-btn-modal-footer"
                                style={{
                                  width: "100%",
                                }}
                                onClick={() => forgotPassword()}
                              >
                                next
                              </button>
                            )}
                          </Paper>
                        </div>
                      </Container>
                    </Group>
                  </form>
                </Paper>
              </div>
              {/* 
          <div class="modal-footer">
         
          </div> */}
            </div>
          </div>
        </form>
      </div>

      <div
        className="flex flex-wrap justify-between "
        style={{
          height: "100vh",
        }}
      >
        <div className="responsive-image h-full relative">
          <img
            src="./images/login.png"
            alt="Your Image"
            className="h-full w-full object-cover"
          />
          <div className="absolute  bottom-40 -left-10 lg:bottom-0 lg:left-0 mb-4 flex flex-col items-start justify-start">
            <h1 className="text-[50px] font-extrabold text-white pl-28">
              Sign in
            </h1>
          </div>
        </div>

        <div className="responsive-image1 mt-4">
          <div className="p-8 lg:p-24 flex items-center justify-center">
            <form className="w-full">
              <h2 className="mb-4 text-[22px] items-start justify-start flex font-medium">
                CloudActive Admin / Partner Manager / User Sign In
              </h2>
              <div className="mb-6">
                <TextInput
                  withAsterisk
                  size="lg"
                  placeholder="Enter Email"
                  styles={(theme) => ({
                    input: {
                      padding: "22px !important",
                      borderRadius: "6px !important",
                    },
                  })}
                  {...form.getInputProps("email")}
                />
              </div>

              <div className="mb-8">
                <PasswordInput
                  // id="myInput"
                  withAsterisk
                  radius="md"
                  size="lg"
                  className="rounded"
                  placeholder="Password"
                  // type="password"
                  visibilityToggleIcon={({ reveal }) =>
                    reveal ? (
                      <IconEyeCheck
                        style={{
                          width: "var(--psi-icon-size)",
                          height: "var(--psi-icon-size)",
                        }}
                      />
                    ) : (
                      <IconEyeOff
                        style={{
                          width: "var(--psi-icon-size)",
                          height: "var(--psi-icon-size)",
                        }}
                      />
                    )
                  }
                  styles={(theme) => ({
                    input: {
                      padding: "22px !important",
                      borderRadius: "6px !important",
                    },
                  })}
                  defaultValue="password"
                  {...form.getInputProps("password")}
                />
              </div>

              <p
                className="cursor"
                data-bs-toggle="modal"
                data-bs-target="#forgotPassword"
              >
                {" "}
                Forgot password{" "}
              </p>

              <Group position="left" mt="md">
                <button
                  type="submit"
                  className="text-white bg-[#4D47C3]  px-40 py-3 w-full  font-semibold rounded-[8px] text-sm hover-bg-[#7973ef]"
                  onClick={(e) => signInProceed(e)}
                >
                  Login
                </button>
              </Group>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
