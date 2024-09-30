import { IAddAction, INewMovement } from "@/types/IAddAction";
import { IEditAction } from "@/types/IEditAction";
import { IGetFinances } from "@/types/IGetFinances";
import { Movements } from "@/types/IGetMovements";
import { ILogin, ILoginSuccessfuly } from "@/types/ILogin";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3003'
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const loginUser = async (data: ILogin): Promise<ILoginSuccessfuly> => {
    try {
        const response = await api.post('/auth/login', {
            email: data.email,
            password: data.password
        })

        return response.data

    } catch (err) {
        throw err
    }
}

export const getFinances = async (): Promise<IGetFinances> => {
    try {
        const response = await api.get('/api/balance')

        return response.data
    } catch (err) {
        throw err
    }
}

export const getMovements = async (): Promise<Movements> => {
    try {
        const response = await api.get('/api/movements', {

        })

        return response.data

    } catch (err) {
        throw err
    }
}

export const editMovement = async (data: IEditAction) => {
    try {
        const response = await api.put('/api/movement', data)

        return response.data
    } catch (err) {
        throw err
    }
}


export const deleteMovement = async (id: number) => {
    try {
        const response = await api.delete(`/api/movement/${id}`)

        return response.data
    } catch (err) {
        throw err
    }
}

export const createMovement = async (data: IAddAction): Promise<INewMovement> => {
    try {
        const response = await api.post('/api/movement', data)

        return response.data
    } catch (err) {
        throw err
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const response = await api.post('/forgot-password', { email })

        return response.data
    } catch (err) {
        throw err
    }
}

export const resetPassword = async (password: string) => {
    try {
        const response = await api.post('/reset-password', { password })

        return response.data
    } catch (err) {
        throw err
    }
}



