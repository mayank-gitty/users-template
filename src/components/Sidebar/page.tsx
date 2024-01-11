"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { GET_USER, HAS_MASTER, PROFILE_USER } from "@/util/queries";
import { useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";

import {
  IconUsers,
  IconCirclePlus,
  IconUser,
  IconDashboard,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { IconCactus } from "@tabler/icons-react";

import { signOut } from "next-auth/react";

function Sidebar() {
  const router = useRouter();

  const { active, formData }: any = useThemeContext();

  const { data: session } = useSession();

  // console.log(session)

  if (session === null) {
    router.push("/login");
  }

  const pathname = usePathname();

  const sidebarStyles = {
    background: "",
    boxShadow: "0px 4px 29px 0px rgba(0, 0, 0, 0.08)",
  };

  const getData = async () => {
    const user: any = await client.request(GET_USER, {
      where: {
        id: session?.user?.user?.id,
      },
    });

    console.log("seeing user in sidebar", user);
    setRole(user?.user?.role);

    setFormData((prevData: any) => ({
      ...prevData,
      ["stepperFilled"]: user?.user?.stepperFilled,
    }));

    // formData.setFieldValue('stepperFilled',user?.user?.stepperFilled)
  };

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
    profileId,
    setProfileId,
  }: any = useThemeContext();

  useEffect(() => {
    // alert("in sidebar");

    const id = session?.user?.user?.id;

    if (id) {
      getData();
    }
  }, [session]);

  console.log("role", role);

  const logOut = async () => {
    // console.log("logout");
    localStorage.removeItem("role");

    const data = await signOut({ redirect: false, callbackUrl: "/login" });

    router.push(data.url);

    setLoggedIn(false);
    setFormData({
      profileUserId: "",
      itskills: [],
      educations: [],
      projects: [],
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
    setRole("");
    setProfileId("");
    sethasMaster(false);
    setProfileName("");

    router.push("/login");
  };

  const getHeight = () => {
    return "h-screen-fit";
  };

  return (
    <div className={`sidebar   ${getHeight()}`} style={sidebarStyles}>
      <div className="main-icon">
        <div className="">
          <img className="" src="/assets/company-logo.svg" />
        </div>
      </div>

      <ul className="mt-[20%]">
        {
          <li
            onClick={() => {
              router.push(`/`);
            }}
            className={`d-flex align-items-center  mt-[5%] font-semibold ${
              pathname === "/profile_creation" || pathname === "/"
                ? "custom-border-bottom"
                : ""
            }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
          >
            <div className="icon">
              {pathname === "/profile_creation" || pathname === "/" ? (
                <IconDashboard
                  style={{ width: rem(30), height: rem(30) }}
                  stroke={2}
                  color="#4D47C3"
                />
              ) : (
                <IconDashboard
                  style={{ width: rem(30), height: rem(30) }}
                  stroke={2}
                  color="#000000"
                />
              )}
            </div>

            <a
              className={`nav-link  ${
                pathname === "/profile_creation" || pathname === "/"
                  ? "active"
                  : ""
              } `}
              aria-current="page"
              href="#"
            >
              {" "}
              Dashboard{" "}
            </a>
          </li>
        }

        {role !== "admin" && (
          <li
            onClick={() =>
              router.push(`/profile?id=${session?.user?.user?.id}`)
            }
            className={`d-flex align-items-center  mt-[5%] font-semibold ${
              pathname === "/profile" ? "custom-border-bottom" : ""
            }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
          >
            <div className="icon">
              {pathname === "/profile" ? (
                <IconUser
                  style={{ width: rem(30), height: rem(30) }}
                  stroke={2}
                  color="#4D47C3"
                />
              ) : (
                <IconUser
                  style={{ width: rem(30), height: rem(30) }}
                  stroke={2}
                  color="#000000"
                />
              )}
            </div>

            <a
              className={`nav-link  ${
                pathname === "/profile" ? "active" : ""
              } `}
              aria-current="page"
              href="#"
            >
              {" "}
              View Profile{" "}
            </a>
          </li>
        )}

        <div className="">
          {role === "manager" && (
            <div className="">
              <li
                onClick={() => {
                  // alert('m')
                  router.push("/manager_employees");
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/manager_employees"
                    ? "custom-border-bottom"
                    : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                {pathname === "/manager_employees" ? (
                  <IconUsers
                    style={{ width: rem(30), height: rem(30) }}
                    stroke={2}
                    color="#4D47C3"
                  />
                ) : (
                  <IconUsers
                    style={{ width: rem(30), height: rem(30) }}
                    stroke={2}
                    color="#000000"
                  />
                )}

                <a
                  className={`nav-link  ${
                    pathname === "/manager_employees" ? "active" : ""
                  } `}
                  aria-current="page"
                  href="#"
                >
                  {" "}
                  Employees Profiles{" "}
                </a>
              </li>

              <li
                onClick={() => {
                  router.push("/create_manager_employees");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/create_manager_employees"
                    ? "custom-border-bottom"
                    : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/create_manager_employees" ? (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3"
                    />
                  ) : (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000"
                    />
                  )}
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/create_manager_employees" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Create Employees{" "}
                </a>
              </li>
            </div>
          )}

          {role === "admin" && (
            <>
              <li
                onClick={() => {
                  router.push("/employees");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/employees" ? "custom-border-bottom" : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/employees" ? (
                    <IconUsers
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3"
                    />
                  ) : (
                    <IconUsers
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000"
                    />
                  )}
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/employees" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Employees Profiles{" "}
                </a>
              </li>
              <li
                onClick={() => {
                  router.push("/create_employees");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/create_employees" ? "custom-border-bottom" : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/create_employees" ? (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3"
                    />
                  ) : (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000"
                    />
                  )}
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/create_employees" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Create Employees{" "}
                </a>
              </li>

              <li
                onClick={() => {
                  router.push("/create_managers");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/create_managers" ? "custom-border-bottom" : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/create_managers" ? (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3"
                    />
                  ) : (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000"
                    />
                  )}
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/create_managers" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Create Managers{" "}
                </a>
              </li>
            </>
          )}
        </div>

        <li className="last-list-item d-flex justify-content-end align-items-center mt-[5%] font-semibold  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer">
          <a
            onClick={() => logOut()}
            className="nav-link"
            aria-current="page"
            href="#"
          >
            {" "}
            logout{" "}
          </a>
        </li>
      </ul>
    </div>
  );
}

function SideBar() {
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
    profileId,
    setProfileId,
  }: any = useThemeContext();

  return (
    <div className="sidebar-wrapper">
      {" "}
      <Sidebar />{" "}
    </div>
  );
}

export default SideBar;
