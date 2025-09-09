import { PaginationResultDTO } from "@/application/DTOs/pagination-result.dto";
import { Profile } from "@/domain/entities/Profile";
import { IProfileRepository } from "@/domain/repositories/IProfileRepository";

export class ListAllProfilerUseCase  {
  
  constructor(private perfilRepository:IProfileRepository){}

  async execute(params:any):Promise<PaginationResultDTO<Profile>>{
    const perfil = await this.perfilRepository.listAll()

    return PaginationResultDTO.create({
          page:params.page,
          itemsPerPage:params.limit,
          totalItems:10,
          itemsList:perfil,
        })
  }
}