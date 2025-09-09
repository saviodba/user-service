import logger from "@/core/Logger"
import { NextFunction, Request, Response } from "express"

export const eAdmin = (req:Request, res:Response, next:NextFunction) =>{
  try {
    next()
  } catch (error) {
    logger.error('Erro ao realizar autenticação')
    
  }
}