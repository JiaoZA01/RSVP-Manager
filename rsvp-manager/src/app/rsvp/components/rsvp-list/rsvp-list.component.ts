import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RsvpEntry, RsvpStatus } from '../../models/rsvp.interface';
import { Player } from '../../models/player.interface';

@Component({
  selector: 'app-rsvp-list',
  standalone: true,
  imports: [CommonModule],
  //templateUrl: './rsvp-list.component.html',
  //styleUrls: ['./rsvp-list.component.scss']
})
export class RsvpListComponent {
  /**
   * List of RSVP entries (player + status) to render.
   * Passed in from parent component (RsvpComponent).
   */
  @Input() entries: RsvpEntry[] | null = [];

  /**
   * Available status options (Yes, Maybe, No), used to render buttons.
   */
  @Input() statuses: RsvpStatus[] = [];

  /**
   * Emits an event when a player’s status is changed via the UI.
   * The parent component listens to this and delegates the update to the service.
   */
  @Output() onStatusChange = new EventEmitter<{ player: Player; status: RsvpStatus }>();

  /**
   * Called when a status button is clicked.
   * Emits the player and new status to the parent component.
   */
  changeStatus(player: Player, status: RsvpStatus): void {
    this.onStatusChange.emit({ player, status });
  }
}
