export interface ICryptoService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export interface ITokenService {
  generateToken(payload: object, expiresIn:string): string;
  verifyToken(token: string): any;
}
