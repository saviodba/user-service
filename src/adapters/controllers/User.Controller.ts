import { CreateUserUseCase } from "@/application/usecases/user/CreateUserUsecase"
import { GenerateApiKeyUseCase } from "@/application/usecases/user/GenerateApiKeyUseCase"
import { ListAllUserUseCase } from "@/application/usecases/user/ListAllUserUseCase"
import { UpdatePasswordUseCase } from "@/application/usecases/user/UpdatePasswordUseCase"
import { UpdateUserUseCase } from "@/application/usecases/user/UpdateUserUseCase"
import { InputUserDto } from "../DTOs/InputUserDto"

export class UserController{
  
  constructor(
    private listAllUseCase:ListAllUserUseCase,
    private createUserUseCase:CreateUserUseCase,
    private updateUserUseCase:UpdateUserUseCase,
    private updatePasswordUseCase:UpdatePasswordUseCase,
    private generateApiKeyUseCase:GenerateApiKeyUseCase
  ){}

  async listAllUser(data:any){

    const {page, limit, active,filter} = data

    return await this.listAllUseCase.execute({page, limit, active, filter})
  }

  async deletar(id:number){

  }

  async cadastrar(data:InputUserDto){
     
    return await this.createUserUseCase.execute(data)
  }

  async editar(data:InputUserDto){
    const updatedData = {
      id: data.id!, 
      name: data.name,
      user_name: data.user_name,
      password: data.password,
      cpf: data.cpf,
      active: data.active,
      idperfil: data.idperfil,
      email: data.email,
      telefone: data.telefone, 
      usuarioApi: data.usuarioApi,
      chaveApi: data.chaveApi
    }
    return await this.updateUserUseCase.execute(updatedData)
  }

  async alterarSenha(data:{id:number, password:string, confirm_password:string}){
      return this.updatePasswordUseCase.execute(data)
  }

  async gerarApiKey(id:number){
    return this.generateApiKeyUseCase.execute({id})
  }

}