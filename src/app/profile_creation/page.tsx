"use client";

import * as React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Master from "@/components/master/page";

import useThemeContext from "@/context/context";

export interface IAppProps {}

function Profile(props: IAppProps) {
  const searchParams: any = useSearchParams();

  const id = searchParams.get("profileId");
  const name = searchParams.get("profileName");

  const { profileName, setProfileName, profileId, setProfileId }: any =
    useThemeContext();

  //   const {p}

  useEffect(() => {
    // alert("id is",id);

    console.log('getting',id)
    // console.log("useEffect", typeof search, search);

    setProfileName(name)
    setProfileId(id);
  }, []);

  return (
    <div>
      <Master />
    </div>
  );
}

export default Profile;
