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

  const   {  data: session }   = useSession();

  const getData = async () => {

    console.log('sessionId',session)

    const user: any = await client.request(USERS, {
      where: {
        role: {
          equals: "employee",
        },
        company: {
          name: {
            equals: session?.user?.user?.company_name,
          },
        },
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    }); 

    // console.log('user',user)

    const users = user?.users?.map((item: any) => {
      return {
        user: item?.name,
        // company: item?.company?.name,
        phone: item?.phone,
        address: item?.address,
        // photograph: <img src={item?.photograph} />,
        // // resume:  <a className="resume" href={"/files/3-new-delta-9-products-for-sale-at-Exhale-Wellness-8dEhepfpj9CT.docx"} >  resume </a>     ,
        keyskills: item.keyskills.map((u: any) => u.name).join(", "),
        itskills: item.itskills.map((u: any) => u.name).join(", "),

        action: (
          <button
            className="table-button"
            onClick={() => router.push(`/add_employee_profile?id=${item.id}`)}
          >
            {" "}
            Add {" "}
          </button>
        ),
      };
    });

    const test: any = {
      columns: [
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
        //   label: "Company",
        //   field: "company",
        //   sort: "disabled",
        //   width: 200,
        // }
        
        ,

        {
          label: "Key skills",
          field: "keyskills",
          sort: "disabled",
          width: 100,
        },

        {
          label: "It Skills",
          field: "itskills",

          sort: "disabled",
          width: 100,
        },

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
      <div className="profile-table">
        <MDBDataTable bordered small data={main} />
      </div>
    </div>
  );
};

export default DatatablePage;
