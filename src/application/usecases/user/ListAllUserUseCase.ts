import { PaginationResultDTO } from "@/application/DTOs/pagination-result.dto";
import { AppError } from "@/core/errors/AppError";
import { IUsuario } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

type Input = {
  page:number,
  limit:number
  active:number
  filter:string
}
export class ListAllUserUseCase {
  constructor(private userRepository:IUserRepository){}

  async execute(params:Input):Promise<PaginationResultDTO<IUsuario>>{
    const {usuarios, total} = await this.userRepository.listAll(params.page, params.limit, params.active, params.filter)

    if(!usuarios){
      throw new AppError("Lista de usuários não localizada")
    }

    return PaginationResultDTO.create({
      page:params.page,
      itemsPerPage:params.limit,
      totalItems:total,
      itemsList:usuarios,
    })

  }
}

