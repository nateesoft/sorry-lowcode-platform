import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const datasource = [1].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/datasource/database_icon.png`,
  name: "LoginDB",
  tableCount: faker.number.int({min: 10, max: 50}),
  created: "31/08/2024 10:35:00",
  lastUserLogin: faker.person.fullName(),
  status: sample(['active', 'banned'])
}));
