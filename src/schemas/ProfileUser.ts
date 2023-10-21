import { list } from "@keystone-6/core";
import {
  text,
  password,
  select,
  image,
  file,
  relationship,
  integer,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { keystoneContext } from "../keystone/context";
import { cloudinaryImage } from "@keystone-6/cloudinary";

export default list({
  access: allowAll,
  fields: {
    // user: relationship({ ref: "User", many: false, isIndexed: "unique" }),
    // photograph: image({ storage: "my_local_images" }),
    resume_headline: text(),
    itskills: relationship({
      ref: "ItSkill",
      many: true,
      ui: {
        searchFields: ["name", "version"],
      },
    }),
    education:text(),
    // course:text(),
    // university: text(),
    // course_type: select({
    //     options: [
    //       { label: 'FullTime', value: 'fullTime' },
    //       { label: 'PartTime', value: 'partTime' },
    //       { label: 'Correspondence', value: 'correspondence' },
    //       // Add more roles as needed
    //     ],
    //   }),
    // // specialization: text(),
    // courseDuration: text(),
    // gradingSystem: text(),
    // marks: text(),
    // education: relationship({ ref: "AddEducation", many: false }),
    keyskills: relationship({
      ref: "KeySkill",
      many: true,
      ui: {
        searchFields: ["name", "version"],
      },
    }),
    total_experience: text(),
    relevent_experience: text(),
    // projects: relationship({ ref: 'Project', many: true, }),
    profile_summary: text(),
    // resume: file({ storage: "my_local_files" }),
  },
  hooks: {
    validateInput: async ({ resolvedData, addValidationError, context }) => {
      // const user = await context.db.ProfileUser.findMany({
      //   where: {},
      // });

      // const flag = user?.filter(
      //   (item) => item.userId === resolvedData?.user?.connect?.id
      // );

      // console.log("flag", flag);
      // if (flag.length !== 0) {
      //   // We call addValidationError to indicate an invalid value.
      //   addValidationError("this profile is already completed");
      // }
    },
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
