import { character } from "./character";

export interface campaign {
    cdcam?:string,
    namecampaign:string,
    picture?:string,
    description:string,
    characters?:character[],
    contras?:number
}