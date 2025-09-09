// src/infrastructure/services/JwtService.ts
import { ITokenService } from "@/domain/repositories/ICryptoService";
import jwt from "jsonwebtoken";

export class JwtService implements ITokenService {
  generateToken(payload: object, expiresIn:string): string {
    return jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn,
    });

    
  }

  verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  }
}
