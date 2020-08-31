import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// eslint-disable-next-line no-unused-vars
import { UserData } from '.';
import {
  createMongoConnection,
  closeMongoConnection,
} from '../../database/createMongoConnection';
import { User } from '../../models/User';
import { authConfig } from '../../config/auth';

const checkPassword = async (password: string, passwordHash: string) =>
  await bcrypt.compare(password, passwordHash);

const signUser = async (data: UserData) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  if (!(await schema.isValid(data))) {
    return {
      code: 400,
      message: 'Validation fails',
    };
  }

  await createMongoConnection();

  const user = await User.findOne({ email: data.email });

  if (!user) {
    return {
      code: 400,
      message: 'User not found',
    };
  }

  user.last_activity = new Date().toString();
  await user.save();

  if (!(await checkPassword(data.password, user.password))) {
    return {
      code: 401,
      message: 'Password does not match',
    };
  }

  const { id, name, email } = user;

  closeMongoConnection();

  return {
    code: 200,
    user: {
      id,
      name,
      email,
    },
    token: jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  };
};

export { signUser };
