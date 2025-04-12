import { RsvpService } from './rsvp.service';
import { StorageService } from './storage.service';
import { RsvpStatus } from '../models/rsvp.interface';
import { ConsoleLogger } from './console-logger';

describe('RsvpService', () => {
  let service: RsvpService;

  const mockStorage = {
    save: jest.fn(),
    load: jest.fn(),
    clear: jest.fn()
  };

  beforeEach(() => {
    service = new RsvpService(new ConsoleLogger(), mockStorage as any);
  });

  it('should add a new player', () => {
    const player = { id: '1', name: 'Alice', phone: '123' };
    service.add(player, RsvpStatus.Yes);

    service.getAllEntries().subscribe(entries => {
      expect(entries.length).toBe(1);
      expect(entries[0].player.name).toBe('Alice');
      expect(mockStorage.save).toHaveBeenCalled();
    });
  });

  it('should update status of existing player', () => {
    const player = { id: '1', name: 'Alice', phone: '123' };
    service.add(player, RsvpStatus.Maybe);
    service.update(player, RsvpStatus.No);

    service.getAllEntries().subscribe(entries => {
      expect(entries[0].status).toBe(RsvpStatus.No);
    });
  });

  it('should return confirmed attendees', () => {
    const p1 = { id: '1', name: 'A', phone: '123' };
    const p2 = { id: '2', name: 'B', phone: '456' };

    service.add(p1, RsvpStatus.Yes);
    service.add(p2, RsvpStatus.No);

    service.getConfirmedAttendees().subscribe(confirmed => {
      expect(confirmed.length).toBe(1);
      expect(confirmed[0].name).toBe('A');
    });
  });
});
