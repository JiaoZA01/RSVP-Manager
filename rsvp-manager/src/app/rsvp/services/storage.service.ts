import { Injectable } from '@angular/core';

/**
 * StorageService provides a wrapper around localStorage for
 * saving, loading, and clearing typed JSON data using string keys.
 * 
 * It's a generic, reusable service that supports dependency injection
 * and simplifies persistence in Angular applications.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  /**
   * Save a typed value to localStorage under the specified key.
   */
  save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Load a typed value from localStorage using the specified key.
   * Returns null if the key is not found.
   */
  load<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  /**
   * Remove an entry from localStorage by its key.
   */
  clear(key: string): void {
    localStorage.removeItem(key);
  }
}
