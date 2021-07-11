import { IUser, User } from '../../src/models/user';
import * as dbHandler from '../mock.db';

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe('user test', () => {
  it('can be created correctly', async () => {
    // expect that two assertios will be made
    expect.assertions(3);
    // create new post model instance
    const user: IUser = new User();
    // set some test properties
    user.email = 'user@example.com';
    user.password = 'HashedSecretString';
    user.name = 'Example User';
    user.phone = '1111-1111';
    // save test post to in-memory db
    await user.save();
    // find inserted user by email
    const userInDb = await User.findOne({ email: 'user@example.com' });
    // check that user data is correct
    expect(userInDb.password).toEqual('HashedSecretString');
    expect(userInDb.name).toEqual('Example User');
    expect(userInDb.phone).toEqual('1111-1111');
  });
});
