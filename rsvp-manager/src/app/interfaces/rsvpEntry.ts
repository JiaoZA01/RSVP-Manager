import { Player } from './player';

export type RsvpStatus = 'Yes' | 'No' | 'Maybe';

export interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
}