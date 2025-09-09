export interface InputUserDto {
  id?:number
  name:string
  user_name:string
  password:string
  cpf: string
  active: boolean
  idperfil: number
  email?: string
  telefone?: string
  usuarioApi?: boolean
  chaveApi?: string 
}