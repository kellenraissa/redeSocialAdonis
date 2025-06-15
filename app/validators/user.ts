import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const CreateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    username: vine.string().minLength(3),
    password: vine.string().minLength(7),
    name: vine.string().minLength(3),
    role: vine.enum(['admin', 'patient']),
    comorbidities: vine.array(vine.number()).optional(),
  })
)

CreateUserValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'O campo {{field}} é obrigatório',
  'email.required': 'O e-mail é obrigatório',
  'email.email': 'Formato de e-mail inválido',
  'password.required': 'A senha é obrigatória',
  'name.required': 'O nome é obrigatório',
  'role.enum': 'O tipo de usuário deve ser "admin" ou "patient"',
})

export const UpdateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    role: vine.enum(['admin', 'patient']).optional(),
    username: vine.string().minLength(3).optional(),
    password: vine.string().minLength(7).optional(),
    name: vine.string().minLength(3).optional(),
  })
)

// UpdateUserValidator.messagesProvider = new SimpleMessagesProvider({
//   'required': 'O campo {{filed}} é obrigatório',
//   'email.required': 'O e-mail é obrigatório',
//   'password.required': 'A senha é obrigatória',
//   'name.required': 'O nome é obrigatório',
// })
