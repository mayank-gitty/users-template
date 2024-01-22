"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useThemeContext from "@/context/context";
import client from "../../../helpers/request";
import { GET_USER } from "@/util/queries";
import { useSession } from "next-auth/react";
import {
  IconUsers,
  IconCirclePlus,
  IconUser,
  IconDashboard,
  IconEdit,
  IconPlus,
  IconEye,
  IconUsersGroup,
} from "@tabler/icons-react";

import { rem } from "@mantine/core";
import { signOut } from "next-auth/react";
import { Icon } from "@mui/material";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa6";
import { FcInvite } from "react-icons/fc";

export function Sidebar() {
  const router = useRouter();

  const { active, formData }: any = useThemeContext();

  const [openSubProfilesMenu, setopenSubProfilesMenu] = useState(false);

  const [openSubProfilesMenuInManager, setopenSubProfilesMenuInManager] =
    useState(false);

  const [openSubEmployeesMenu, setopenSubEmployeesMenu] = useState(false);

  const [openSubEmployeesMenuInManager, setopenSubEmployeesMenuInManager] =
    useState(false);

  const [openSubManagersMenu, setopenSubManagersMenu] = useState(false);

  const { data: session } = useSession();

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

    // console.log("seeing user in sidebar", user);
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

  // console.log('pathnamessssssssssssssss',pathname)

  useEffect(() => {
    // alert("in sidebar");
    const id = session?.user?.user?.id;

    if (pathname === "/view_employees_profiles" || pathname === '/view_employee_profile' ) {
      setopenSubProfilesMenu(true);
    }

    if (pathname === "/add_employees_profiles"  || pathname === '/add_employee_profile'   )  {
      setopenSubProfilesMenu(true);
    }

    if (pathname === "/edit_employees_profiles"  || pathname === '/edit_employee_profile'   ) {
      setopenSubProfilesMenu(true);
    }

    if (pathname === "/view_manager_employees_profiles"  || pathname === '/view_employee_profile'  ) {
      setopenSubProfilesMenuInManager(true);
    }

    if (pathname === "/add_manager_employees_profiles"  || pathname === '/add_employee_profile' ) {
      setopenSubProfilesMenuInManager(true);
    }

    if (pathname === "/edit_manager_employees_profiles"  || pathname === '/edit_employee_profile'  ) {
      setopenSubProfilesMenuInManager(true);
    }

    if (pathname === "/view_employees") {
      setopenSubEmployeesMenu(true);
    }

    if (pathname === "/add_employees") {
      setopenSubEmployeesMenu(true);
    }

    if (pathname === "/edit_profiles") {
      setopenSubEmployeesMenu(true);
    }

    if (pathname === "/view_employees_in_manager") {
      setopenSubEmployeesMenuInManager(true);
    }

    if (pathname === "/add_employees_in_manager") {
      setopenSubEmployeesMenuInManager(true);
    }

    if (pathname === "/edit_profiles_in_manager") {
      setopenSubEmployeesMenuInManager(true);
    }

    if (pathname === "view_managers") {
      setopenSubManagersMenu(true);
    }

    if (pathname === "add_managers") {
      setopenSubManagersMenu(true);
    }

    if (pathname === "edit_managers") {
      setopenSubManagersMenu(true);
    }

    if (id) {
      getData();
    }
  }, [session]);

  // console.log("role", role);
  const profilesSubTabs = [

    {
      link: "add_employees_profiles",
      label: "Add",
      iconActive: <IconPlus color="#4D47C3" />,
      iconInActive: <IconPlus color="#000000" />,
    },
    {
      link: "view_employees_profiles",
      label: "View",
      iconActive: <IconEye color="#4D47C3" />,
      iconInActive: <IconEye color="#000000" />,
    },
    {
      link: "edit_employees_profiles",
      label: "Modify",
      iconActive: <IconEdit color="#4D47C3" />,
      iconInActive: <IconEdit color="#000000" />,
    },
  ];

  const profilesSubTabsInManager = [

    {
      link: "add_manager_employees_profiles",
      label: "Add",
      iconActive: <IconPlus color="#4D47C3" />,
      iconInActive: <IconPlus color="#000000" />,
    },
    {
      link: "view_manager_employees_profiles",
      label: "View",
      iconActive: <IconEye color="#4D47C3" />,
      iconInActive: <IconEye color="#000000" />,
    },
    {
      link: "edit_manager_employees_profiles",
      label: "Modify",
      iconActive: <IconEdit color="#4D47C3" />,
      iconInActive: <IconEdit color="#000000" />,
    },
  ];

  const employeesSubTabs = [
    // {
    //   link: "view_employees",
    //   label: "View",
    //   iconActive: <IconEye color="#4D47C3" />,
    //   iconInActive: <IconEye color="#000000" />,
    // },
    {
      link: "add_employees",
      label: "Invite employees",
      iconActive: <FcInvite  />,
      iconInActive: <FcInvite />,
    },
    {
      link: "add_managers",
      label: "Invite managers",
      iconActive: <FcInvite  />,
      iconInActive: <FcInvite />,
    },
    // {
    //   link: "edit_employees",
    //   label: "Modify",
    //   iconActive: <IconEdit color="#4D47C3" />,
    //   iconInActive: <IconEdit color="#000000" />,
    // },
  ];

  // const employeesSubTabsInManager = [
  //   // {
  //   //   link: "view_employees_in_manager",
  //   //   label: "View",
  //   //   iconActive: <IconEye color="#4D47C3" />,
  //   //   iconInActive: <IconEye color="#000000" />,
  //   // },
  //   {
  //     link: "add_employees_in_manager",
  //     label: "Add",
  //     iconActive: <IconPlus color="#4D47C3" />,
  //     iconInActive: <IconPlus color="#000000" />,
  //   },
  //   // {
  //   //   link: "edit_employees_in_manager",
  //   //   label: "Modify",
  //   //   iconActive: <IconEdit color="#4D47C3" />,
  //   //   iconInActive: <IconEdit color="#000000" />,
  //   // },
  // ];

  const managersSubTabs = [

    {
      link: "add_managers_profiles",
      label: "Add",
      iconActive: <IconPlus color="#4D47C3" />,
      iconInActive: <IconPlus color="#000000" />,
    },
    {
      link: "view_managers",
      label: "View",
      iconActive: <IconEye color="#4D47C3" />,
      iconInActive: <IconEye color="#000000" />,
    },
    {
      link: "edit_managers",
      label: "Modify",
      iconActive: <IconEdit color="#4D47C3" />,
      iconInActive: <IconEdit color="#000000" />,
    },
  ];

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
                <RxDashboard 
                  style={{ width: rem(30), height: rem(30) }}
                  stroke={2}
                  color="#4D47C3"
                />
              ) : (
                <RxDashboard
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

        {localStorage.getItem('role') !== "admin" && (
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
                  setopenSubProfilesMenuInManager(
                    !openSubProfilesMenuInManager
                  );
                  setopenSubEmployeesMenuInManager(false);
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/manager_employeesa"
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
                  Employees{" "}
                </a>
              </li>

              {openSubProfilesMenuInManager &&
                profilesSubTabsInManager.map((item: any) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${
                        pathname === "/" + item.link
                          ? "custom-border-bottom"
                          : ""
                      }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees"
                          ? item.iconActive
                          : item.iconInActive}
                      </div>
                      <a
                        className={`nav-link  ${
                          pathname === "/" + item.link ? "active" : ""
                        } `}
                        aria-current="page"
                        href=""
                      >
                        {" "}
                        {item.label}{" "}
                      </a>
                    </li>
                  );
                })}

              <li
                onClick={() => {
                  router.push("/add_employees_in_manager");
                  setopenSubEmployeesMenuInManager(
                    !openSubEmployeesMenuInManager
                  );
                  setopenSubProfilesMenuInManager(false);
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
                   Invite {" "}
                </a>
              </li>

              {/* {openSubEmployeesMenuInManager &&
                employeesSubTabsInManager.map((item: any) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${
                        pathname === "/" + item.link
                          ? "custom-border-bottom"
                          : ""
                      }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        { 
                           pathname === "/" + item.link
                          ? item.iconActive
                          : item.iconInActive}
                      </div>
                      <a
                        className={`nav-link  ${
                          pathname === "/" + item.link ? "active" : ""
                        } `}
                        aria-current="page"
                        href=""
                      >
                        {" "}
                        {item.label}{" "}
                      </a>
                    </li>
                  );
                })} */}
            </div>
          )}

          {role === "admin" && (
            <>

<li
                onClick={() => {
                  setopenSubEmployeesMenu(!openSubEmployeesMenu);
                  setopenSubManagersMenu(false);
                  setopenSubProfilesMenu(false);
                  // router.push("/create_employees");
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
                  onClick={() => {}}
                  className={`nav-link  ${
                    pathname === "/create_employees" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
              Invite{" "}
                </a>
              </li>

              {openSubEmployeesMenu &&
                employeesSubTabs.map((item: any) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${
                        pathname === "/" + item.link
                          ? "custom-border-bottom"
                          : ""
                      }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees"
                          ? item.iconActive
                          : item.iconInActive}
                      </div>
                      <a
                        className={`nav-link  ${
                          pathname === "/" + item.link ? "active" : ""
                        } `}
                        aria-current="page"
                        href=""
                      >
                        {" "}
                        {item.label}{" "}
                      </a>
                    </li>
                  );
                })}


              <li
                onClick={() => {
                  setopenSubProfilesMenu(!openSubProfilesMenu);

                  setopenSubManagersMenu(false);

                  setopenSubEmployeesMenu(false);
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/employees" ? "custom-border-bottom" : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/employees" ? (
                    <IconUsersGroup
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3"
                    />
                  ) : (
                    <IconUsersGroup
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
                  Employees {" "}
                </a>
              </li>


              {openSubProfilesMenu &&
                profilesSubTabs.map((item: any, key: number) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${
                        pathname === "/" + item.link
                          ? "custom-border-bottom"
                          : ""
                      }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}

                    >
                      <div className="icon">
                        {
                         pathname === "/" + item.link
                          ? item.iconActive
                          : item.iconInActive}
                      </div>
                      <a
                        className={`nav-link  ${
                          pathname === "/" + item.link   ? "active" : ""
                        } `}
                        aria-current="page"
                        href=""
                      >
                        {" "}
                        {item.label}{" "}
                      </a>
                    </li>
                  );
                })}


              <li
                onClick={() => {
                  setopenSubManagersMenu(!openSubManagersMenu);
                  setopenSubProfilesMenu(false);
                  setopenSubEmployeesMenu(false);
                }}
                // alert('mayank')
                className={`d-flex align-items-center  mt-[5%] font-semibold ${
                  pathname === "/create_managers" ? "custom-border-bottom" : ""
                }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/create_managers" ? (
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
                    pathname === "/create_managers" ? "active" : ""
                  } `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Managers{" "}
                </a>
              </li>

              {openSubManagersMenu &&
                managersSubTabs.map((item: any) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${
                        pathname === "/" + item.link
                          ? "custom-border-bottom"
                          : ""
                      }  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees"
                          ? item.iconActive
                          : item.iconInActive}
                      </div>
                      <a
                        className={`nav-link  ${
                          pathname === "/" + item.link ? "active" : ""
                        } `}
                        aria-current="page"
                        href=""
                      >
                        {" "}
                        {item.label}{" "}
                      </a>
                    </li>
                  );
                })}

              
  
        
  

        

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
