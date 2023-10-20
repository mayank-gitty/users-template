import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export default list({
  access: allowAll,
  fields: {
    project_Title: text(),
    client: text(),
    project_status: select({
      options: [
        { label: 'Inprogress', value: 'inprogress' },
        { label: 'Finished', value: 'finished' },
        // Add more statuses as needed
      ],
    }),
    duration: text(),
    details_of_project: text({
        ui: {
          displayMode: 'textarea', // Use displayMode: 'textarea' for multiline input
        },
      }),
    project_site: select({
      options: [
        { label: 'Offsite', value: 'offsite' },
        { label: 'Onsite', value: 'onsite' },
        // Add more options as needed
      ],
    }),
    Nature_of_employment: select({
      options: [
        { label: 'FullTime', value: 'fulltime' },
        { label: 'PartTime', value: 'parttime' },
        // Add more options as needed
      ],
    }),
    Team_Size: text(),
    Role: text(),
    Role_Description: text({
      ui: {
        displayMode: 'textarea', // Use displayMode: 'textarea' for multiline input
      },
    }),
    Skills_Used: text(),
  },
});
