import { userFactory } from "src/domain/user/user.factory";

export const seedUsers = [
  userFactory({ email: 'jacky@gmail.com', name: 'Jacky' }),
  userFactory({ email: 'john.doe', name: 'John Doe' }),
  userFactory({ email: 'marie.jane', name: 'Marie Jane' }),
]