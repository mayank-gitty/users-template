"use client"

import Client from "./client";

import { useEffect } from "react";

export default  function Page() {

  useEffect(()=>{

    console.log('MM')

  },[])

  return <h6> welcome in add employees </h6>

}
