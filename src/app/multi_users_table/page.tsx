"use client"

import React, { use, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { link } from "fs";

// Define mutation
const PROFILE_USERS = gql`
query MultipleUsers {
  multipleUsers {
    name
    mobilenumber
    email
    address
  }
}
`;

const DatatablePage = () => {
  const [main, setMain] = useState();

  const getData = async () => {
    const user: any = await client.request(PROFILE_USERS);

    // console.log("mm", user);

    const users = user?.multipleUsers.map((item: any) => {
      return {
        name: item.name,
        email: item.email,
        address: item.address,
        mobilenumber: item.mobilenumber,
        // photograph: <img src={item?.photograph?.url} />,
        // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        // keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        // itskills: item.itskills.map((u: any) => u.name).join(", "),
        // education: item.education.course,
        // user: item?.user?.name,
        // company: item?.user?.company?.map((u: any) => u.name).join(", "),
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
          field: "mobilenumber",
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
        // {
        //   label: "Keyskills",
        //   field: "keyskills",
        //   sort: "asc",
        //   width: 100,
        // },
        // {
        //   label: "Education",
        //   field: "education",
        //   sort: "asc",
        //   width: 150,
        // },
        // {
        //   label: "Itskills",
        //   field: "itskills",
        //   sort: "asc",
        //   width: 100,
        // },
        // {
        //   label: "Total Experience",
        //   field: "total_experience",
        //   sort: "asc",
        //   width: 100,
        // },
        // {
        //   label: "Relevant Experience",
        //   field: "relevant_experience",
        //   sort: "asc",
        //   width: 100,
        // },
        // {
        //   label: "Profile Summary",
        //   field: "profile_summary",
        //   sort: "asc",
        //   width: 100,
        // },
        // {
        //   label: "Resume",
        //   field: "resume",
        //   sort: "asc",
        //   width: 100,
        // },
      ],
      rows: users,
    };

    setMain(test);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="profile-table">
      <MDBDataTable bordered small data={main} />
    </div>
  );
};

export default DatatablePage;
