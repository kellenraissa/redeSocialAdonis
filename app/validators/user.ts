import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const CreateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    // .normalizeEmail()
    // .unique(async (db, value) => {
    //   const match = await db.from('users').select('usr_id').where('email', value).first()
    //   return !match
    // }),
    username: vine.string().minLength(3),
    password: vine.string().minLength(7),
    name: vine.string().minLength(3),
  })
)

CreateUserValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'O campo {{filed}} é obrigatório',
  'email.required': 'O e-mail é obrigatório',
  'password.required': 'A senha é obrigatória',
  'name.required': 'O nome é obrigatório',
})

export const UpdateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    // .normalizeEmail()
    // .unique(async (db, value) => {
    //   const match = await db.from('users').select('usr_id').where('email', value).first()
    //   return !match
    // }),
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
