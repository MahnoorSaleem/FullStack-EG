export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface LoginResponse {
    token: string;
    user: UserData;
}


export interface SignupData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface UserData {
    username: string;
    email: string;
}