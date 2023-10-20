import { list } from '@keystone-6/core';
import { text, password, select, file } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { calendarDay } from '@keystone-6/core/fields';


export default list({
  access: allowAll,
  fields: {
    name: text(),
  },
});
