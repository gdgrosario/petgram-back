import { hashSync, compareSync } from 'bcrypt';

export const hashPassword = (plainText: string) => {
  return hashSync(plainText, 10);
};

export const comparePassword = (plainText: string, hashPassword: string) => {
  return compareSync(plainText, hashPassword);
};
