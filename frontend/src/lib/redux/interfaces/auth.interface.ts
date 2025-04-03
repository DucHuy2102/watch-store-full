export interface IUser {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
}

export interface IAuthState {
    user: IUser | null;
}
