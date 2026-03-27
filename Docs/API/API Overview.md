# BeerBank API Overview

## Project Context

BeerBank is a PWA application that gamifies exercise by converting workout repetitions into beer credit. Users log exercise sessions and spend events; the app tracks their balance in real time, including offline.

**Backend:** Supabase (PostgreSQL + Auth + REST API)  
**Frontend:** React + Vite (PWA)  
**API style:** Supabase auto-generated REST over PostgreSQL  
**Full API specification:** `API Specification.yaml` (OpenAPI 3.0)

---

## Authentication

Every request requires two headers:

| Header | Value | Purpose |
|---|---|---|
| `apikey` | `<anon key>` | Identifies the Supabase project |
| `Authorization` | `Bearer <access_token>` | Authenticates the user session |

The `access_token` is issued by Supabase Auth after Google OAuth login (FR-AUT2.03) and must be included in all requests. Tables are protected with Row Level Security (RLS) — without a valid token, Supabase returns an empty result or an access error, not a 401.

The `anon key` is a public project identifier, not a secret. The `access_token` is user-specific and session-scoped.

---

## Base URL

```
https://<project-ref>.supabase.co/rest/v1
```

---

## Endpoints Summary

| Method | Path | Description | Requirement |
|---|---|---|---|
| GET | /users | Get current user data | FR-BAL1.01, FR-BAL4.01 |
| POST | /users | Create user on first login | FR-AUT1.01 |
| PATCH | /users | Update conversion rate or balance | FR-SET1-01, FR-BAL6.01 |
| POST | /exercise_events | Log an exercise session | FR-BAL2.01 |
| GET | /exercise_events | Get recent exercise sessions | FR-BAL1.01 |
| POST | /spend_events | Log a beer purchase | FR-BAL5.01 |
| GET | /spend_events | Get recent spend events | FR-BAL4.01 |

---

## Key Design Decisions

### 1. Supabase filter syntax in query parameters

Supabase REST uses operator prefixes in query parameter values rather than a custom query language:

```
GET /users?user_id=eq.{{user_id}}
GET /exercise_events?order=ex_time.desc&limit=5
```

This is not standard REST convention — it is specific to PostgREST (the engine behind Supabase). Filters always go in query parameters; data changes always go in the request body.

### 2. client_event_id for offline deduplication

The app supports offline usage (FR-BAL2.01, FR-BAL5.01). When the device is offline, events are stored locally and synced later. Without deduplication, a retry could insert the same event twice.

`client_event_id` is a UUID generated on the client before sending the request. The database enforces `UNIQUE` on this column, so a repeated sync attempt is rejected silently rather than creating a duplicate record.

### 3. Timestamps sent from the client

`ex_time` and `spend_time` are required fields sent by the client, not defaulted by the server. The reason: the server runs in UTC and has no knowledge of the user's timezone. Sending the timestamp from the client ensures the recorded time reflects the actual local moment of the action.

### 4. Separate event tables for exercises and spending

Exercises and spend events are stored in separate tables (`exercise_events`, `spend_events`) rather than a single events table with a type column. This keeps queries simple and schemas clean — the fields for each event type differ (`ex_amount` vs `spend_amount`, `ex_time` vs `spend_time`).

### 5. Cached totals in the users table

`ex_total` and `balance` are stored on the `users` row as cached aggregates. They are updated on each event rather than computed from the event tables on read. This is a deliberate denormalization to support fast reads on the main screen (NFR-01: max 500ms display delay) and simpler offline balance calculation.

### 6. PATCH covers two use cases

`PATCH /users` handles both conversion rate updates (FR-SET1-01) and manual balance correction (FR-BAL6.01). These are separate user-facing features but map to the same database operation — updating a column on the user row. A single flexible endpoint with an optional body is sufficient.

---

## Offline Behavior

The app displays optimistic values while offline:

- **ExTotal displayed** = ExTotal from server + local unsynced exercise count
- **MoneyBalance displayed** = MoneyBalance from server + (local unsynced exercises × local conversion rate)

The API itself is stateless — offline logic is handled entirely on the client. The API only needs to correctly reject duplicate events via `client_event_id`.

---

## Requirements Traceability

| Requirement | API coverage |
|---|---|
| FR-AUT1.01 — require auth to use app | All endpoints require Bearer token via RLS |
| FR-AUT2.03 — Google login | Handled by Supabase Auth, outside API scope |
| FR-BAL1.01 — display ExTotal | GET /users returns `ex_total` |
| FR-BAL2.01 — add exercises | POST /exercise_events |
| FR-BAL4.01 — display MoneyBalance | GET /users returns `balance` |
| FR-BAL5.01 — write off balance | POST /spend_events |
| FR-BAL6.01 — manual balance correction | PATCH /users with `balance` field |
| FR-SET1-01 — set conversion rate | PATCH /users with `conversion_rate` field |
| NFR-01 — 500ms display delay | Cached totals on user row; no aggregation query needed |
