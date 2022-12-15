export type User = {
    createdAt?: string;
    email: string;
    first_name: string;
    id?: number;
    last_name: string;
    password: string;
    refresh_token?: string;
    updatedAt?: string;
};

export type UserState = { 
    data: User;
    isRegestered: boolean;
    isLoggedIn: boolean 
};