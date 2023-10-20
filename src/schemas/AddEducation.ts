import { list } from '@keystone-6/core';
import { text, password, select, file } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { calendarDay } from '@keystone-6/core/fields';


export default list({
  access: allowAll,
  fields: {
    name: text(),
    education:text(),
    course:text(),
    university: text(),
    course_type: select({
        options: [
          { label: 'FullTime', value: 'fullTime' },
          { label: 'PartTime', value: 'partTime' },
          { label: 'Correspondence', value: 'correspondence' },
          // Add more roles as needed
        ],
      }),
    specialization: text(),
    courseDuration: text(),
    gradingSystem: text(),
    marks: text(),
  },
});
