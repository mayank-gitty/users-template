import { list } from '@keystone-6/core';
import { text, password, select, file, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export default list({
  access: allowAll,
  fields: {
    education: relationship({ ref: 'AddEducation', many: true, }), 
    university: text(),
    course: text(),
    specialization: text(),
    courseDuration: text(),
    gradingSystem: text(),
    marks: text(),
    add_doctorate_phd: text(),
    add_masters_post_gradiation: text(),
    add_graduation_diploma: text(),
    add_class_X11: text(),
    add_class_X: text(),
    add_below_10th: text(),
   
  },
});
