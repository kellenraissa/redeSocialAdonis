import type { HttpContext } from '@adonisjs/core/http'
import Patient from '#models/patient'
import { UpdateComorbiditiesValidator } from '#validators/patient'

export default class PatientController {
  public async index({ response }: HttpContext) {
    try {
      const patients = await Patient.query().preload('user').preload('comorbidities')
      return response.ok(patients)
    } catch (error) {
      return response.internalServerError({
        message: 'Erro ao listar pacientes',
        error: error?.messages || error?.message || 'Erro interno',
      })
    }
  }

  //Por id
  public async show({ params, response }: HttpContext) {
    try {
      const patient = await Patient.query()
        .where('patient_id', params.id)
        .preload('user')
        .preload('comorbidities')
        .firstOrFail()

      return response.ok(patient)
    } catch (error) {
      return response.notFound({
        message: 'Paciente não encontrado',
        error: error?.messages || error?.message || 'Erro interno',
      })
    }
  }

  public async updateComorbidities({ params, request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(UpdateComorbiditiesValidator)
      const comorbidityIds = data.comorbidities

      const patient = await Patient.firstOrFail(params.id)

      await patient.related('comorbidities').sync(comorbidityIds)

      return response.ok({ message: 'Comorbidades atualizadas com sucesso' })
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao atualizar comorbidades',
        error: error?.messages || error?.message || 'Erro interno',
      })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const patient = await Patient.findOrFail(params.id)
      await patient.delete()

      return response.ok({ message: 'Paciente removido com sucesso' })
    } catch (error) {
      return response.notFound({
        message: 'Paciente não encontrado',
        error: error?.messages || error?.message || 'Erro interno',
      })
    }
  }
}
