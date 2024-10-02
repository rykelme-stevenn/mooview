interface IUser {
    id: number;
    username: string
    email: string
    password: string
    is_active: string
    is_staff: string
    created_at: string
    updated_at: string
}

type RegisterType = {
    username: string;
    email: string;
    password1: string;
    password2: string;
}


type LoginType = {
    email: string;
    password: string;
}

export { IUser, RegisterType, LoginType }