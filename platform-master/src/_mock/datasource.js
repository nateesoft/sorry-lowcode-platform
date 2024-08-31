import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const datasource = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/datasource/database_icon.png`,
  name: faker.database.engine(),
  tableCount: faker.number.int({min: 10, max: 50}),
  isVerified: faker.datatype.boolean(),
  created: "31/08/2024 10:35:00",
  lastUserLogin: faker.person.fullName(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));
