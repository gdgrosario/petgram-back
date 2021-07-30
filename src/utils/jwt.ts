import jwt from 'jsonwebtoken';

export const generateJWT = (payload: IPayload, expiresIn: number | string = '24h') => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || '$jKDkkdJMFD55114WD1FD4SszD',
    {
      expiresIn
    }
  );

  return token;
};
