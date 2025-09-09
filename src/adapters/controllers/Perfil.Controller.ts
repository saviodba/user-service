import { ListAllProfilerUseCase } from "@/application/usecases/perfil/ListAllProfilerUseCase";

export class PerfilController {
  constructor(private listallProfileUseCase:ListAllProfilerUseCase){}

  async listar(data:any){
    
    return this.listallProfileUseCase.execute(data)
  }

  async cadastrar(data:any){

  }

  async editar(data:any){

  }

  async buscarPorId(id:number){

  }

  async delete(id:number){

  }
}