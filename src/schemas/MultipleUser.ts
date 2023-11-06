import { list } from '@keystone-6/core';
import { text, password, select, file } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export default list({
  access: allowAll,
  fields: {
    name: text(),
    mobilenumber: text(),
    email: text(),
    address: text(),
    password:text(),
    company:text(),
    role: select({
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    }),
  },
  ui: {
    searchFields: [
      "name",
      "mobilenumber",
      "email",
      "address",
      "role"
    ],
  },
});
