import { ListAllProfilerUseCase } from "@/application/usecases/perfil/ListAllProfilerUseCase";
import { ProfileDao } from "@/infrastructure/database/dao/ProfileDao";
import { PerfilController } from "../controllers/Perfil.Controller";

export function makePerfilController():PerfilController {
  const profileDao = new ProfileDao()
  const listAllUseCase = new ListAllProfilerUseCase(profileDao)
  
  return new PerfilController(listAllUseCase)
}