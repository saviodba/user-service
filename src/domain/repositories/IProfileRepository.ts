import { Profile } from "../entities/Profile"

export interface IProfileRepository {
  listAll():Promise<Profile[]>
  create(profile:Profile):Promise<any>
  update(profile:Profile):Promise<any>
  delete(id:number):Promise<void>
  findById(id:number):Promise<Profile>
  findByName(name:string):Promise<Profile>
}