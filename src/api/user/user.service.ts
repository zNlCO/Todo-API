import { User as UserModel } from "./user.model";
import { UserIdentity as UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserExistsError } from "../../errors/user-exists";
import * as bcrypt from 'bcrypt';

export class UserService {

  async add(user: User, credentials: {username: string, password: string}): Promise<User> {
    const existingIdentity = await UserIdentityModel.findOne({'credentials.username': credentials.username});
    if (existingIdentity) {
      throw new UserExistsError();
    }
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newUser = await UserModel.create(user);

    await UserIdentityModel.create({
      provider: 'local',
      user: newUser._id,
      credentials: {
        username: credentials.username,
        hashedPassword
      }
    })

    return newUser;
  }

  async list(userId: string): Promise<User[]> {
    // Recupera tutti gli utenti
    const users = await UserModel.find();

    // Trova l'utente con l'ID specificato
    const selectedUser = users.find(user => user.id === userId);

    // Filtra il resto degli utenti escludendo quello selezionato
    const otherUsers = users.filter(user => user.id !== userId);

    // Ritorna l'utente selezionato seguito dagli altri
    return selectedUser ? [selectedUser, ...otherUsers] : otherUsers;
  }
  
}

export default new UserService();
