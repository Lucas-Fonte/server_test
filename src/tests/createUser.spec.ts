import '../bootstrap';
import { createUser } from '../core/User/createUser';
import {
  closeMongoConnection,
  createMongoConnection,
} from '../database/createMongoConnection';
import { User } from '../models/User';
import createUserMock from './mocks/create_user.json';
import signUserMock from './mocks/sign_user.json';

test('it should create and remove a test user', async () => {
  const mockData: any = createUserMock;
  const userResponse = await createUser(mockData);

  const signMockData: any = signUserMock;
  await createUser(signMockData);

  await createMongoConnection();
  await User.findOneAndDelete({ _id: userResponse.id });
  closeMongoConnection();

  expect({
    code: userResponse.code,
    name: userResponse.name,
    email: userResponse.email,
  }).toEqual({
    code: 201,
    name: createUserMock.name,
    email: createUserMock.email,
  });
});
