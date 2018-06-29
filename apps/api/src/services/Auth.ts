import { Request } from 'express';
import { UserRepository, User } from '../repository/UserRepository';

export const getUserFromAuthToken: (
  request: Request,
  repo: UserRepository,
) => Promise<User> = async (request, repo) => {
  const [provider, id] = request.user.sub.split('|');
  if (provider === 'auth0') {
    return repo.getByAuth0Id(id);
  } else if (provider === 'email') {
    const email = request.user['http://steps-admin.herokuapp.com/email'];
    const user = await repo.getByEmail(email);
    if (user.type === 'Client') {
      return user;
    }
  }
};
