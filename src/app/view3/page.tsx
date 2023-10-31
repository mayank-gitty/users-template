"use client";

import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useSearchParams } from "next/navigation";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  MultiSelect,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { serialize } from "v8";

const cardStyle = {
  width: '400px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  padding: '10px',
  backgroundColor: '#fff',
  margin: '5px',
};

const imageStyle = {
  maxWidth: '100%',
  borderRadius: '100%',

};

const titleStyle = {
  fontSize: '20px',
  margin: '10px 0',
};

const textStyle = {
  color: '#555',
};

const updateUser = gql`
  mutation Mutation(
    $where: ProfileUserWhereUniqueInput!
    $data: ProfileUserUpdateInput!
  ) {
    updateProfileUser(where: $where, data: $data) {
      total_experience
    }
  }
`;

const options = [
  { value: "doctorate/phd", label: "Doctorate/Phd" },
  { value: "masters/post-graduation", label: "Masters/Post-Graduation" },
  { value: "graduation/diploma", label: "Graduation/Diploma" },
  { value: "12th", label: "12th" },
  { value: "10th", label: "10th" },
  { value: "below10th", label: "Below 10th" },
];

const IT_SKILLS = gql`
  query ItSkills {
    itSkills {
      name
      id
    }
  }
`;

// Define mutation
const KEY_SKILLS = gql`
  query KeySkills {
    keySkills {
      name
      id
    }
  }
`;

const PROFILE_USER = gql`
  query ProfileUser($where: ProfileUserWhereUniqueInput!) {
    profileUser(where: $where) {
      user {
        name
        id
        email
      }
      total_experience
      resume_headline
      relevent_experience
      profile_summary
      photograph
      keyskillsCount
      keyskills {
        name
        id
      }
      itskills {
        name
        id
      }
      education
    }
  }
`;

export interface IAppProps {}

