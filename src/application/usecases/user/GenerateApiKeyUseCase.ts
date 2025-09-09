import { AppError } from "@/core/errors/AppError";
import { MessagesErros } from "@/core/errors/MessageErros";
import { ITokenService } from "@/domain/repositories/ICryptoService";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class GenerateApiKeyUseCase {
  constructor(
    private userRepostirory:IUserRepository,
    private readonly tokenService: ITokenService
  ){}

  async execute(data:Params){
    const user = await this.userRepostirory.findById(data.id)

    if(!user){
      throw new AppError(MessagesErros.USUARIO_NAO_ENCONTRADO,401)
    }

    const token = this.tokenService.generateToken({id:data.id, user_name:user.user_name},"1000y")

    user.ativarApikey(token)

    this.userRepostirory.update(user)

    return {
      token,
      message: "Token gerado com sucesso!",
    }
  }
}

type Params = {
  id:number  
}