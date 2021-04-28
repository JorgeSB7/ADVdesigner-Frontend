import { user } from './user';
import {campaign} from './campaign';

export interface character {
    code?:string,
    namecharacter:string,
    race:string,
    rolclass:string,
    image:string,
    strength:number,
    dexterity:number,
    constitution:number,
    intelligence:number,
    wisdom:number,
    charisma:number,
    creator?:user,
    campaigns?:campaign[]
}