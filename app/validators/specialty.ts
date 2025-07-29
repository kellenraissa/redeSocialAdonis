import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const CreateSpecialtyValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)

CreateSpecialtyValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'O nome é obrigatório',
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
