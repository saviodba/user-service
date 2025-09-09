import { AppError } from "@/core/errors/AppError";
import logger from "@/core/Logger";
import { Profile } from "@/domain/entities/Profile";
import { IProfileRepository } from "@/domain/repositories/IProfileRepository";
import { PrismaClient } from "../generated/prisma";

export class ProfileDao implements IProfileRepository {

  private prisma: PrismaClient
  constructor(){
    this.prisma = new PrismaClient()
  }
  
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  create(data: Profile): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(data: Profile): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async listAll(): Promise<Profile[] | null> {
    try {
      const perfilUser = await this.prisma.perfilusuario.findMany({
        select:{
          id:true,
          descricao:true,
      },
      })

      if(!perfilUser || perfilUser.length === 0){
        return null
      }

      return  perfilUser.map(perfil =>{
        return   new Profile(
          perfil.id,
          perfil.descricao
        )
      })      

    } catch (error) {
      logger.error(error)
      throw new AppError("Erro ao realizar consulta de Perfil")
    }
  }

  async findById(id: number): Promise<Profile> {
    try {
      const perfil = await this.prisma.perfilusuario.findUnique({
        where:{
          id:Number(id)
        }
      })

      return new Profile(perfil.id, perfil.descricao)

    } catch (error) {
      throw new AppError("Erro ao realizar consulta de Perfil")
    }
  }

  async findByName(name: string): Promise<Profile> {
    throw new Error("Method not implemented.");
  }

}