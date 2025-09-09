import { AppError } from "@/core/errors/AppError";
import { MessagesErros } from "@/core/errors/MessageErros";
import { ICryptoService } from "@/domain/repositories/ICryptoService";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { Senha } from "@/domain/value-objects/Senha";

export class UpdatePasswordUseCase {
  constructor(
    private userRepository:IUserRepository,
    private crypto: ICryptoService
  ){}

  async execute(data:Input){
    if(data.password.trim() !== data.confirm_password.trim()){
      throw new AppError(MessagesErros.SENHAS_NAO_CONFEREM)
    }

    const user = await this.userRepository.findById(data.id)

    if(!user){
      throw new AppError("Usuário não localizado.")
    }

    Senha.criar(data.password)

    const newPassword = await this.crypto.hash(data.password)

    user.updatePassword(newPassword)

    await this.userRepository.update(user)
  }
}

type Input = {
  id:number,
  password:string
  confirm_password:string
}