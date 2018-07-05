import { Response, Request, NextFunction } from 'express';

// Exceptions containing this pattern get turned into 404s
const notFoundPat = /NOT_FOUND/;

/// Wrap a controller in an error handler
export const extend = <T>(controller: T): T => {
  let newController = {};
  Object.keys(controller).forEach(key => {
    newController[key] = async (
      request: Request & { user: any },
      response: Response,
      next: NextFunction,
    ) => {
      const action = controller[key];
      try {
        return await action(request, response, next);
      } catch (err) {
        // Handle otherwise unhandled errors
        const { method, path } = request;
        if (typeof err === 'string' && notFoundPat.test(err)) {
          return response.status(404).send({ message: 'Not found' });
        }
        console.log(`API error [${method} ${path}]: ${err}`);
        return response
          .status(500)
          .json({ error: err || 'Something went wrong' });
      }
    };
  });
  return newController as T;
};
