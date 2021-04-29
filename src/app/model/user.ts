import { beast } from "./beast";
import { character } from "./character";
import { magic } from "./magic";

export interface user {
    id?:number,
    name:string,
    email:string,
    password:string,
    avatar?:string,
    characters?:character[],
    beats?:beast[],
    magics?:magic[]
}