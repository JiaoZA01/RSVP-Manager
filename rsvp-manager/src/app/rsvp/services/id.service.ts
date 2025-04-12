import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdService {
  generate(): string {
    // use UUID v4 if available
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // otherwise use timestamp + random suffix (better than Math.random alone)
    return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
  }
}
