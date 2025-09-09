import { CreateUserUseCase } from "@/application/usecases/user/CreateUserUsecase";
import { GenerateApiKeyUseCase } from "@/application/usecases/user/GenerateApiKeyUseCase";
import { ListAllUserUseCase } from "@/application/usecases/user/ListAllUserUseCase";
import { UpdatePasswordUseCase } from "@/application/usecases/user/UpdatePasswordUseCase";
import { UpdateUserUseCase } from "@/application/usecases/user/UpdateUserUseCase";
import { ProfileDao } from "@/infrastructure/database/dao/ProfileDao";
import { UserDao } from "@/infrastructure/database/dao/UserDao";
import { BcryptService } from "@/infrastructure/providers/BcryptService";
import { JwtService } from "@/infrastructure/providers/JwtService";
import { UserController } from "../controllers/User.Controller";

export function makeUserController():UserController{
  const userDao = new UserDao()
  const bcryptService = new BcryptService()
  const lisAllUsecase = new ListAllUserUseCase(userDao)
  const createUserUseCase = new CreateUserUseCase(userDao, new ProfileDao(),bcryptService)
  const updateUserUseCase = new UpdateUserUseCase(userDao)
  const updatePasswordUsecase = new UpdatePasswordUseCase(userDao, bcryptService)
  const generateApiKeyUseCase = new GenerateApiKeyUseCase(userDao,  new JwtService())

  return new UserController(
    lisAllUsecase,
    createUserUseCase,
    updateUserUseCase,
    updatePasswordUsecase,
    generateApiKeyUseCase
  )
}