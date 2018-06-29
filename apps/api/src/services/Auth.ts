import { Request } from 'express';
import { UserRepository, User } from '../repository/UserRepository';

export const getUserFromAuthToken: (
  request: any,
  repo: UserRepository,
) => Promise<User> = async (req, repo) => {
  let _provider, id;
  if (req.token.gty) {
    // M2M token
    id = req.token.azp;
    return repo.getByAuth0Id(id);
  } else {
    const [provider, id] = req.token.sub.split('|');
    if (provider === 'auth0') {
      return repo.getByAuth0Id(id);
    } else if (provider === 'email') {
      const email = req.token['http://steps-admin.herokuapp.com/email'];
      const user = await repo.getByEmail(email);
      if (user.type === 'Client') {
        return user;
      }
    }
    return null;
  }
};
