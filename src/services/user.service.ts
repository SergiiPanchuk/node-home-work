import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();

    return users;
  }
  public async getById(id): Promise<IUser> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }

  public async updateById(id, body: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return await userRepository.updateById(id, body);
  }

  public async deleteById(id): Promise<void> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("user not found", 404);
    }
    await userRepository.deleteById(id);
  }
}

export const userService = new UserService();
