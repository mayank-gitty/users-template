import {
    Button,
    Stack,
    Input,
    Avatar,
    Indicator,
    ActionIcon,
    TextInput,
    Grid,
    SimpleGrid,
    PasswordInput,
    MediaQuery,
  } from "@mantine/core";
  import { IconMail, IconPhone, IconAlignJustified } from "@tabler/icons";
  import { Card, Image, Text, Badge, Group } from "@mantine/core";
  // import {AUTH_MUTATION} from '../lib/authentication'
  import { useMutation, gql } from "@apollo/client";
  import router from "next/router";
  import React, { Component, useState } from "react";
  
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
  
  export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const [SigninFunc, { data: res, error }] = useMutation(AUTH_MUTATION, {
      onCompleted(data) {
        if (
          data.authenticateUserWithPassword.__typename ===
          "UserAuthenticationWithPasswordSuccess"
        ) {
          // sessionStorage.setItem(
          //   "token",
          //   data?.authenticateUserWithPassword?.sessionToken
          // );
  
          // sessionStorage.setItem(
          //   "state",
  
          //   data?.authenticateUserWithPassword?.item?.company[0]?.state
          // );
          // notifySuccesse();
  
          router.push("/");
        } else {
          // notifyFailure();
        }
      },
    });
  
    return (
      <>
        <Stack
          spacing={1}
          sx={{
            "@media (max-width: 460px)": {
              marginLeft: "11px",
              marginRight: "11px",
            },
          }}
        >
          <form>
            <TextInput
              placeholder="Enter Your Email Address"
              mt="xl"
              radius="md"
              size="sm"
              label="Email address"
              // sx={{
              //   "@media (max-width:460px)": {
              //     fontSize: "14px",
              //     fontWeight: "400",
              //   },
              // }}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              rightSection={<IconMail size={16} color="#333333" />}
            />
            <PasswordInput
              placeholder="Enter Your Password"
              mt="xl"
              radius="md"
              size="sm"
              label="Password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <Button
              mt="lg"
              size="sm"
              sx={{
                backgroundColor: "#FF6B00",
                "@media (max-width: 460px)": {
                  backgroundColor: "#FF6B00",
                },
              }}
              fullWidth
              onClick={() => {
                SigninFunc({ variables: { ...data } });
              }}
            >
              Sign in
            </Button>
          </form>
        </Stack>
      </>
    );
  }
  