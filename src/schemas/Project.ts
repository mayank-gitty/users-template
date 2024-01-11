import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export default list({
  access: allowAll,
  fields: {
    projectTitle: text(),
    client: text(),
    workFromYear: text(),
    workFromMonth: text(),
    projectStatus: select({
      options: [
        { label: 'Inprogress', value: 'inprogress' }, 
        { label: 'Finished', value: 'finished' }, 
        // Add more statuses as needed
      ],
    }),
    detailsOfProject: text({
        ui: {
          displayMode: 'textarea' // Use displayMode: 'textarea' for multiline input
        },
      }),
    projectSite: select({
      options: [
        { label: 'Offsite', value: 'offsite' },
        { label: 'Onsite', value: 'onsite' },
        // Add more options as needed
      ],
    }),
    projectLocation: text(),
    natureOfEmployment: select({
      options: [
        { label: 'FullTime', value: 'fulltime' },
        { label: 'PartTime', value: 'parttime' },

      ],
    }),

    teamSize: text(),
    role: text(),
    roleDescription: text({
      ui: {
        displayMode: 'textarea', // Use displayMode: 'textarea' for multiline input
      },
    }),
    skillUsed: text(),
  },
});
