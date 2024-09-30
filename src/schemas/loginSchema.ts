import z from 'zod'

export const loginSchema = z.object({
    email: z.string({required_error: 'O e-mail deve ser enviado'}).email('Formato de e-mail inválido'),
    password: z.string({required_error: 'A senha deve ser enviada'}).min(1, 'A senha deve ser enviada')
})
