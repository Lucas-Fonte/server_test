/* eslint-disable object-curly-newline */
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import { UserData } from '.';
import {
  createMongoConnection,
  closeMongoConnection,
} from '../../database/createMongoConnection';
import { User } from '../../models/User';
import { authConfig } from '../../config/auth';

const createUser = async (data: UserData) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4),
  });

  if (!(await schema.isValid(data))) {
    return {
      code: 400,
      message: 'Validation fails',
    };
  }

  const { name, email, password, phones } = data;

  await createMongoConnection();

  const userExists = await User.exists({
    email,
  });

  if (userExists) {
    return {
      code: 400,
      message: 'User already exists',
    };
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 8),
    phones,
    last_activity: new Date().toString(),
  });

  closeMongoConnection();

  return {
    code: 201,
    id: user.id,
    name,
    email,
    token: jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  };
};

export { createUser };
