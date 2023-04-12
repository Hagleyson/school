export interface ITeacherDTO {
  name: string
  last_name: string
  cpf: string
  training: string
  birth_date: string
  address: {
    street: string
    number: string
    neighborhood: string
    complement?: string
  }
}
