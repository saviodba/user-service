import { AppError } from "@/core/errors/AppError";

export class Senha {
  private constructor(private readonly valor: string) {}

  static criar(valor: string): Senha {
    if (!valor || valor.trim() === '') throw new AppError('Senha não pode ser em branco');
    if (valor.length < 2) throw new AppError('Senha deve ter no mínimo 2 caracteres');
    //if (!/[A-Z]/.test(valor)) throw new Error('Senha deve conter letra maiúscula');
    //if (!/[0-9]/.test(valor)) throw new Error('Senha deve conter número');

    return new Senha(valor);
  }

  get valorDaSenha() {
    return this.valor;
  }
}
