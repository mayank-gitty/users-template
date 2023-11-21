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

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length !== 0 ? null : "Please enter a password",
    },
  });

  const getLogin = async () => {
    console.log(form.getInputProps("password").value);

    const user: any = await client.request(AUTH_MUTATION, {
      email: form.getInputProps("email").value,
      password: form.getInputProps("password").value,
    });

    console.log("password", user);

    if (user?.authenticateUserWithPassword?.message) {
      return alert("invalid credentials");
    } else {
      localStorage.setItem(
        "token",
        user?.authenticateUserWithPassword?.sessionToken
      );
      localStorage.setItem("id", user?.authenticateUserWithPassword?.item?.id);
      localStorage.setItem(
        "name",
        user?.authenticateUserWithPassword?.item?.name
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

  useEffect(() => {}, []);

  return (
    <div className="flex flex-wrap justify-between h-screen">
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
          {/* <div className="text-[35px] font-semibold text-white pl-28">
            Lorem Ipsum is simply
          </div> */}
          <div className="text-[16px] font-bold text-white pl-28">
            If you don’t have an account, register
          </div>
          <div className="text-[16px] font-bold text-white pl-28">
            You can <span className="text-[#DAFF70]">Register here !</span>
          </div>
        </div>
      </div>

      <div className="responsive-image1 mt-4">
        <div className="p-8 lg:p-24 flex items-center justify-center">
          <form className="w-full">
            <h2 className="mb-4 text-[40px] items-start justify-start flex font-medium">
              Sign In
            </h2>
            <div className="mb-6">
              <TextInput
                withAsterisk
                size="lg"
                placeholder="Enter Email or username"
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
                withAsterisk
                radius="md"
                size="lg"
                className="rounded"
                placeholder="Password"
                type="password"
                visibilityToggleIcon={({ reveal, size }) =>
                  reveal ? (
                    <IconEyeOff size={size} />
                  ) : (
                    <IconEyeCheck size={size} />
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

            <div className="flex justify-end items-end text-[#B0B0B0] text-sm">
              Forgot password?
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
            <h6 className="text-[#B0B0B0] font-medium mt-10 flex items-center justify-center">
              or continue with
            </h6>
            <Group mt="md">
              <Button
                variant="light"
                leftIcon={
                  <img
                    src="./images/google.png"
                    alt="Google"
                    className="mr-2 "
                  />
                }
                className="text-[#4285F4] bg-[#E9F1FF] px-8 h-[55px] font-semibold rounded-[8px] text-md hover-bg-[#d7d8db]"
              >
                Sign in with Google
              </Button>
              <img
                src="./images/facebook.png"
                alt="Google"
                className="mr-1 ml-0 md:mr-2 md:ml-3"
              />
              <img
                src="./images/apple.png"
                alt="Google"
                className="mr-0 md:mr-2"
              />
            </Group>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
