export class AppError {
  public readonly statusCode: number;
  public readonly mensagem: string;
  public readonly detalhes?: any;

  constructor(mensagem: string, statusCode: number = 400, detalhes?: any) {
    this.mensagem = mensagem;
    this.statusCode = statusCode;
    this.detalhes = detalhes;
  }

  toJSON() {
    return {
      erro: true,
      statusCode: this.statusCode,
      mensagem: this.mensagem,
      ...(this.detalhes && { detalhes: this.detalhes }),
    };
  }
}