export default function View(props: IAppProps) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const router = useRouter();

  const form: any = useForm({
    initialValues: {
      allItskills: [],
      allKeyskills: [],
      itskills: [],
      education: null,
      keyskills: [],
      resume_headline: "",
      profile_summary: "",
      total_experience: "",
      relevent_experience: "",
      photograph: "",
      name:""
    },
    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));

      uploadToServer(i);
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    console.log("image-file111111", event.name);
    body.append("image-file1", event);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    // console.log('mk',response)

    if (response.ok) {
      alert("uploaded succesfully");

      form.setFieldValue("photograph", `uploads/${event?.name}`);
    }
  };

  const searchParams: any = useSearchParams();

  const search = searchParams.get("id");

  console.log("skils", form.getInputProps("itskills").value);

  const getData = async (search: any) => {
    console.log("id", search);

    const user: any = await client.request(PROFILE_USER, {
      where: {
        id: search,
      },
    });

    console.log("user", user);

    form.setValues({
      itskills: user?.profileUser?.itskills.map((item: any) => item.name),
      education: user?.profileUser?.education,
      keyskills: user?.profileUser?.keyskills.map((item: any) => item.name),
      resume_headline: user?.profileUser.resume_headline,
      profile_summary: user.profileUser.profile_summary,
      total_experience: user.profileUser.total_experience,
      relevent_experience: user.profileUser.relevent_experience,
      photograph: user.profileUser.photograph,
      name:user?.profileUser?.user.name
    });
  };

  const getDatas = async () => {
    const itskills: any = await client.request(IT_SKILLS);

    const keyskills: any = await client.request(KEY_SKILLS);

    // console.log('allItskills',itskills.itSkills)

    // console.log('allKeyskills',keyskills.keySkills)

    form.setFieldValue(
      "allItskills",
      itskills?.itSkills?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      })
    );

    form.setFieldValue(
      "allKeyskills",
      keyskills?.keySkills?.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      })
    );
  };

  useEffect(() => {
    console.log("useEffect", typeof search, search);

    // getDatas();

    getData(search);

    console.log("kas", form.getInputProps("education"));
  }, [search]);

  // console.log("all-it", form.getInputProps("itskills").value);
  // console.log("all-it-ley", form.getInputProps("allItskills").value);

  const handleChange = (field: any, e: any) => {
    console.log("hitting", e);

    form.setFieldValue(field, e);
  };

  const sendAll = async (values: any) => {
    console.log("mcom", values);

    const user: any = await client.request(updateUser, {
      where: {
        id: search,
      },
      data: {
        total_experience: values.total_experience,

        resume_headline: values.resume_headline,
        relevent_experience: values.relevant_experience,
        profile_summary: values.profile_summary,
        photograph: values.photograph,
        keyskills: {
          connect: values.keyskills.map((item: any) => {
            return {
              name: item,
            };
          }),
        },
        itskills: {
          connect: values.itskills.map((item: any) => {
            return {
              // id: item,
              name:item,
            };
          }),
        },
        education: values.education,

        createdAt: new Date(),
      },
    });

    console.log("updated", user);

    setTimeout(() => {
      router.push("/profileUsers");
    }, 2000);
  };

  console.log("f", form.getInputProps("photograph").value);

  return (
    <Box mx="auto" className="view-master-page" >
      <div style={cardStyle}>
        <div className="">
          <div className="mt-2 d-flex justify-content-center align-items-center">
            <div className="view-profile-img text-center">
              <img src={form.getInputProps("photograph").value} style={{borderRadius:'100%'}} />

              
            </div>
          </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4">Name</div>
           <div className="col-8">{form.getInputProps('name').value} </div>
            </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4">Education </div>
           <div className="col-8"> {form.getInputProps('education').value} </div>
            </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4">Resume headline </div>
          <div className="col-8"> {form.getInputProps('resume_headline').value} </div>
            </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4"> Profile summary </div>
            <div className="col-8"> {form.getInputProps('profile_summary').value} </div>    
          </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4"> Total experience</div>
            <div className="col-8"> {form.getInputProps('total_experience').value} </div>
          </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4">Relevent experience </div>
            <div className="col-8"> {form.getInputProps('relevent_experience').value} </div>        
          </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4">It skils</div>
            <div className="col-8"> {form.getInputProps('itskills') .value} </div>
           
          </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-12 row mx-auto">
            <div className="col-4"> Key skills </div>
            <div className="col-8"> {form.getInputProps('keyskills').value} </div>
            
          </div>
        </div>
        {/* <div className="education row mt-4">    
          <div className="col-10 row mx-auto">
            <div className="col-6"> education </div>
           <div className="col-6"> {form.getInputProps('education').value} </div>
            <div className="col-6"> {form.getInputProps('profile_summary').value} </div>
            <div className="col-6"> {form.getInputProps('total_experience').value} </div>
            <div className="col-6"> {form.getInputProps('relevent_experience').value} </div>
            <div className="col-6"> {form.getInputProps('resume_headline').value} </div>
            <div className="col-6"> {form.getInputProps('itskills').value.item} </div>
            <div className="col-6"> {form.getInputProps('relevent_experience').value} </div>
            
          </div>
        </div>
        <div className="education row mt-4">    
          <div className="col-10 row mx-auto">
            <div className="col-6"> education </div>
           <div className="col-6"> {form.getInputProps('education').value} </div>
            <div className="col-6"> {form.getInputProps('profile_summary').value} </div>
            <div className="col-6"> {form.getInputProps('total_experience').value} </div>
            <div className="col-6"> {form.getInputProps('relevent_experience').value} </div>
            <div className="col-6"> {form.getInputProps('resume_headline').value} </div>
            <div className="col-6"> {form.getInputProps('itskills').value.item} </div>
            <div className="col-6"> {form.getInputProps('relevent_experience').value} </div>
            
          </div>
        </div> */}
      </div>
     
    </Box>
  );
}
