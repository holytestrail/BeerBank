## Tables:
- **User**: Stores core user data and cached totals.
- **ExerciseEvent**: Stores each exercise logging event for statistics and balance calculation.
- **SpendEvent**: Stores each spend event for statistics and balance calculation.

### User

| Column         | Type        | Constraints                     | Description                                                        |
| -------------- | ----------- | ------------------------------- | ------------------------------------------------------------------ |
| UserId         | UUID        | PK, default gen_random_uuid()   | Unique user ID                                                     |
| Nickname       | VARCHAR(15) | NOT NULL                        | Display name for future activities, like leaderboards (not in MVP) |
| ExTotal        | INTEGER     | NOT NULL, default 0             | Cached total of all exercises logged                               |
| MoneyBalance   | INTEGER     | NOT NULL, default 0             | Current beer credit balance                                        |
| ConversionRate | SMALLINT    | NOT NULL, default 1, CHECK >= 1 | Exercise-to-money conversion rate                                  |

### ExerciseEvent

| Column        | Type        | Constraints                         | Description                                   |
| ------------- | ----------- | ----------------------------------- | --------------------------------------------- |
| ExEventId     | UUID        | PK, default gen_random_uuid()       | Unique event ID                               |
| UserId        | UUID        | FK → User.UserId, ON DELETE CASCADE | User ID                                       |
| ExTime        | TIMESTAMPTZ | NOT NULL, default now()             | Timestamp of the session                      |
| ExAmount      | SMALLINT    | NOT NULL, CHECK >= 1                | Number of exercises                           |
| ClientEventId | UUID        | NOT NULL, UNIQUE                    | Client-generated ID for offline deduplication |

### SpendEvent

| Column        | Type        | Constraints                         | Description                                   |
| ------------- | ----------- | ----------------------------------- | --------------------------------------------- |
| SpendEventId  | UUID        | PK, default gen_random_uuid()       | Unique event ID                               |
| UserId        | UUID        | FK → User.UserId, ON DELETE CASCADE | User ID                                       |
| SpendTime     | TIMESTAMPTZ | NOT NULL, default now()             | Timestamp of the spend                        |
| SpendAmount   | SMALLINT    | NOT NULL, CHECK >= 1                | Amount of money spent                         |
| ClientEventId | UUID        | NOT NULL, UNIQUE                    | Client-generated ID for offline deduplication |