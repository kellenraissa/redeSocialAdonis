import type { HttpContext } from '@adonisjs/core/http'
import { CreateDoctorValidator } from '#validators/doctor'
import Doctor from '#models/doctor'

export default class DoctorController {
  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(CreateDoctorValidator)

      const { specialties, ...doctorData } = data

      const doctor = await Doctor.create(doctorData)

      await doctor.related('specialties').attach(specialties)

      return response.created({ message: 'Médico cadastrado com sucesso!', doctor })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao criar médico',
        error: error.messages || error.message,
      })
    }
  }
}
