import { list } from "@keystone-6/core";
import {
  text,
  password,
  select,
  file,
  relationship,
  checkbox,
} from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export default list({
  access: allowAll,
  fields: {
    expire: checkbox({
      defaultValue: false,
    }),
    value: text(),
  },
});
