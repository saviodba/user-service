export class Telefone {
  private readonly valor: string;

  private constructor(valor: string) {
    this.validar(valor);
    this.valor = valor;
  }

  static criar(valor: string): Telefone {
    return new Telefone(valor);
  }

  private validar(valor: string): void {
    
    if(!valor || valor.trim() === "")return

    const apenasNumeros = valor.replace(/\D/g, "");

    if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
      throw new Error("Telefone deve conter entre 10 e 11 dígitos");
    }

    const regex = /^[1-9]{2}9?[0-9]{8}$/; // Ex: 11999999999 ou 1133333333
    if (!regex.test(apenasNumeros)) {
      throw new Error("Formato de telefone inválido");
    }
  }

  get formatoE164(): string {
    // Retorna com +55 para uso internacional (E.164)
    return `+55${this.valor}`;
  }

  toString(): string {
    return this.valor;
  }

  equals(outro: Telefone): boolean {
    return this.valor === outro.valor;
  }
}
