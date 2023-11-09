"use client";
import { useEffect } from "react";
import { Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useTransition } from "react";
import client from "../../../helpers/request";
import useThemeContext from "@/context/context";
import { AUTH_MUTATION } from "@/util/mutationQueries";
import {
    IconPhoto,
    IconMessageCircle,
    IconSettings,
    IconCircleCheckFilled,
    IconVideo,
    IconCircleOff,
    IconVideoOff
  } from "@tabler/icons-react";
import Link from "next/link";
  

const Thanku = () => {
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

  useEffect(() => {
    // Code that runs on the client side
    // You can use form here
  }, []); // Empty dependency array ensures this runs only on client side

  return (
    <div
    className="flex items-center justify-center"
    style={{ marginTop: "5%" }}
  >
    <div className="p-5 w-[56%] h-2/3">
      <div className="form-box bg-black rounded-lg p-16">
        <form>
            <div  className="items-center justify-center flex text-white font-extrabold ">
            <IconCircleCheckFilled size={90} className="items-center justify-center flex text-white font-extrabold"/>
            </div>
          <h2 className="text-white mb-4 text-[34px] items-center justify-center flex font-semibold mt-3">
            Your Details submitted successfully!
          </h2>
          <p className="text-white mb-8 flex items-center justify-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
  
          <div className="flex space-x-4">
            <div className="w-1/2">
              <button
                type="submit"
                className="text-gray-800 bg-gray-200 flex items-center justify-center px-4 py-2 w-full  font-semibold rounded-[8px] text-sm hover:bg-violet-100"
              >
                Go back
              </button>
            </div>
            <div className="w-1/2">
              <Link href="/profile">
              <button
                type="submit"
                
                className="text-gray-800 bg-gray-200 flex items-center justify-center px-4 py-2 w-full font-semibold rounded-[8px] text-sm hover:bg-violet-100"
              >
                View profile
              </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Thanku;
