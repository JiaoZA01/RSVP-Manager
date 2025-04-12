import { Player } from './player.interface';

/**
 * Enum representing possible RSVP responses.
 * Used to strongly type and constrain RSVP values.
 */
export enum RsvpStatus {
  Yes = 'Yes',
  Maybe = 'Maybe',
  No = 'No'
}

/**
 * Represents a single RSVP entry.
 * Contains a player and their associated RSVP status.
 * Generic support (`<T>`) allows extending Player with additional metadata if needed.
 */
export interface RsvpEntry<T = {}> {
  player: Player<T>;
  status: RsvpStatus;
}

/**
 * Represents summary statistics for RSVP responses.
 * Used to display high-level counts (total, confirmed, declined).
 */
export interface RsvpCounts {
  total: number;
  confirmed: number;
  declined: number;
}
