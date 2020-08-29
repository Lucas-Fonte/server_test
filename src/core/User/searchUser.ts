import { subMinutes } from 'date-fns';
import {
  createMongoConnection,
  closeMongoConnection,
} from '../../database/createMongoConnection';
import { User } from '../../models/User';

const searchUser = async (userId: string) => {
  await createMongoConnection();

  const latestActiveSession = subMinutes(new Date(), 30);

  const user = await User.findOne({
    _id: userId,
    last_activity: { $gte: latestActiveSession },
  });
  console.log({ latestActiveSession, last_activity: user.last_activity });

  if (!user) {
    return {
      code: 440,
      message: 'Session Expired',
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
  };
};

export { searchUser };
