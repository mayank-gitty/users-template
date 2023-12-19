"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useThemeContext from "@/context/context";
import { gql } from "graphql-request";
import client from "../../../helpers/request";
import { GET_USER, HAS_MASTER, PROFILE_USER } from "@/util/queries";
import { useSearchParams } from "next/navigation";

function Sidebar() {
  const router = useRouter();

  const { active }: any = useThemeContext();

  const pathname = usePathname();

  const sidebarStyles = {
    background: "",
    boxShadow: "0px 4px 29px 0px rgba(0, 0, 0, 0.08)",
  };

  const getData = async () => {
    const user: any = await client.request(HAS_MASTER, {
      where: {
        user: {
          id: {
            equals: localStorage.getItem("id"),
          },
        },
      },
    });

    if (user?.profileUsers.length > 0) {
      sethasMaster(true);
    }
    const profile: any = await client.request(GET_USER, {
      where: {
        id: localStorage.getItem("id"),
      },
    });

    console.log(profile, "profilefile");
    setRole(profile?.user?.role);
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
  }: any = useThemeContext();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id) {
      getData();
    } else {
      router.push("/login");
    }
  }, []);

  console.log("role", role);

  const logOut = () => {
    // console.log("logout");

    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("company");

    setLoggedIn(false);
    setFormData({
      itskills: [],
      education: null,
      keyskills: [],
      photograph: "",
      resume_headline: "",
      profile_summary: "",
      total_experience: "",
      relevent_experience: "",
    });
    setActive(0);
    setImage(null);
    setRole("");
    sethasMaster(false);
    setProfileName("");
    router.push("/login");
  };

  const getHeight = () => {
    // alert('g')
    console.log("ac", active);

    if (pathname === "/profile") {
      return "h-screen";
    }

    return "h-screen-fit";
  };

  console.log("pathname", pathname);

  return (
    <div className={`sidebar  ${getHeight()}`} style={sidebarStyles}>
      <div className="main-icon">
        <div className="">
          <img className="" src="/assets/company-logo.svg" />
        </div>
      </div>

      <ul className="mt-[20%]">
        {role !== "admin" && (
          <li
            onClick={() => {
              router.push(`/`);
            }}
            className={`d-flex align-items-center  mt-[5%] font-semibold ${
              pathname ===  "/profile_creation"  ||  pathname === "/"    ? "custom-border-bottom" : ""
            }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
          >
            <div className="icon">
              <img className="" src="/assets/dashboard-icon.svg" />
            </div>

            <a
              className={`nav-link  ${ ( pathname ===  "/profile_creation"  || pathname === "/"  )  ? "active" : ""} `}  
              aria-current="page"
              href="#"
            >
              {" "}
              Dashboard{" "}
            </a>
          </li>
        )}

        {role !== "admin"  && (
          <li
            onClick={() =>
              router.push(`/profile?id=${localStorage.getItem("id")}`)
            }
            className={`d-flex align-items-center  mt-[5%] font-semibold ${
              pathname === "/profile" ? "custom-border-bottom" : ""
            }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
          >
            <div className="icon">
              <img src="/assets/users.svg" />
            </div>
            <a   className={`nav-link  ${pathname === "/profile" ? "active" : ""} `}   aria-current="page" href="#">
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
                  router.push("/profileUsers");
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === ( "/profileUsers"  ) ? "custom-border-bottom" : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <img src="/assets/users.svg" />
                <a
                  className={`nav-link  ${
                    pathname === "/profileUsers" ? "active" : ""
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
                  router.push("/multipleuser");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/multipleuser"
                    ? "custom-border-bottom"
                    : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  <img src="/assets/Add.svg" />
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/multipleuser" ? "active" : ""
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
                  router.push("/multi_users_table");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/multi_users_table"
                    ? "custom-border-bottom"
                    : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  <img src="/assets/Add.svg" />
                </div>
                <a          className={`nav-link  ${
                    pathname === "/multi_users_table" ? "active" : ""
                  } `} aria-current="page" href="">
                  {" "}
                  Invited Employees{" "}
                </a>
              </li>
            </div>
          )}

          {role === "admin" && (
            <>
              <li
                onClick={() => {
                  router.push("/profileEmployees");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/profileEmployees" ? "custom-border-bottom" : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}  
              >
                <div className="icon">
                  <img src="/assets/Add.svg" />
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/profileEmployees" ? "active" : ""
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
                  router.push("/multiple_employees");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/multiple_employees"
                    ? "custom-border-bottom"
                    : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  <img src="/assets/Add.svg" />
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/multiple_employees" ? "active" : ""
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
                  router.push("/multiple_managers");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/multiple_managers"
                    ? "custom-border-bottom"
                    : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  <img src="/assets/Add.svg" />
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/multiple_managers" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Create Managers{" "}
                </a>
              </li>

              <li
                onClick={() => {
                  router.push("/invited_employees");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/invited_employees"
                    ? "custom-border-bottom"
                    : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  <img src="/assets/Add.svg" />
                </div>
                <a
                  className={`nav-link  ${
                    pathname === "/invited_employees" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Invited Employees{" "}
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
  return (
    <div className="sidebar-wrapper">
      <Sidebar />
    </div>
  );
}

export default SideBar;
