import z from 'zod'

export const resetPasswordSchema = z.object({
    password: z.string({ required_error: 'A senha deve ser enviada!' }).min(1, 'A senha deve ser enviada!'),
})