"use client";

import React, { use, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { link } from "fs";
import { useRouter } from "next/navigation";
import { PROFILE_USERS } from "@/util/queries";
import { USERS } from "../../util/queries";

import { Select } from "@mantine/core";

import { useForm } from "@mantine/form";



const COMPANIES = gql`
  query Query {
    companies {
      name
      id
    }
  }
`;

// Define mutation

const DatatablePage = () => {
  const [main, setMain] = useState();
  const [alldata, setAllData] = useState([]);



  const form = useForm({
    initialValues: {
      userId: "",
      company: "",
      companies: [],
      entries: [
        {
          userName: "",
          mobileNumber: "",
          email: "",
          address: "",
          //   company: "",
          key: 0,
        },
      ],
      date: new Date(),
    }})

  const router = useRouter();


  
  const getData = async () => {



    const user: any = await client.request(USERS, {
      where: {

          role: {
            equals: "employee",
          },
          //   company: {
          //     name: {
          //       equals: localStorage.getItem('company')
          //     }
          //   }
        // },
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });

    console.log("userInsssss", user);

    const users = user.users.map((item: any) => {
      return {
        user: item?.name,
        company: item?.company?.name,
        phone: item?.phone,
        address: item?.address,
        // photograph: <img src={item?.photograph} />,
        // // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        itskills: item.itskills.map((u: any) => u.name).join(", "),
        // action: (
        //   <button
        //     className="table-button"
        //     onClick={() => router.push(`/edit_master?id=${item.id}`)}
        //   >
        //     {" "}
        //     edit{" "}
        //   </button>
        // ),
        action: (


          <button
            className="table-button"
            onClick={() => router.push(`/view_master?id=${item.id}`)}
          >
            {" "}
            edit  {" "}
          </button>


        ),
        resume: item.resume ? (
          <a
            download={
              item.resume.includes("docx") || item.resume.includes("doc")
                ? true
                : false
            }
            target="_blank"
            className="resume-link"
            href={item.resume}
          >
            {" "}
            view resume{" "}
          </a>
        ) : (
          ""
        ),
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
        {
          label: "Phone",
          field: "phone",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Address",
          field: "address",
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
    var element: any = document.getElementsByClassName("table-bordered");

    console.log(element);

    if (element) {
      // console.log("ll", element);
      element[0]?.classList?.remove("table-bordered");
    }

    getData();

    getComapanies()
  }, []);


  const getComapanies = async () => {
    const users: any = await client.request(COMPANIES);

    console.log("usersaa", users);

    const DefaultSkills = users?.companies?.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    form.setFieldValue("companies", DefaultSkills);
  };



  const filterResults= async (e:any)=>{

    const user: any = await client.request(USERS, {
      where: {

          role: {
            equals: "employee",
          },
            company: {
              id: {
                equals: e
              }
            }
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });

    console.log("userInsssss", user);


    console.log('e',e,alldata)

    const users = user.users.map((item: any) => {
      return {
        user: item?.name,
        company: item?.company?.name,
        phone: item?.phone,
        address: item?.address,
        // photograph: <img src={item?.photograph} />,
        // // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        itskills: item.itskills.map((u: any) => u.name).join(", "),
        // action: (
        //   <button
        //     className="table-button"
        //     onClick={() => router.push(`/edit_master?id=${item.id}`)}
        //   >
        //     {" "}
        //     edit{" "}
        //   </button>
        // ),
        action: (


          <button
            className="table-button"
            onClick={() => router.push(`/view_master?id=${item.id}`)}
          >
            {" "}
            edit  {" "}
          </button>


        ),
        resume: item.resume ? (
          <a
            download={
              item.resume.includes("docx") || item.resume.includes("doc")
                ? true
                : false
            }
            target="_blank"
            className="resume-link"
            href={item.resume}
          >
            {" "}
            view resume{" "}
          </a>
        ) : (
          ""
        ),
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
        {
          label: "Phone",
          field: "phone",
          sort: "disabled",
          width: 200,
        },
        {
          label: "Address",
          field: "address",
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
          label: "Action",
          field: "action",
          sort: "disabled",
          width: 100,
        },

      ],
      rows: users,
    };



    
    setMain(test);

  }

  return (
    <div className="table-wrapper ">
      <div className="page-heading   pt-2 pb-2  twenty-percent">
        <h2
          className="page-main-heading mt-2 px-4"
        >
          {" "}
          Employees profile{" "}

          <Select
          
          styles={(theme) => ({
            input: {
              height: "100%",
            },
            values: {
              height: "100%",
            },
            root: {
              // height: "50px",
              margin:"10px 0",
              width:"14rem",
              marginBottom:"1rem"
            },

            leftIcon: {
              marginRight: theme.spacing.md,
            },
          })}
                  // label="Please select company"
                  placeholder="Please select company"
                  // {...form.getInputProps(`company`)}

    
                  data={form.getInputProps("companies").value}

                  onChange={(e)=>filterResults(e)}
                />
        </h2>
      </div>
      <div className="profile-table mt-3">
        <MDBDataTable bordered small data={main} />
      </div>
    </div>
  );
};

export default DatatablePage;
