# 🎉 RSVP Manager

A simple and extensible RSVP management module built with **Angular**, designed to showcase clean architecture, reusable services, and modular UI components.

## 📦 Features

- ✅ Add or update RSVP status for a player
- ✅ View confirmed attendees
- ✅ Real-time RSVP counts (Total, Confirmed, Declined)
- ✅ Modular architecture with dependency injection
- ✅ Data persistence via `localStorage`
- ✅ Pure functions and reusable interfaces
- ✅ Unit tested using Jest

---

## 🧠 Tech Stack

- **Angular 15+** (Standalone Components)
- **RxJS** for state reactivity
- **Jest** for testing
- **TypeScript** for type safety
- **localStorage** for persistence
- **Dependency Injection** for Logger, Storage, ID services

---

## 🧩 Project Structure

```text
rsvp-manager/
└── src/
    └── app/
        ├── components/
        │   ├── rsvp/
        │   │   └── rsvp.component.ts         # Handles player input and status updates using RsvpService
        │   └── rsvp-list/
        │       └── rsvp-list.component.ts    # Displays RSVP entries and emits status change events
        ├── models/
        │   ├── player.interface.ts           # Defines Player interface with optional metadata
        │   ├── rsvp.interface.ts             # Defines RsvpEntry and RsvpCounts interfaces
        │   └── rsvp-status.enum.ts           # Enum representing RSVP status: Yes, No, Maybe
        └── services/
            ├── rsvp.service.ts               # Core logic for adding, updating, and querying RSVP entries
            ├── id.service.ts                 # Provides unique ID generation for new players
            ├── storage.service.ts            # Wraps localStorage access for persistence
            ├── logger.interface.ts           # Logger interface for pluggable logging
            ├── logger.token.ts               # Angular DI token for injecting a logger
            └── console-logger.ts             # Simple logger that prints messages to the browser console

setup-jest.ts                                  # Jest environment setup file for unit testing
README.md                                      # Project overview and usage instructions
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run test

```bash
npm test