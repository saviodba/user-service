import { AppError } from "@/core/errors/AppError";
import { IUsuario, User } from "@/domain/entities/User";
import { ICryptoService } from "@/domain/repositories/ICryptoService";
import { IProfileRepository } from "@/domain/repositories/IProfileRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(
    private userRepository:IUserRepository, 
    private perfilRepository:IProfileRepository,
    private crypto: ICryptoService
  ){}
  async execute(dataUser:Input):Promise<IUsuario>{
    
    if(!dataUser){
      throw new AppError("Informe os dados do usuário.")
    }

    const userExists = await this.userRepository.findByUser(dataUser.user_name)

    if(userExists){
      throw new AppError(`Já existe um usuário cadastrado com o login ${userExists.user_name}`)
    }

    const perfil  = await this.perfilRepository.findById(dataUser.idperfil)

    const passHasch = await this.crypto.hash(dataUser.password)
    const user = User.create({
      cpf: dataUser.cpf,
      active: dataUser.active,
      name: dataUser.name,
      user_name: dataUser.user_name,
      password: passHasch,
      idperfil: Number(dataUser.idperfil),
      email: dataUser.email || "",
      telefone: dataUser.telefone || "",
      usuarioApi: dataUser.usuarioApi || false,
      chaveApi: dataUser.chaveApi || "",
      perfil: perfil
    });

    const retorno = await this.userRepository.create(user)

    return {
      id: retorno.id,
      cpf: retorno.cpf,
      active: retorno.active,
      name: retorno.name,
      user_name: retorno.user_name,
      idperfil: retorno.idperfil,
      email: retorno.email,
      telefone: retorno.telefone,
      usuarioApi: retorno.usuarioApi,
      chaveApi: retorno.chaveApi
    }
  }
}

type Input = {
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