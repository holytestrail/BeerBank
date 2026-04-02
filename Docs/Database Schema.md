## Tables:
- **User**: Stores core user data and cached totals.
- **ExerciseEvent**: Stores each exercise logging event for statistics and balance calculation.
- **SpendEvent**: Stores each spend event for statistics and balance calculation.

### users

| Column          | Type        | Constraints                     | Description                                                        |
| --------------- | ----------- | ------------------------------- | ------------------------------------------------------------------ |
| user_id         | UUID        | PK, default gen_random_uuid()   | Unique user ID                                                     |
| nickname        | VARCHAR(15) | NOT NULL                        | Display name for future activities, like leaderboards (not in MVP) |
| ex_total        | INTEGER     | NOT NULL, default 0             | Cached total of all exercises logged                               |
| balance         | INTEGER     | NOT NULL, default 0             | Current beer credit balance                                        |
| conversion_rate | SMALLINT    | NOT NULL, default 1, CHECK >= 1 | Exercise-to-money conversion rate                                  |

### exercise_events

| Column          | Type        | Constraints                         | Description                                   |
| --------------- | ----------- | ----------------------------------- | --------------------------------------------- |
| ex_event_id     | UUID        | PK, default gen_random_uuid()       | Unique event ID                               |
| user_id         | UUID        | FK → User.UserId, ON DELETE CASCADE | User ID                                       |
| ex_time         | TIMESTAMPTZ | NOT NULL, default now()             | Timestamp of the session                      |
| ex_amount       | SMALLINT    | NOT NULL, CHECK >= 1                | Number of exercises                           |
| client_event_id | UUID        | NOT NULL, UNIQUE                    | Client-generated ID for offline deduplication |

### spend_events

| Column          | Type        | Constraints                         | Description                                   |
| --------------- | ----------- | ----------------------------------- | --------------------------------------------- |
| spend_event_id  | UUID        | PK, default gen_random_uuid()       | Unique event ID                               |
| user_id         | UUID        | FK → User.UserId, ON DELETE CASCADE | User ID                                       |
| spend_time      | TIMESTAMPTZ | NOT NULL, default now()             | Timestamp of the spend                        |
| spend_amount    | SMALLINT    | NOT NULL, CHECK >= 1                | Amount of money spent                         |
| client_event_id | UUID        | NOT NULL, UNIQUE                    | Client-generated ID for offline deduplication |
