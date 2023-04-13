import NotFoundException from 'App/Exceptions/NotFoundException'
import { Teacher } from 'App/Models'
import { Exception } from '@adonisjs/core/build/standalone'

export class ListOneTeacherRepository {
  public async handle(secure_id: string) {
    try {
      const teacher = await Teacher.query().where('secure_id', secure_id).preload('address').first()
      if (!teacher) {
        throw new NotFoundException('There is no dependent for this secure id', 404, 'E_NOT_FOUND')
      }

      return {
        secure_id: teacher.secure_id,
        name: teacher.name,
        last_name: teacher.last_name,
        cpf: teacher.cpf,
        training: teacher.training,
        birth_date: teacher.birth_date,
        email: teacher.email,
        alternative_email: teacher.alternative_email,
        rg: teacher.rg,
        gender: teacher.gender,
        naturalness: teacher.naturalness,
        scholarship: teacher.scholarship,
        phone: teacher.phone,
        alternative_phone: teacher.alternative_phone,
        address: {
          street: teacher.address.street,
          number: teacher.address.number,
          neighborhood: teacher.address.neighborhood,
          complement: teacher.address.complement,
        },
      }
    } catch (error) {
      throw new Exception(
        error.message || 'Internal Server Error',
        error.status || 500,
        error.code || 'E_INTERNAL_SERVER_ERROR'
      )
    }
  }
}
