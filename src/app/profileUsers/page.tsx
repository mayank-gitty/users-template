"use client"

import React, { use, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { link } from "fs";
import { useRouter } from "next/navigation";
import { PROFILE_USERS } from "@/util/queries";

// Define mutation


const DatatablePage = () => {
  const [main, setMain] = useState();

  const router = useRouter()

  const getData = async () => {
    const user: any = await client.request(PROFILE_USERS,{
      "orderBy": [
        {
          "createdAt": "asc"
        }
      ]
    });

    console.log("mm", user);

    const users = user.profileUsers.map((item: any) => {
      return {
        user:item?.user?.name,  
        // resume_headline: item.resume_headline,
        // total_experience: item.total_experience,
        // relevant_experience: item.relevent_experience,
        // profile_summary: item.profile_summary,
        company:item?.user?.company?.name,
        photograph: <img src={item?.photograph} />,
        // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        itskills: item.itskills.map((u: any) => u.name).join(", "),
        action:<button className="btn btn-primary" onClick={()=>router.push(`/edit_master?id=${item.id}`)} > edit </button>,
        view:<button className="btn btn-primary" onClick={()=>router.push(`/view_master?id=${item.id}`)} > view </button>,
        resume:item.resume ? <a  target="_blank"  className="resume-link"   href={item.resume} > view  resume </a> : ''        
        // education: item.education.course,
        // user: item?.user?.name,
        // company: item?.user?.company?.map((u: any) => u.name).join(", "),
      };
    });

    const test: any = {
      columns: [
        // {
        //   label: "Name",
        //   field: "user",
        //   sort: "asc",
        //   width: 150,
        // },
        // {
        //   label: "resume_headline",
        //   field: "resume_headline",
        //   sort: "asc",
        //   width: 150,
        // },
        // {
        //   label: "Photograph",
        //   field: "photograph",
        //   sort: "asc",
        //   width: 270,
        // },
        {
          label: "Name",
          field: "user",
          sort: "disabled",
          width: 200,
        },
        // {
        //   label: "Photograph",
        //   field: "photograph",
        //   sort: "disabled",
        //   width: 200,
        // },
        {
          label: "Company",
          field: "company",
          sort: "disabled",
          width: 200,
        },
        // {
        //   label: "Resume Headline",
        //   field: "resume_headline",
        //   sort: "disabled",
        //   width: 200,
        // },
        {
          label: "Key skills",
          field: "keyskills",
          sort: "disabled",
          width: 100,
        },
        // {
        //   label: "Education",
        //   field: "education",
        
        //   sort: "asc",

        //   width: 150,
        // },
        {
          label: "It Skills",
          field: "itskills",

          sort: "disabled",
          width: 100,
        },
        // {
        //   label: "Total Experience",
        //   field: "total_experience",
        //   sort: "disabled",
        //   width: 100,
        // },
        // {
        //   label: "Relevant Experience",
        //   field: "relevant_experience",
        //   sort: "disabled",
        //   width: 100,
        // },
        // {
        //   label: "Profile Summary",
        //   field: "profile_summary",
        //   sort: "disabled",
        //   width: 100,
        // },
        {
          label: "Resume",
          field: "resume",
          sort: "disabled",
          width: 100,
        },
        {
          label: "View",
          field: "view",
          sort: "disabled",
          width: 100,
        },
        {
          label: "Action",
          field: "action",
          sort: "disabled",
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
    <div className="profile-table">
      <MDBDataTable   bordered small data={main} />
    </div>
  );
};

export default DatatablePage;
