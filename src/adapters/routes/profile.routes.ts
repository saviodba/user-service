import { AppError } from "@/core/errors/AppError";
import { MessagesErros } from "@/core/errors/MessageErros";
import { eAdmin } from "@/shared/middlewares/eAdmin";
import { Request, Response, Router } from "express";
import { makePerfilController } from "../factories/profileControllerFactory";

const router = Router()
const perfilController = makePerfilController()

router.get('/perfil/listar', eAdmin, async(req:Request, res:Response)=>{
  try {
    const retorno = await perfilController.listar(req.query)
    res.status(200).json(retorno)
  } catch (error:any) {
    if(error instanceof AppError){
      res.status(error.statusCode).json(error.mensagem)
    }else {
      res.status(500).json({message:MessagesErros.ERRO_DEFAULT_500})
    }
  }
})

router.put('/perfil/editar', eAdmin, async(req:Request, res:Response)=>{
  
})

router.post('/perfil/cadastrar', eAdmin,async(req:Request, res:Response)=>{
  
})

router.get('/perfil/buscar-por-id', eAdmin,async(req:Request, res:Response)=>{
  
})

router.delete('/perfil/deletar', eAdmin, async(req:Request, res:Response)=>{
  
})


export { router as profileRouter };

