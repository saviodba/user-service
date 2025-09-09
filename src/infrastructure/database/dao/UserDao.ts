import { AppError } from "@/core/errors/AppError";
import logger from "@/core/Logger";
import { IUsuario, User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { PrismaClient } from "../generated/prisma";


export class UserDao implements IUserRepository {
  
  private prisma: PrismaClient
  constructor(){
    this.prisma = new PrismaClient()
  }

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.logins.findUnique({
        where:{
          id      
        },
        include:{
          perfil:true
        }
      })
  
      if(!user){
        return null
      }
      
      return User.create({
        id: user.id,
        cpf:user.cpf,
        active:user.active,
        name: user.name,
        user_name:user.user_name,
        idperfil:user.idperfil, 
        password:user.password,
      })   
    } catch (error) {
      logger.error("Erro ao consultar usuários: ", error)
      throw new AppError('Erro ao consultar usuários') 
    }

  }

  async listAll(page: number, limit: number, active:number, filter:string):Promise<{usuarios:IUsuario[], total:number}| null> {
    const skip = (page -1) * limit
    
    const activeNumber = Number(active) 
    const search = String(filter ?? '').toLowerCase()


    const where = {
      ...(activeNumber !== -1 && {active:activeNumber === 1}),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { user_name: { contains: search } }
        ]
      })
    }

  
    try {      
      const [usuarios, total] = await Promise.all([
        this.prisma.logins.findMany({
          where,
          skip,
          take:Number(limit),
          include:{
            perfil:true
          }         
        }),

        this.prisma.logins.count({
          where
        })
      ])

      
      if(!usuarios){
        return null
      }

      const lstUsers =  usuarios.map(user=>{
        return {
        id:user.id,
        name:user.name,
        user_name:user.user_name,
        active:user.active,
        cpf:user.cpf,
        usuarioApi:user.usuarioAPi,
        chaveApi:user.chaveApi,
        idperfil:user.idperfil,
        password:user.password,
        email:user.email,
        telefone:user.telefone,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt
      }
    })      

    return {
      total,
      usuarios:lstUsers
    }

    } catch (error:any) {
      logger.error("Erro ao listar usuários: ", error)
      throw new AppError('Erro ao listar usuários')
    }
  }

  async create(user: User): Promise<User> {
    try {
      const newuser = await this.prisma.logins.create({ 
        data: {          
          cpf: user.cpf,
          active: user.active,
          name: user.name,
          user_name: user.user_name,
          idperfil: user.idperfil,
          password: user.password,
          email: user.email,
          telefone: user.telefone,
          createdAt: new Date(), 
          updatedAt: new Date(), 
          usuarioAPi: user.usuarioApi, 
          chaveApi:user.chaveApi
        }
      })

      return User.create(newuser)

    } catch (error) {
      logger.error("Erro ao criar usuários: ", error)
      throw new AppError('Erro ao criar usuários') 
    }
  }

  async update(user: User): Promise<void> {
    try {
      await this.prisma.logins.update({ 
        data: {          
          cpf: user.cpf,
          active: user.active,
          name: user.name,
          user_name: user.user_name,
          idperfil: user.idperfil,
          password: user.password,
          email: user.email,
          telefone: user.telefone,          
          updatedAt: new Date(), 
          usuarioAPi: user.usuarioApi, 
          chaveApi:user.chaveApi
        },
        where:{
          id:user.id
        }
      })     

    } catch (error) {
      logger.error("Erro ao alterar usuário: ", error)
      throw new AppError('Erro ao alterar usuário') 
    }
  }

  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByUser(username: string): Promise<User | null> {
    
    try { 
      
      const user = await this.prisma.logins.findMany({
        where:{
          user_name:username
        },
        include:{
          perfil:true
        }
      })

      if(!user || user.length === 0){
        return null
      }
      
      return User.create({
        id: user[0].id,
        cpf:user[0].cpf,
        active:user[0].active,
        name: user[0].name,
        user_name:user[0].user_name,
        idperfil:user[0].idperfil, 
        password:user[0].password,
        createdAt:user[0].createdAt,
        updatedAt:user[0].updatedAt
      })

    } catch (error:any) {
      logger.error("Erro ao realizar consulta do usuário", error)
      throw new AppError('Erro ao realizar consulta do usuário')
    }
  
  }

}