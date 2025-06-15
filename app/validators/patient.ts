import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const UpdateComorbiditiesValidator = vine.compile(
  vine.object({
    comorbidities: vine.array(vine.number()),
  })
)

UpdateComorbiditiesValidator.messagesProvider = new SimpleMessagesProvider({
  'comorbidities.required': 'A lista de comorbidades é obrigatória',
  'comorbidities.array': 'Comorbidades devem ser um array',
  'comorbidities.*.number': 'Cada comorbidade deve ser um número válido',
})
