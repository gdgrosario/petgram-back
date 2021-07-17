type SuccessCodes = 200 | 201;
type ErrorCodes = 400 | 401 | 404 | 500;

interface IResponse<T> {
  200: T;
  201: T;
  400: T;
  401: T;
  404: T;
  500: T;
}

const statusResponses: IResponse<string> = {
  200: 'OK!',
  201: 'CREATED!',
  400: 'CLIENT ERROR!',
  401: 'UNAUTHORIZED',
  404: 'NOT FOUND!',
  500: 'INTERNAL SERVER ERROR'
};

export const success = (
  res: TResponse,
  data: Object | string,
  statusCode: SuccessCodes,
) => res.status(statusCode).json({ messageStatus: statusResponses[statusCode], data, status: statusCode });

export const error = (
  res: TResponse,
  data: string,
  statusCode: ErrorCodes,
) => res.status(statusCode).json({ messageStatus: statusResponses[statusCode], data, status: statusCode });


