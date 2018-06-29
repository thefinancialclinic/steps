export const userPermissionMiddleware = controller => {
  return async (req, res, next) => {
    const controllerInstance = new controller();
    try {
      const isAllowed = await controllerInstance.isAllowed(req);
      if (isAllowed) {
        return next();
      } else {
        return res.status(403).send({ message: 'Forbidden' });
      }
    } catch (err) {
      console.log(`Permission middleware exception: ${err}`);
      return res.status(403).send({ message: 'Forbidden' });
    }
  };
};
