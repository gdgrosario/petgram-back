import { User } from '../../models/user';
import { comparePassword } from '../../utils/crypto';
import { generateJWT } from '../../utils/jwt';

export class AuthService {
  constructor() {}

  /**
   * Validate the user's email and password.
   * Return a promise with a boolean value, if the password is valid.
   * @method
   * @param {string} email
   * @param {string} password
   * @return {boolean}
   * @access private
   */
  private checkUserCredentials = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const user = await User.findOne({ email: email });

    if (user) {
      const result = comparePassword(password, user.password);
      return result;
    } else {
      throw { message: 'Invalid credentials', code: 401 };
    }
  };

  public login = async (email: string, password: string): Promise<Object> => {
    if (!email || !password) {
      throw { message: 'Missing data', code: 400 };
    } else {
      await this.checkUserCredentials(email, password);

      const user = await User.findOne({ email: email });
      const token = generateJWT({ user });

      return { token, user };
    }
  };
}
