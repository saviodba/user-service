import { AppError } from "@/core/errors/AppError";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class UpdateUserUseCase {
  constructor(private userRepository:IUserRepository){}
  
  async execute(userData:Input){
    const user = await this.userRepository.findById(userData.id)

    if(!user){
      throw new AppError("Usuário não encontrado.")
    }

    user.atualizarDados({      
      cpf: userData.cpf,
      active: userData.active,
      name: userData.name,
      user_name: userData.user_name,
      idperfil: userData.idperfil,
      email: userData.email,
      telefone: userData.telefone,
      usuarioApi: userData.usuarioApi,
      chaveApi: userData.chaveApi,
      password:userData.password
    })
    

    return await this.userRepository.update(user)
  }
}

type Input = {
  id:number
  cpf: string
  active: boolean
  name: string
  user_name: string
  password: string
  idperfil: number
  email?: string
  telefone?: string
  usuarioApi?: boolean
  chaveApi?: string 
}