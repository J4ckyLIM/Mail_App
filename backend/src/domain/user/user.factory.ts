import { User, UserCreateArgs } from "./user.entity";

interface UserFactoryArgs extends Omit<UserCreateArgs, 'name' | 'password'> {
  name?: string;
  password?: string;
}

export const userFactory = ({
  name = 'John Doe',
  email = 'john.doe@gmail.com',
  password = 'password',
}: UserFactoryArgs): User => {
  return new User({ name, email, password });
}