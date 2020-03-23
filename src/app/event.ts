import { Creator } from "./creator";

export interface Event {

    date : Date;
    description : String;
    participantNb : number;
    creator : Creator;

}
