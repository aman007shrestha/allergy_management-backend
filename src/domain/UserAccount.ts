interface IUser {
  user_id: number;
  email: string;
  password: string;
}
export type IUserToInsert = Omit<IUser, "user_id">;
export type IReturnedUser = Omit<IUser, "password">;

export default IUser;
