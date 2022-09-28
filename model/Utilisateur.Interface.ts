import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    email: string
    pseudo: string
    image: string
    pv: number
    force_rbt: number
    defense: number
    esquive: number
    niveau: number
    experience: number
    argent: number
    id_arme: number
    id_bouclier: number
    id_tenue: number
}