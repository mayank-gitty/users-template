import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, text, timestamp, select } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document'; // Import the document field type
import type { Lists } from '.keystone/types';
import User from '../schemas/User';
import MultipleUser from '../schemas/MultipleUser';
import ProfileUser from '../schemas/ProfileUser';
import Education from '../schemas/Education';
import ItSkill from '../schemas/ItSkill';
import Project from '../schemas/Project';
import AddEducation from '../schemas/AddEducation';
import Company from '../schemas/Company';

export const lists= {
   User,
   MultipleUser,
   ProfileUser,
   Education,
   ItSkill,
   Project,
   Company,
   AddEducation,
};
