import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { RsvpStatus, RsvpEntry, RsvpCounts } from '../../models/rsvp.interface';
import { Player } from '../../models/player.interface';
import { RsvpService } from '../../services/rsvp.service';
import { IdService } from '../../services/id.service';
import { RsvpListComponent } from '../rsvp-list/rsvp-list.component';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, FormsModule, RsvpListComponent],
  //templateUrl: './rsvp.component.html',
  //styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {
  // -------------------- Form State --------------------

  /** Name input for the new player */
  newPlayerName = '';

  /** Phone number input for the new player */
  newPhoneNumber = '';

  /** Selected RSVP status for the new player */
  newPlayerStatus: RsvpStatus = RsvpStatus.Yes;

  // -------------------- Observable Streams --------------------

  /** Observable of RSVP counts (total, confirmed, declined) */
  counts$: Observable<RsvpCounts>;

  /** Observable of all RSVP entries (player + their status) */
  allEntries$: Observable<RsvpEntry[]>;

  // -------------------- Constants --------------------

  /** Array of available RSVP status options, derived from the enum */
  statusOptions = Object.values(RsvpStatus);

  // -------------------- Constructor --------------------

  constructor(
    private rsvpService: RsvpService, // Manages RSVP state and persistence
    private idService: IdService      // Provides unique player IDs
  ) {
    // Subscribe to reactive RSVP data
    this.counts$ = this.rsvpService.getCounts();
    this.allEntries$ = this.rsvpService.getAllEntries();
  }

  // -------------------- Methods --------------------

  /**
   * Called when user clicks "Add Player".
   * Validates input, generates a new ID, and delegates to the service.
   */
  addNewPlayer(): void {
    const name = this.newPlayerName.trim();
    const phone = this.newPhoneNumber.trim();
    if (!name || !phone) return;

    const player: Player = {
      id: this.idService.generate(),
      name,
      phone
    };

    this.rsvpService.add(player, this.newPlayerStatus);

    // Reset input fields
    this.newPlayerName = '';
    this.newPhoneNumber = '';
  }

  /**
   * Handles status change event from the list component.
   * Delegates update logic to the service.
   */
  updateStatus(player: Player, status: RsvpStatus): void {
    this.rsvpService.update(player, status);
  }
}
