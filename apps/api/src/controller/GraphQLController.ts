export class GraphQLController {
  isAllowed({ user }) {
    return user.type === 'Superadmin';
  }
}
