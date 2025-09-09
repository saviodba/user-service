export class Cpf {
  private _value: string;

  constructor(cpf: string) {
      if (!Cpf.validarCpf(cpf)) {
          throw new Error("CPF inválido");
      }
      this._value = cpf;
  }

  static validarCpf(cpf: string): boolean {
      // Lógica de validação de CPF aqui
      return true;
  }

  get value(): string {
      return this._value;
  }
}
