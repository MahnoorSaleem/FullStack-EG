import axios from 'axios';

const BASE_URL = process.env.API_ENDPOINT || 'http://localhost:3001/';

interface SignupData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

// update as per response from the api

interface UserData {
    id: number;
    username: string;
    email: string;
}

export async function signupUser(userData: SignupData): Promise<UserData> {
    try {
        const response = await axios.post<UserData>(`${BASE_URL}user/create`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to sign up. Please try again.');
    }
}

export async function loginUser(userData: LoginData): Promise<UserData> {
    try {
        const response = await axios.post<UserData>(`${BASE_URL}auth/login`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to log in. Please check your credentials.');
    }
}
