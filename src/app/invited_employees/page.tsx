"use client";

import React, { use, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { useRouter } from "next/navigation";
import useThemeContext from "@/context/context";
import { HAS_MASTER } from "@/util/queries";

// Define mutation

const USERS = gql`
  query Users($where: UserWhereInput!) {
    users(where: $where) {
      name
      id
      company {
        name
      }
      role
      email
      phone
      address
    }
  }
`;

const DatatablePage = () => {
  const [main, setMain] = useState();

  const router = useRouter();

  const {
    profileName,
    setProfileName,
    profileId,
    setProfileId,
    formData,
    setFormData,
    active,
    setActive,
    loggedIn,
    setLoggedIn,
    hasMaster,
    sethasMaster,
    role,
    setRole,
    image,
    setImage,
    inEditPage,
    setinEditPage,
    open,
    setOpen,
    experienceOpen,
    setexperienceOpen,
    projectopen,
    setprojectOpen,
  }: any = useThemeContext();

  const checkExistingProfile = async (id: any, item: any) => {
    // console.log('id',id)

    const user: any = await client.request(HAS_MASTER, {
      where: {
        user: {
          id: {
            equals: id,
          },
        },
      },
    });

    // console.log('s',user)

    if (user?.profileUsers.length > 0) {
      return true;
    } else {
      return (
        <button
          className="create-profile"
          onClick={() => {
            setFormData({
              profileUserId: "",
              itskills: [],
              educations: [],
              projects: [],
              keyskills: [],
              resume_headline: "",
              profile_summary: "",

              experiences: [],
      
              photograph: "",
              resume: "",
            });

            setActive(0);
            setexperienceOpen(false);
            setOpen(false);
            setprojectOpen(false);

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
      },
    });

    // console.log("mm", user);

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
        action: checkExistingProfile(item.id, item),
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
          label: "Company",
          field: "company",
          sort: "asc",
          width: 100,
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
      <div className="page-heading text-left pt-2 pb-2 twenty-percent">
        <h2 className="page-main-heading px-4"> Invited employees </h2>
      </div>

      <div className="profile-table">
        <MDBDataTable data={main} />
      </div>
    </div>
  );
};

export default DatatablePage;
