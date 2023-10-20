import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, timestamp, password, select } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      about: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  MultipleUser: list({
    access: allowAll,
    fields: {
      name: text(),
      mobilenumber: text(),
      email: text(),
      password: password({
        db: { map: 'password_field' },
        validation: {
          length: { min: 10, max: 1000 },
          isRequired: true,
          rejectCommon: true,
        },
      }),
      company: select({
        dataType: 'enum',
        options: [
          { label: 'Company A', value: 'company_a' },
          { label: 'Company B', value: 'company_b' },
          // Add more companies as needed
        ],
      }),
    },
  }),
};
