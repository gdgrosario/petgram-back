interface IPayload {
    user: IUser;
}

/* User interface */
interface IUser extends TMongoDocument {
    email: string;
    password: string;
    name: string;
    phone: string;
}
