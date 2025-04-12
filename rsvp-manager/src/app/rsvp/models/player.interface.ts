/**
 * Player represents an individual participating in an event.
 * 
 * - `id`: Unique identifier for the player
 * - `name`: Display name
 * - `phone`: Required contact number
 * - `email`: Optional email address
 * - `meta`: Optional field for extensibility (e.g., team, role, etc.)
 * 
 * The generic `<T>` allows consumers to attach custom metadata
 * without modifying the base structure.
 */
export interface Player<T = {}> {
    id: string;
    name: string;
    phone: string;
    email?: string;
    meta?: T;
  }
  