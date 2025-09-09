export class Email {
  private _value: string;

  constructor(email: string) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
          throw new Error("E-mail inválido");
      }
      this._value = email;
  }

  get value(): string {
      return this._value;
  }
}
