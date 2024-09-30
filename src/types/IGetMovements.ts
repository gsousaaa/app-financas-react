export type Movements = Movement[]

export interface Movement {
    id: number
    movementType: string
    value?: number
    description: string
    createdAt: string
    userId: number
}
