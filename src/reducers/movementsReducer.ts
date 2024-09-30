import { IEditAction } from "@/types/IEditAction"
import { Movement, Movements } from "@/types/IGetMovements"
import { act } from "react"

type AddAction = {
    type: 'add',
    payload: Movement
}

type EditAction = {
    type: 'edit',
    payload: IEditAction
}

type RemoveAction = {
    type: 'remove',
    payload: {
        id: number
    }
}

export type ListActions = AddAction | EditAction | RemoveAction

export const movementsReducer = (movements: Movements, action: ListActions) => {
    switch (action.type) {
        case "add":
            
            return [...movements, {
                id: action.payload.id,
                movementType: action.payload.movementType,
                value: action.payload.value,
                description: action.payload.description,
                createdAt: action.payload.createdAt,
                userId: action.payload.userId
            }]
        case "edit":
            return movements.map(m => {
                if (m.id === action.payload.id) {
                    const updatedMovement = {
                        description: action.payload.description ? action.payload.description : m.description,
                        movementType: action.payload.movementType ? action.payload.movementType : m.movementType,
                        value: action.payload.value ? action.payload.value : m.value
                    }

                    m.description = updatedMovement.description
                    m.movementType = updatedMovement.movementType
                    m.value = updatedMovement.value

                    return m
                }

                return m
            })
        case "remove":
            return movements.filter(m => m.id !== action.payload.id)

        default:
            return movements
    }

}