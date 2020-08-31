import '../bootstrap';
import { signUser } from '../core/User/signUser';
import signUserMock from './mocks/sign_user.json';

test('it should signIn a the sign in user', async () => {
  const signMockData: any = signUserMock;
  const userResponse = await signUser(signMockData);

  expect({
    user: {
      code: userResponse.code,
      name: userResponse.user.name,
      email: userResponse.user.email,
    },
  }).toEqual({
    user: {
      code: 200,
      name: signUserMock.name,
      email: signUserMock.email,
    },
  });
});
