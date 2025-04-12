import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RsvpEntry, RsvpCounts, RsvpStatus } from '../models/rsvp.interface';
import { Player } from '../models/player.interface';
import { Logger } from './logger.interface';
import { LOGGER_TOKEN } from './logger.token';
import { StorageService } from './storage.service';

// Key used for localStorage persistence
const STORAGE_KEY = 'rsvps';

@Injectable({ providedIn: 'root' })
export class RsvpService {
  // Reactive state for RSVP entries
  private readonly rsvps$ = new BehaviorSubject<RsvpEntry[]>([]);

  constructor(
    @Inject(LOGGER_TOKEN) private logger: Logger,      // Injected logging abstraction
    private storage: StorageService                    // Injected localStorage-based persistence
  ) {
    // Load persisted RSVP entries on startup
    const saved = this.storage.load<RsvpEntry[]>(STORAGE_KEY);
    if (saved) {
      this.rsvps$.next(saved);
      this.logger.log('Loaded saved RSVP entries from storage.');
    }
  }

  /**
   * Add a new RSVP entry only if the player doesn't already exist.
   * Prevents duplicates based on player ID.
   */
  add(player: Player, status: RsvpStatus): void {
    const exists = this.rsvps$.value.some(e => e.player.id === player.id);
    if (exists) {
      this.logger.log(`Add skipped: player ${player.name} already exists.`);
      return;
    }

    const newEntry = { player, status };
    const newEntries = [...this.rsvps$.value, newEntry];

    this.rsvps$.next(newEntries);
    this.storage.save(STORAGE_KEY, newEntries);
    this.logger.log(`RSVP added for ${player.name}: ${status}`);
  }

  /**
   * Update the RSVP status for an existing player.
   * If the player is not found, logs an error and aborts.
   */
  update(player: Player, status: RsvpStatus): void {
    const index = this.rsvps$.value.findIndex(e => e.player.id === player.id);
    if (index === -1) {
      this.logger.log(`Update failed: player ${player.name} not found.`);
      return;
    }

    const updated = {
      ...this.rsvps$.value[index],
      status
    };

    const newEntries = [
      ...this.rsvps$.value.slice(0, index),
      updated,
      ...this.rsvps$.value.slice(index + 1)
    ];

    this.rsvps$.next(newEntries);
    this.storage.save(STORAGE_KEY, newEntries);
    this.logger.log(`RSVP updated for ${player.name}: ${status}`);
  }

  /**
   * Convenience method to either add or update an RSVP based on player existence.
   */
  addOrUpdate(player: Player, status: RsvpStatus): void {
    const exists = this.rsvps$.value.some(e => e.player.id === player.id);
    exists ? this.update(player, status) : this.add(player, status);
  }

  /**
   * Returns all RSVP entries as an observable stream.
   */
  getAllEntries(): Observable<RsvpEntry[]> {
    return this.rsvps$.asObservable();
  }

  /**
   * Returns only players with a "Yes" RSVP status.
   */
  getConfirmedAttendees(): Observable<Player[]> {
    return this.rsvps$.pipe(
      map(entries => this.filterByStatus(entries, RsvpStatus.Yes))
    );
  }

  /**
   * Computes and returns counts for total, confirmed, and declined RSVPs.
   */
  getCounts(): Observable<RsvpCounts> {
    return this.rsvps$.pipe(
      map(entries => ({
        total: entries.length,
        confirmed: entries.filter(e => e.status === RsvpStatus.Yes).length,
        declined: entries.filter(e => e.status === RsvpStatus.No).length
      }))
    );
  }

  /**
   * Helper to extract players with a specific RSVP status.
   */
  private filterByStatus(entries: RsvpEntry[], status: RsvpStatus): Player[] {
    return entries
      .filter(e => e.status === status)
      .map(e => e.player);
  }

  /**
   * Clears all RSVP entries from state and persistent storage.
   */
  clearAll(): void {
    this.storage.clear(STORAGE_KEY);
    this.rsvps$.next([]);
    this.logger.log('Cleared all RSVP entries.');
  }
}
