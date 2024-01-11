import { list } from "@keystone-6/core";
import {
  text,
  password,
  select,
  file,
  checkbox,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export default list({
  access: allowAll,
  fields: {
    name: text(),
    version: text(),
    lastUsed: text(),
    master: checkbox({
      defaultValue: false,
    }),
    experience: text(),
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
      // console.log(item, operation);

      if (operation === "create" || operation === "update") {
        // console.log("item ope", item, operation);

        if (item.master) {
          const user = await context.db.ItSkill.createOne({
            data: {
              masterId: item.id,
              name: item.name,
              version: item.version,
              lastUsed: item.lastUsed,
              experience: item.experiene,
            },
            // query: '',
          });
        } else {
          const user1: any = await context.db.ItSkill.findMany({
            where: { masterId: { equals: item.id } },
          });

          if (user1.length > 0) {
            const user = await context.db.ItSkill.deleteOne({
              where: { id: user1[0].id },
            });
          }
        }
      }
    },
  },
  ui: {
    searchFields: ["name", "experience"],
  },
});
