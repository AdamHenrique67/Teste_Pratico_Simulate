import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

export const celebrate = (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (isCelebrateError(err)) {
    const values = err.details.values();

    let { message } = values.next().value.details[0];

    message = message.replace('"', '').replace('"', '');

    return response.status(400).json({
      status: 'error',
      type: 'validation',
      message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });

}