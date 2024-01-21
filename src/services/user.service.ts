import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }
  public async getById(id): Promise<IUser> {
    const users = await userRepository.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new ApiError("user not found", 404);
    }
    return users[index];
  }
}

export const userService = new UserService();
