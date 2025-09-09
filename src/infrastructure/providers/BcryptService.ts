// src/infrastructure/services/BcryptService.ts
import { ICryptoService } from "@/domain/repositories/ICryptoService";
import bcrypt from "bcrypt";

export class BcryptService implements ICryptoService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
