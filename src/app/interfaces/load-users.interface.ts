import { Usuario } from "../models/usuario.model";

export interface LoadUsersInterface {
    count: number;
    users: Usuario[];
}