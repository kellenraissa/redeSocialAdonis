import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const CreateComorbityValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)

CreateComorbityValidator.messagesProvider = new SimpleMessagesProvider({
  'name.required': 'O nome é obrigatório',
})
