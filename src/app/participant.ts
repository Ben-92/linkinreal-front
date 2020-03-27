export interface Iparticipant {
  id: number;
  nickName: string;
  eventId: number;
}

export class Participant implements Iparticipant {
  id: number;
  nickName: string;
  eventId: number;
}
