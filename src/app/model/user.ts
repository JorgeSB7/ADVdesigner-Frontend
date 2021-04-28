import { character } from "./character";

export interface user {
    id?:number,
    name:string,
    email:string,
    password:string,
    avatar?:string,
    characters?:character[]
}