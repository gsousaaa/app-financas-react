import z from 'zod'

export const addMovementSchema = z.object({
    value: z
        .string({ required_error: 'O valor deve ser informado' })
        .transform((val) => Number(val)) // Converte o valor para número
        .refine((val) => !isNaN(val) && val > 0, {
            message: 'O valor deve ser maior que 0',
        }),
    description: z.string({ required_error: 'A descrição deve ser informada' }).min(1, 'A descrição deve ser informada')
})
