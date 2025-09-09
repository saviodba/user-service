import { IUsuario, User } from "../entities/User";

export interface IUserRepository {
  findByUser(username: string): Promise<User | null>;
  findById(id:number): Promise<User | null>
  listAll(page:number, limit:number, active:number, filter:string ): Promise<{usuarios:IUsuario[], total:number}| null>;
  create(user:User): Promise<User>
  update(user:User): Promise<void>
  delete(id:number): Promise<void>
}