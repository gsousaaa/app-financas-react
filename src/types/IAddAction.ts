export interface IAddAction {
    movementType: string
    value: number
    description: string
}

export interface INewMovement {
    movementType: string
    value: number
    description: string
    userId: number
    createdAt: string
    id: number
  }
  