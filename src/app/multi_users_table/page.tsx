"use client";

import React, { use, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useRouter } from "next/navigation";
import { HAS_MASTER } from "@/util/queries";
import { link } from "fs";
import useThemeContext from "@/context/context";

// Define mutation

const USERS = gql`
  query Users($where: UserWhereInput!) {
    users(where: $where) {
      name
      company {
        name
      }
      role
      email
      phone
      address
      id
    }
  }
`;




const DatatablePage = () => {

  const [main, setMain] = useState();

  const {
    loggedIn,
    setLoggedIn,
    setFormData,
    setActive,
    hasMaster,
    sethasMaster,
    role,
    setRole,
    image,
    setImage,
    profileName,
    setProfileName,
    setexperienceOpen,
    setOpen,
    setprojectOpen
  }: any = useThemeContext();


  const router = useRouter()

  const checkExistingProfile = async (id: any, item: any) => {
    console.log('id',id)
  
    const user: any = await client.request(HAS_MASTER, {
      where: {
        user: {
          id: {
            equals: id,
          },
        },
      },
    });
  
    console.log('seeeing',user)
  
    if (user?.profileUsers.length > 0) {
      return true;
    } else {
      return (
        <button
          className="create-profile"
          onClick={() => {
            // setProfileName(item.name);
            setFormData({
              profileUserId: "",
              itskills: [],
              educations: [],
              projects:[],
              keyskills: [],
              resume_headline: "",
              profile_summary: "",
              total_experience_months: "",
              total_relevant_months: "",
              experiences: [],
              photograph: "",
              resume: "",
            });
            setActive(0);
            setImage(null);
            // setRole("");
            setexperienceOpen(false);
            setOpen(false);
            setprojectOpen(false);
            sethasMaster(false);
            // setProfileName("");
            router.push(
              `/profile_creation?profileId=${item.id}&profileName=${item.name}`
            );
          }}
        >
          {" "}
          create proflle{" "}
        </button>
      );
    }
  };

  const getData = async () => {
    const user: any = await client.request(USERS, {
      where: {
        role: {
          equals: "employee",
        },
        company: {
          name: {
            equals: localStorage.getItem("company"),
          },
        },
      },
    });

    console.log("mm", user);

    const users = user?.users.map((item: any) => {
      return {
        name: item.name,
        email: item.email,
        address: item?.address,
        phone: item?.phone,
        // photograph: <img src={item?.photograph?.url} />,
        // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        // keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        // itskills: item.itskills.map((u: any) => u.name).join(", "),
        // education: item.education.course,
        // user: item?.user?.name,
        company: item?.company?.name,
        action:checkExistingProfile(item.id, item)
      };
    });

    const test: any = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Mobile Number",
          field: "phone",
          sort: "asc",
          width: 150,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 270,
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
          width: 200,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 100,
        },
      ],
      rows: users,
    };

    setMain(test);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="table-wrapper">


      <div className="page-heading text-custom-left pt-2 pb-2 twenty-percent pl-15">
        <h2 className="page-main-heading mt-2"> Invited Employees </h2>
      </div>
      <div className="profile-table">
        <MDBDataTable bordered small data={main} />
      </div>
    </div>
  );
};

export default DatatablePage;
