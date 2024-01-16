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
  IconDashboard, IconEdit,
  IconPlus,
  IconEye
} from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { signOut } from "next-auth/react";

export function Sidebar() {
  const router = useRouter();

  const { active, formData }: any = useThemeContext();

  const [openSubProfilesMenu, setopenSubProfilesMenu] = useState(false);

  const [openSubProfilesMenuInManager, setopenSubProfilesMenuInManager] = useState(false);

  const [openSubEmployeesMenu, setopenSubEmployeesMenu] = useState(false);

  const [openSubEmployeesMenuInManager, setopenSubEmployeesMenuInManager] = useState(false);

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
    loggedIn, setLoggedIn, setFormData, setActive, hasMaster, sethasMaster, role, setRole, image, setImage, profileName, setProfileName, profileId, setProfileId,
  }: any = useThemeContext();

  useEffect(() => {
    // alert("in sidebar");
    const id = session?.user?.user?.id;

    if (id) {
      getData();
    }
  }, [session]);

  // console.log("role", role);
  const profilesSubTabs = [
    {
      link: "view_employees_profiles",
      label: "View",
      icon: <IconEye />
    },
    {
      link: "add_employees_profiles",
      label: "Add",
      icon: <IconPlus />
    },
    {
      link: "edit_employees_profiles",
      label: "Modify",
      icon: <IconEdit />
    },
  ];

  const profilesSubTabsInManager = [
    {
      link: "view_manager_employees_profiles",
      label: "View",
      icon: <IconEye />
    },
    {
      link: "add_manager_employees_profiles",
      label: "Add",
      icon: <IconPlus />
    },
    {
      link: "edit_manager_employees_profiles",
      label: "Modify",
      icon: <IconEdit />
    },
  ];

  const employeesSubTabs = [
    {
      link: "view_employees",
      label: "View",
      icon: <IconEye />
    },
    {
      link: "add_employees",
      label: "Add",
      icon: <IconPlus />
    },
    {
      link: "edit_employees",
      label: "Modify",
      icon: <IconEdit />
    },
  ];

  const employeesSubTabsInManager = [
    {
      link: "view_employees_in_manager",
      label: "View",
      icon: <IconEye />
    },
    {
      link: "add_employees_in_manager",
      label: "Add",
      icon: <IconPlus />
    },
    {
      link: "edit_employees_in_manager",
      label: "Modify",
      icon: <IconEdit />
    },
  ];

  const managersSubTabs = [
    {
      link: "view_managers",
      label: "View",
      icon: <IconEye />
    },
    {
      link: "add_managers",
      label: "Add",
      icon: <IconPlus />
    },
    {
      link: "edit_managers",
      label: "Modify",
      icon: <IconEdit />
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
        {<li
          onClick={() => {
            router.push(`/`);
          }}
          className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/profile_creation" || pathname === "/"
              ? "custom-border-bottom"
              : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
        >
          <div className="icon">
            {pathname === "/profile_creation" || pathname === "/" ? (
              <IconDashboard
                style={{ width: rem(30), height: rem(30) }}
                stroke={2}
                color="#4D47C3" />
            ) : (
              <IconDashboard
                style={{ width: rem(30), height: rem(30) }}
                stroke={2}
                color="#000000" />
            )}
          </div>

          <a
            className={`nav-link  ${pathname === "/profile_creation" || pathname === "/"
                ? "active"
                : ""} `}
            aria-current="page"
            href="#"
          >
            {" "}
            Dashboard{" "}
          </a>
        </li>}

        {role !== "admin" && (
          <li
            onClick={() => router.push(`/profile?id=${session?.user?.user?.id}`)}
            className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/profile" ? "custom-border-bottom" : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
          >
            <div className="icon">
              {pathname === "/profile" ? (
                <IconUser
                  style={{ width: rem(30), height: rem(30) }}
                  stroke={2}
                  color="#4D47C3" />
              ) : (
                <IconUser
                  style={{ width: rem(30), height: rem(30) }}
                  stroke={2}
                  color="#000000" />
              )}
            </div>

            <a
              className={`nav-link  ${pathname === "/profile" ? "active" : ""} `}
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
                  setopenSubProfilesMenuInManager(!openSubProfilesMenuInManager);
                  setopenSubEmployeesMenuInManager(false)

                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/manager_employeesa"
                    ? "custom-border-bottom"
                    : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                {pathname === "/manager_employees" ? (
              <IconCirclePlus
              style={{ width: rem(30), height: rem(30) }}
              stroke={2}
              color="#4D47C3" />

          ) : (
            <IconCirclePlus
              style={{ width: rem(30), height: rem(30) }}
              stroke={2}
              color="#000000" />
          )
                
                }

                <a
                  className={`nav-link  ${pathname === "/manager_employees" ? "active" : ""} `}
                  aria-current="page"
                  href="#"
                >
                  {" "}
                  Employees Profiles{" "}
                </a>
              </li>


              {openSubProfilesMenuInManager &&
                profilesSubTabsInManager.map((item: any) => {
                  return (  
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${  pathname === ( "/view_employees_profiless") 
                          ? "custom-border-bottom"
                          : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees" ? (
                          item.icon
                        ) : (
                          item.icon
                        )}
                      </div>
                      <a
                        className={`nav-link  ${pathname === "/create_employees" ? "active" : ""} `}
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
                  // router.push("/create_manager_employees");

                  setopenSubEmployeesMenuInManager(!openSubEmployeesMenuInManager)
                  setopenSubProfilesMenuInManager(false)
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/create_manager_employees"
                    ? "custom-border-bottom"
                    : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/create_manager_employees" ? (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3" />

                  ) : (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000" />
                  )
                  
                  }
                </div>
                <a
                  className={`nav-link  ${pathname === "/create_manager_employees" ? "active" : ""} `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Employees{" "}
                </a>
              </li>

              {openSubEmployeesMenuInManager &&
                employeesSubTabsInManager.map((item: any) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/create_employees"
                          ? "custom-border-bottoms"
                          : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees" ? (
                          item.icon
                        ) : (
                          item.icon
                        )}
                      </div>
                      <a
                        className={`nav-link  ${pathname === "/create_employees" ? "active" : ""} `}
                        aria-current="page"
                        href=""
                      >
                        {" "}
                        {item.label}{" "}
                      </a>
                    </li>
                  );
                })}



            </div>
          )}

          {role === "admin" && (
            <>
              <li
                onClick={() => {
                  setopenSubProfilesMenu(!openSubProfilesMenu);

                  setopenSubManagersMenu(false);

                  setopenSubEmployeesMenu(false);
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/employees" ? "custom-border-bottom" : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/employees" ? (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3" />
                  ) : (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000" />
                  )}
                </div>
                <a
                  className={`nav-link  ${pathname === "/employees" ? "active" : ""} `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Employees Profiles{" "}
                </a>
              </li>

              {openSubProfilesMenu &&
                profilesSubTabs.map((item: any) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${ pathname === ( "/view_employees_profiless") 
                          ? "custom-border-bottom"
                          : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees" ? (
                          item.icon
                        ) : (
                          item.icon
                        )}
                      </div>
                      <a
                        className={`nav-link  ${pathname === "/create_employees" ? "active" : ""} `}
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
                  setopenSubEmployeesMenu(!openSubEmployeesMenu);
                  setopenSubManagersMenu(false);
                  setopenSubProfilesMenu(false);
                  // router.push("/create_employees");
                  // alert('mayank')
                }}
                className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/create_employees" ? "custom-border-bottom" : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/create_employees" ? (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3" />
                  ) : (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000" />
                  )}
                </div>
                <a
                  onClick={() => {
                  }}
                  className={`nav-link  ${pathname === "/create_employees" ? "active" : ""} `}
                  aria-current="page"
                  href=""
                >
                  {" "}
                  Employees{" "}
                </a>
              </li>

              {openSubEmployeesMenu &&
                employeesSubTabs.map((item: any) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.link);
                      }}
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/create_employees"
                          ? "custom-border-bottoms"
                          : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees" ? (
                          item.icon
                        ) : (
                          item.icon
                        )}
                      </div>
                      <a
                        className={`nav-link  ${pathname === "/create_employees" ? "active" : ""} `}
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
                className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/create_managers" ? "custom-border-bottom" : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
              >
                <div className="icon">
                  {pathname === "/create_managers" ? (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#4D47C3" />
                  ) : (
                    <IconCirclePlus
                      style={{ width: rem(30), height: rem(30) }}
                      stroke={2}
                      color="#000000" />
                  )}
                </div>
                <a
                  className={`nav-link  ${pathname === "/create_managers" ? "active" : ""} `}
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
                      className={`d-flex align-items-center  mt-[5%] font-semibold ${pathname === "/create_employees"
                          ? "custom-border-bottoms"
                          : ""}  border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer`}
                    >
                      <div className="icon">
                        {pathname === "/create_employees" ? (
                          item.icon
                        ) : (
                          item.icon
                        )}
                      </div>
                      <a
                        className={`nav-link  ${pathname === "/create_employees" ? "active" : ""} `}
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
