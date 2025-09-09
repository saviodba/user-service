import { AppError } from "@/core/errors/AppError"
import { Cpf } from "../value-objects/Cpf"
import { Email } from "../value-objects/Email"
import { Telefone } from "../value-objects/Telefone"
import { Profile } from "./Profile"

export interface IUsuario {
    id?: number
    cpf: string
    active: boolean
    name: string
    user_name: string
    password?: string
    idperfil: number
    email?: string
    telefone?: string
    usuarioApi?: boolean
    chaveApi?: string
    perfil?:Profile   
    createdAt?:Date
    updatedAt?:Date
}

export class User {    

    private constructor(
        private _id: number,
        private _cpf: string,
        private _active: boolean,
        private _name: string,
        private _user_name: string,
        private _password: string,
        private _idperfil: number,
        private _email: string,
        private _telefone: string,
        private _usuarioApi: boolean,
        private _chaveApi: string,
        private _perfil:Profile,
        private _createdAt?:Date,
        private _updatedAt?:Date
    ) {}

    static create(usuario: IUsuario): User {
        const cpf = new Cpf(usuario.cpf);
        const email = usuario.email ? new Email(usuario.email) : null;
        const telefone = Telefone.criar(usuario.telefone)

        const user = new User(
            usuario.id || 0,
            cpf.value,
            usuario.active,
            usuario.name,
            usuario.user_name,
            usuario.password,
            usuario.idperfil,
            email?.value || "",
            telefone.toString(),
            usuario.usuarioApi || false,
            usuario.chaveApi,
            usuario.perfil,
            usuario.createdAt || new Date(),
            usuario.updatedAt || new Date()
        )

        user.validarNome(usuario.name)

        return user
    }

    updatePassword(password:string){       
        this._password = password
    }

    atualizarDados(dados: Partial<Omit<IUsuario, 'id'>>) {
        if (dados.name) this.alterarNome(dados.name);
        if (dados.user_name) this.alterarUserName(dados.user_name);
        //if (dados.password) this.alterarSenha(dados.password);
        if (typeof dados.active === 'boolean') this.alterarStatus(dados.active);
        if (dados.idperfil !== undefined) this.alterarPerfil(dados.idperfil);
        if (dados.email) this.alterarEmail(dados.email);
        if (dados.telefone) this.alterarTelefone(dados.telefone);
        if (dados.usuarioApi !== undefined) this.alterarUsuarioApi(dados.usuarioApi);
        if (dados.chaveApi) this.alterarChaveApi(dados.chaveApi);
        this._updatedAt = new Date()
    }

    alterarNome(nome:string){
        this.validarNome(nome)
        this._name = nome
    }
    alterarUserName(user_name:string){
        this._user_name = user_name
    }
    alterarChaveApi(value:string){
        this._chaveApi = value
    }
    alterarUsuarioApi(value:boolean){
        this._usuarioApi = value
    }

    alterarTelefone(telefone:string){
        this._telefone = Telefone.criar(telefone).toString()
    }

    alterarEmail(email:string){
        this._email = new Email(email).value
    }

    alterarPerfil(id_perfil:number){
        this._idperfil = id_perfil
    }

    alterarStatus(flag:boolean){
        this._active = flag
    }

    ativarApikey(key:string){
        this._chaveApi = key
        this._usuarioApi = true
        this._updatedAt = new Date()
    }

    private validarNome(nome: string) {
        if (!nome || nome.trim().length < 3) {
          throw new AppError("Nome deve ter ao menos 3 caracteres");
        }
    } 
    
    

    get id(): number {
        return this._id
    }
    get cpf(): string {
        return this._cpf
    }
    get active(): boolean {
        return this._active
    }
    get name(): string {
        return this._name
    }
    get user_name(): string {
        return this._user_name
    }
    get password(): string {
        return this._password
    }
    get idperfil(): number {
        return this._idperfil
    }
    get email(): string {
        return this._email
    }
    get telefone(): string {
        return this._telefone
    }
    get usuarioApi(): boolean {
        return this._usuarioApi
    }
    get chaveApi(): string {
        return this._chaveApi
    }

    toObject(): IUsuario {
        return {
            id: this._id,
            cpf: this._cpf,
            active: this._active,
            name: this._name,
            user_name: this._user_name,
            password: this._password,
            idperfil: this._idperfil,
            email: this._email,
            telefone: this._telefone,
            usuarioApi: this._usuarioApi,
            chaveApi: this._chaveApi,
            perfil: this._perfil,
            updatedAt:this._updatedAt,
            createdAt:this._createdAt
        };
    }
}
