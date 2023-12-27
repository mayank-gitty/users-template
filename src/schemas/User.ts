import { list } from '@keystone-6/core';
import { text, password, select, timestamp, file,  relationship,calendarDay  } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import {

  image,
  integer,
  checkbox,
} from "@keystone-6/core/fields";

type Session = {
    data: {
      role: String;
    };
  
  };
  // Check if the user is an admin based on the session role
  async function isAdmin({ session }: { session: Session | undefined }) {
    // Filter the session roles to find admin or userManagement roles
    console.log(session?.data.role)
    const admin = session?.data.role 
  
    // If session is not defined, consider the user as admin (assuming no access restrictions)
    if (!session) {
      return true;
    }
  
    // If admin roles are found, consider the user as admin
    if ( admin == "admin"  || admin == "manager" ) {
      return true;
    }
  
    // Otherwise, consider the user as a regular user
    return false;
  }

export default list({
    access: {
        operation: {
          // Set access control rules for create, update, delete, and query operations
          create: isAdmin,
          update: isAdmin,
          delete: isAdmin,
          query: () => {
            return true; // Allow all users to perform queries
          },
        },
      },
  fields: {
    name: text({ validation: { isRequired: true } } ),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: password({ validation: { isRequired: true } }),
    company: relationship({ ref: "Company", many: false }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    address: text({ validation: { isRequired: true } } ),
    phone: text({validation: { isRequired: true } }  ),
    role: select({
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'Employee', value: 'employee' },
        // Add more roles as needed
      ],
    }),
    photograph: text(),
    resume: text(),
    resume_headline: text(),
    itskills: relationship({
      ref: "ItSkill",
      many: true,
      ui: {
        searchFields: ["name", "version"],
      },
    }),
    education: relationship({
      ref: "AddEducation",
      many: true,
      // ui: {
      //   searchFields: ["name", "version"],
      // },
    }),
    project: relationship({
      ref: "Project",
      many: true,
    }),
    active: checkbox({
      defaultValue: true,
    }),
    open_to_work: checkbox({
      defaultValue: true,
    }),

    keyskills: relationship({
      ref: "KeySkill",
      many: true,
      ui: {
        searchFields: ["name", "version"],
      },
    }),
    experience: relationship({
      ref: "AddExperience",
      many: true,
      // ui: {
      //   searchFields: ["name", "version"],
      // },
    }),
    profile_summary: text(),
    // Add other fields here if needed
  },
  hooks: {
    afterOperation: async ({
      listKey,
      fieldKey,
      operation,
      inputData,
      originalItem,
      item,
      resolvedData,
      context,
    }) => {
      console.log(item, operation);

      if (operation === "create") {
        console.log("users", item);

      }
    },
  },
});
