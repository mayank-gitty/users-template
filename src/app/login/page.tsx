"use client";
import { useEffect } from "react";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useTransition } from "react";
import client from "../../../helpers/request";
import useThemeContext from "@/context/context";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { AUTH_MUTATION } from "@/util/mutationQueries";

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
      email: "",
      password: "",
      termsOfService: false,
      managerEmail: "",
      managerPassword: "",
      managerTermsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
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

      localStorage.setItem(
        "token",
        user?.authenticateUserWithPassword?.sessionToken
      );
      localStorage.setItem("id", user?.authenticateUserWithPassword?.item?.id);
      localStorage.setItem(
        "name",
        user?.authenticateUserWithPassword?.item?.name
      );
      localStorage.setItem(
        "role",
        user?.authenticateUserWithPassword?.item?.role
      );
      localStorage.setItem(
        "company",
        user?.authenticateUserWithPassword?.item?.company?.name
      );

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

    if (user?.authenticateUserWithPassword?.message) {
      return alert("invalid credentials");
    } else {
      console.log("dd", user?.authenticateUserWithPassword?.item);

      // if (user?.authenticateUserWithPassword?.item?.role === "manager") {
      //   return alert("please  login as manager  ");
      // }

      // if (user?.authenticateUserWithPassword?.item?.role === "admin") {
      //   return alert("please login as admin");
      // }

      localStorage.setItem(
        "token",
        user?.authenticateUserWithPassword?.sessionToken
      );
      localStorage.setItem("id", user?.authenticateUserWithPassword?.item?.id);
      localStorage.setItem(
        "name",
        user?.authenticateUserWithPassword?.item?.name
      );
      localStorage.setItem(
        "role",
        user?.authenticateUserWithPassword?.item?.role
      );
      localStorage.setItem(
        "company",
        user?.authenticateUserWithPassword?.item?.company?.name
      );

      setLoggedIn(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  const signIn = (e) => {
    e.preventDefault();

    console.log(form.getInputProps("email").value);

    getLogin();
  };

  const signInManager = (e) => {
    e.preventDefault();

    console.log(form.getInputProps("email").value);

    getLoginManager();
  };

  useEffect(() => {}, []);

  return (
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
                  <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
 
                ) : (
                  <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
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

            <Group position="left" mt="md">
              <button
                type="submit"
                style={{
                  boxShadow:
                    "0px 3.99645px 60.94586px 0px rgba(77, 71, 195, 0.40)",
                }}
                className="text-white bg-[#4D47C3]  px-40 py-3 w-full  font-semibold rounded-[8px] text-sm hover-bg-[#7973ef]"
                onClick={(e) => signIn(e)}
              >
                Login
              </button>
            </Group>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
