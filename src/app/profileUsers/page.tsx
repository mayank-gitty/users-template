"use client";

import React, { use, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { link } from "fs";
import { useRouter } from "next/navigation";
import { PROFILE_USERS } from "@/util/queries";
import { USERS } from "../../util/queries";

import { useSession } from "next-auth/react";



// Define mutation

const DatatablePage = () => {
  const [main, setMain] = useState();

  const router = useRouter();

  const session = useSession()

  const getData = async () => {

    const user: any = await client.request(USERS, {
      where: {

          role: {
            equals: "employee",
          },
            company: {
              name: {
                equals: session?.user?.user?.company_name
              }
            }
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    });



    console.log('user',user)

    const users = user?.users?.map((item: any) => {  
      return {
        user: item?.name,
        company: item?.name,
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
  }, []);

  return (
    <div className="table-wrapper ">
        <div className="page-heading text-custom-left pt-2 pb-2  twenty-percent pl-15">
        <h2
          className="page-main-heading mt-2"
        >
          {" "}
          Employees Profile{" "}
        </h2>
      </div>
      <div className="profile-table">
        <MDBDataTable bordered small data={main} />
      </div>
    </div>
  );
};

export default DatatablePage;
