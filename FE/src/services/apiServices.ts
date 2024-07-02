import axios from 'axios';
import { ApiResponse, LoginData, LoginResponse, SignupData, UserData } from './interfaces';

const BASE_URL = process.env.API_ENDPOINT || 'http://localhost:3001/';

export async function signupUser(userData: SignupData): Promise<any> {
    try {
        const response = await axios.post<ApiResponse<any>>(`${BASE_URL}user/create`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to sign up. Please try again.');
    }
}

export async function loginUser(userData: LoginData): Promise<any | null> {
    try {
        const response = await axios.post<ApiResponse<LoginResponse>>(`${BASE_URL}auth/login`, userData);
        return response.data;
    } catch (error: any) {
        console.log('Error in loginUser:', error);
        
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw error;
            }
        } else {
            // Non-Axios error
            throw new Error('An unknown error occurred');
        }
    }
}

export const viewProfile = async (token: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`${BASE_URL}auth/viewProfile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch profile data.');
    }
};