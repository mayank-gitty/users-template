import { list } from "@keystone-6/core";
import {
  text,
  password,
  select,
  image,
  file,
  relationship,
  integer,
  checkbox,
  timestamp,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { keystoneContext } from "../keystone/context";
import { cloudinaryImage } from "@keystone-6/cloudinary";

const filterPosts = async ({
  session,
  context,
}: {
  session: Session;
  context: Context;
}) => {
  console.log("getting sessions context", session);

  console.log(session?.data.role);
  const role = session?.data.role;

  // if the user is an Admin, they can access all the records

  if (role === "admin") {
    console.log("check1", session);

    return true;
  }

  if (role === "manager") {
    console.log("check2", session);

    const user = await context.query.User.findOne({
      where: { id: session?.itemId },
      query: "id company {name id}",
    });

    console.log("user", user);

    return {
      user: {
        role: {
          equals: "employee",
        },
        company: {
          name: {
            equals: user?.company?.name,
          },
        },
      },
    };
  }

  if (role === "employee") {
    console.log("check2", session);

    return {
      user: {
        id: {
          equals: session.itemId,
        },
      },
    };
  }
};



export default list({
  access: {
    operation: {
      query: allowAll,
    },
    filter: {
      query: filterPosts,
    },
  },

  fields: {
    user: relationship({ ref: "User", many: false }),
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
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    // resume: file({ storage: "my_local_files" }),
  },
  hooks: {
    validateInput: async ({ resolvedData, addValidationError, context }) => {},
  },
  ui: {
    searchFields: [
      "name",
      "resume_headline",
      "education",
      "itskills",
      "keyskills",
      "total_experience",
      "relevant_experience",
      "profile_summary",
    ],
  },
});
