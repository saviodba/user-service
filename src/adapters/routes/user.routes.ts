import { AppError } from "@/core/errors/AppError";
import logger from "@/core/Logger";
import { eAdmin } from "@/shared/middlewares/eAdmin";
import { Request, Response, Router } from "express";
import { makeUserController } from "../factories/userControllerFactory";

const router = Router();
const usuarioController = makeUserController()

router.get("/user/listar",async (req:Request, res:Response)=>{
  try {    
    const lst = await usuarioController.listAllUser(req.query)
    res.status(200).json(lst)
  } catch (error:any) {
    logger.error("Error in list all route", error);
    
    if(error instanceof AppError){
      res.status(error.statusCode).json({ message: error.mensagem });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
})

router.post("/user/cadastrar", eAdmin, async (req: Request, res: Response) => {
  try {
      const data = {
        name:req.body.name,
        user_name:req.body.user_name,
        password:req.body.password,
        cpf: req.body.cpf,
        active: req.body.active,
        idperfil: req.body.idperfil,
        email: req.body.email,
        telefone: req.body.telefone,
        usuarioApi: req.body.usuarioApi,
        chaveApi:req.body.chaveApi
      }

      const retorno = await usuarioController.cadastrar(data)
      res.status(201).json(retorno)
  } catch (error:any) {
    logger.error("Error in post route", error);
      if (error instanceof AppError) {
          res.status(error.statusCode).json({
              message: error.mensagem,
          })
      } else {
          res.status(500).json({ message: "Erro ao realizar operação" })
      }
  }
})

router.put("/user/alterar", eAdmin, async (req: Request, res: Response) => {
  try {
    
    console.log(req.body)
    const retorno = await usuarioController.editar(req.body)
    res.status(200).json(retorno)
  } catch (error:any) {
    logger.error("Error in edit route", error);
      if (error instanceof AppError) {
          res.status(error.statusCode).json({
              message: error.mensagem,
          })
      } else {
          res.status(500).json({ message: "Erro ao realizar operação" })
      }
  }
})

router.put("/user/alterarsenha", eAdmin, async (req: Request, res: Response) => {
  try {      
      const retorno = await usuarioController.alterarSenha(req.body)
      res.status(200).json(retorno)
  } catch (error:any) {
    logger.error("Error in edit password route", error);
      if (error instanceof AppError) {
          res.status(error.statusCode).json({
              message: error.mensagem,
          })
      } else {
          res.status(500).json({ message: "Erro ao realizar operação" })
      }
  }
})

router.delete("/user/deletar", eAdmin, async (req: Request, res: Response) => {
  try {
      const retorno = await usuarioController.deletar(Number(req.query.id))
      res.status(200).json(retorno)
  } catch (error:any) {
    logger.error("Error in delete user route", error);
      if (error instanceof AppError) {
          res.status(error.statusCode).json({
              message: error.mensagem,
          })
      } else {
          res.status(500).json({ message: "Erro ao realizar operação" })
      }
  }
})

router.put("/user/autenticarApi", eAdmin, async (req: Request, res: Response) => {
  try {
      console.log(req.body)
      const retorno = await usuarioController.gerarApiKey(Number(req.body.id))
      res.status(201).json(retorno)
  } catch (error) {
      console.error(error)
      if (error instanceof AppError) {
          res.status(error.statusCode).json({
              message: error.mensagem,
          })
      } else {
          res.status(500).json({ message: "Erro ao realizar operação" })
      }
  }
})


export { router as userRoutes };

