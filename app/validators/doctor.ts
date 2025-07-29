import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const CreateDoctorValidator = vine.compile(
  vine.object({
    crm: vine.string().minLength(3),
    name: vine.string().minLength(3),
    specialties: vine.array(vine.number()),
  })
)

CreateDoctorValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'O nome é obrigatório',
  'crm.required': 'O CRM é obrigatório',
  'crm.minLength': 'O CRM deve ter pelo menos 3 caracteres',
  'crm.maxLength': 'O CRM deve ter no máximo 20 caracteres',
  'crm.unique': 'Este CRM já está cadastrado',
  'specialties.required': 'Pelo menos uma especialidade é obrigatória',
  'specialties.array': 'As especialidades devem ser um array de IDs',
  'specialties.minLength': 'Pelo menos uma especialidade deve ser selecionada',
})

export const ListingValidator = vine.compile(
  vine.object({
    search: vine.string().trim().optional(),
    orderBy: vine.string().trim().optional(),
    orderDirection: vine.enum(['asc', 'desc'] as const).optional(),
    page: vine.number().positive().optional(),
    take: vine.number().positive().max(100).optional(),
  })
)
