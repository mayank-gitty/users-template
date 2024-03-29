"use client";
import Image from "next/image";
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
  IconVideoOff,
} from "@tabler/icons-react";

const Thanku = () => {
  const { loggedIn, setLoggedIn, role, profileUserId }: any = useThemeContext();

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

    if (user?.authenticateUserWithPassword?.message) {
      return alert("invalid credentials");
    } else {
      setLoggedIn(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    getLogin();
  };

  useEffect(() => {

  }, []); // Empty dependency array ensures this runs only on client side

  return (
    <div
      className="flex items-center justify-center"
      style={{ marginTop: "0%" }}
    >
      <div className="p-5 w-[56%] h-2/3">
        <div className="form-box bg-cream rounded-lg p-16">
          <div className="d-flex justify-content-center">
            <Image alt="" src="assets/register.svg" width={275} height={261} />
          </div>

          <div className="d-flex justify-content-center flex-column align-items-center mt-4">
            <h6 className="thank-you"> Thank You ! </h6>

            <h4 className="thank-you-message">
              {" "}
              {"Registration Successfull"}{" "}
            </h4>
          </div>

          <div className="flex space-x-4 mt-4">
            {/* <div className="w-1/2">
              <button
                type="submit"
                className="text-gray-800 bg-gray-200 flex items-center justify-center px-4 py-2 w-full  font-semibold rounded-[8px] text-sm hover:bg-violet-100"
                onClick={() => {
                  router.push(`/profile?id=${session?.user?.user?.id}`);
                }}
              >
                Go back
              </button>
            </div> */}

            {
              <div className="w-1/2 mx-auto">
                <button
                  type="button"
                  className="text-gray-800 bg-gray-200 d-flex items-center justify-content-center px-4 py-2 w-full font-semibold rounded-[8px] text-sm hover:bg-violet-100"
                  onClick={() => {
                    router.push(`/`);
                  }}
                >
                  View profile
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thanku;
