"use client"
import { useEffect } from 'react';
import { Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useTransition } from "react";
import client from "../../../helpers/request";

const AUTH_MUTATION = gql`
mutation signin($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      item {
        id
        name
        email
        phone
      }
      sessionToken
    }
    ... on UserAuthenticationWithPasswordFailure {
      message
    }
  }
}
`;
const Login = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length !== 0 ? null : 'Please enter a password',
    },
  });

  useEffect(() => {
    // Code that runs on the client side
    // You can use form here
  }, []); // Empty dependency array ensures this runs only on client side

  return (
    <div className="flex items-center justify-center " style={{marginTop:'5%'}}>
      <div className="p-5 w-[56%] h-2/3">
        <div className="form-box bg-gray-700 rounded-lg p-8 ">
          <form>
            <h2 className="text-white mb-4 text-[34px] items-center justify-center flex font-semibold">Sign In</h2>
            <p className="text-white mb-8 flex items-center justify-center">Login to stay connected</p>
            <div className="mb-6">
              <TextInput
                withAsterisk
                placeholder="Email"
                styles={(theme) => ({
                  input: {
                    padding: '22px !important',
                    borderRadius: '12px !important',
                  },
                })}
                {...form.getInputProps('email')}
              />
            </div>
            <div className="mb-8">
              <TextInput
                withAsterisk
                radius="md"
                className="rounded"
                placeholder="Password"
                type="password"
                styles={(theme) => ({
                  input: {
                    padding: '22px !important',
                    borderRadius: '12px !important',
                  },
                })}
                {...form.getInputProps('password')}
              />
            </div>
            <div className="flex mt-2">
              <input
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                id="checked-checkbox"
                type="checkbox"
                className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="checkbox text-white mb-2 -translate-y-1">
                Remember me
              </label>
            </div>
            <Group position="left" mt="md">
              <button
                type="submit"
                className="text-gray-800 bg-gray-200  px-4 py-2 w-full  font-semibold rounded-[8px] text-sm hover:bg-violet-100"
              >
                Sign in
              </button>
            </Group>
            <h6 className="text-white mt-4 flex items-center justify-center">Create an Account Signup</h6>
          </form>
        </div>
        {/* <div className="image-box rounded-r-[18px] bg-white flex items-center">
          <Image src={boy} alt="image" className={`h-80 w-full`} />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
