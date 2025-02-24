export interface User {
    _id: string;
    email: string;
    nombre: string;
    password: string;
    preciosEspeciales: [];
    role: 'admin' | 'user';
    __v: number;
}