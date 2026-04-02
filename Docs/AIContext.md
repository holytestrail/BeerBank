# BeerBank (BB) app — контекст для AI

## Что мы делаем
- Мы создаем приложение как мой пет-проект. Я в роли продакт-оунера и аналитика. Ты - разработчик. 
- Я не профессионал и могу ошибаться. Если ты видишь мою ошибку или можешь предложить более эффективное решение, обязательно говори об этом.
- Если тебе нужна дополнительная информация, обязательно задавай мне вопросы, прежде чем начать действовать.
- Общаемся на "ты", можешь шутить (только чтобы это не отвлекало от дела).
- Обсуждаем все на русском. Требования и документацию пишем на английском.
- Вид упражнения не играет роли: юзер может делать отжимания, приседания, что угодно другое - и вводит общее количество.

## Суть приложения (Vision)
Our app is for people who love beer but lack the motivation for regular workouts. Through gamification with our app, they exchange exercises for the right to drink a certain amount of beer.

**Usage Scenario**:
**Step 1**: As a user, When I have a free minute, I do a few push-ups, squats, or other simple exercises. I add the number of repetitions to my BeerBank App, which converts them into Beer Credit (MoneyBalance in the app) according to the conversion rate I chose earlier. For example, 1 push-up = 2 Serbian dinars.
**Step 2**: As a user, When I want to buy a beer, I check my Beer Credit. If I have enough dinars, I can buy a beer and decrease my Beer Credit accordingly. If I don’t have enough credit, I’m honest with myself and skip the beer. Next time, I make sure I do enough exercise in advance before going to a bar.


## Стек
- Делаем PWA-приложение
- Frontend: React + Vite + shadcn/ui + Tailwind + Zustand + Dexie.js + Supabase JS Client + vite-plugin-pwa
- Backend: Supabase (PostgreSQL + Auth + REST)
- Deploy: Vercel


## Структура папок
C:\beerbankApp\BeerbankRepo\
├── Docs/
├── app/          ← Vite + React код
└── .git/


## Пошаговый план работы над приложением

1. ✅ Требования, БД, Vision, API
2. ✅ Окружение, Supabase
3. ✅ Прототип UI
4. ✅ **Финальный UI в React** - СДЕЛАНО. _Результат: приложение открывается в браузере, все экраны отображаются с финальным дизайном, навигация между ними работает. Данные хардкодные — баланс всегда 0, rate всегда 1._
5. ✅ **Локальная логика** (Zustand + Dexie)  - СДЕЛАНО.  _Результат: все кнопки работают, баланс считается, валидация работает, тосты появляются. Данные сохраняются между перезагрузками страницы. Без логина, без сервера._
6. ПРОПУСКАЕМ ЭТОТ ЭТАП В MVP: ХРАНИМ ДАННЫЕ ТОЛЬКО НА УСТРОЙСТВЕ. **Экран авторизации** (дизайн + Google OAuth) _Результат: при открытии приложения показывается экран логина. Google OAuth работает. После логина открывается главный экран. Logout работает._
7. **Деплой на Vercel** _Результат: приложение доступно по публичной ссылке. Можно открыть на телефоне и добавить на главный экран._
8. ПРОПУСКАЕМ ЭТОТ ЭТАП В MVP **Онлайн-режим** (синхронизация с Supabase) _Результат: данные тянутся с сервера при открытии. После каждого действия данные сохраняются в Supabase. Одни и те же данные видны на телефоне и компьютере под одним аккаунтом._
9. ПРОПУСКАЕМ ЭТОТ ЭТАП В MVP **Офлайн-режим** (Dexie + PWA) _Результат: приложение работает без интернета. Действия сохраняются локально. При восстановлении связи данные синхронизируются с сервером без дублей._
10. **Лендинг** _Результат: по корневому URL открывается страница с описанием приложения и кнопкой входа. Приложение доступно по отдельному пути._



## API methods yaml file

```
openapi: 3.0.0

info:

  title: BeerBank API

  version: 1.0.0

  description: 'API for BeerBank app.  '

servers:

  - url: 'https://auzaezwlkxrksusuffcq.supabase.co/rest/v1'

components:

  securitySchemes:

    ApiKeyAuth:

      type: apiKey

      in: header

      name: apikey

    BearerAuth:

      type: http

      scheme: bearer

  schemas:

    User:

      type: object

      properties:

        user_id:

          type: string

          format: uuid

        nickname:

          type: string

          maxLength: 15

        ex_total:

          type: integer

          default: 0

        balance:

          type: integer

          default: 0

        conversion_rate:

          type: integer

          minimum: 1

          default: 1

    UserPost:

      type: object

      required:

        - user_id

      properties:

        user_id:

          type: string

          format: uuid

        nickname:

          type: string

          maxLength: 15

    UserPatch:

      type: object

      properties:

        conversion_rate:

          type: integer

          minimum: 1

        balance:

          type: integer

    ExerciseEvent:

      type: object

      required:

        - user_id

        - ex_amount

        - ex_time

        - client_event_id

      properties:

        user_id:

          type: string

          format: uuid

        ex_amount:

          type: integer

          minimum: 1

        ex_time:

          type: string

          format: date-time

        client_event_id:

          type: string

          format: uuid

    ExerciseEventStats:

      type: object

      properties:

        user_id:

          type: string

          format: uuid

        ex_time:

          type: string

          format: date-time

        ex_amount:

          type: integer

          minimum: 1

    SpendEvent:

      type: object

      required:

        - user_id

        - spend_amount

        - spend_time

        - client_event_id

      properties:

        user_id:

          type: string

          format: uuid

        spend_amount:

          type: integer

          minimum: 1

        spend_time:

          type: string

          format: date-time

        client_event_id:

          type: string

          format: uuid

    SpendEventStats:

      type: object

      properties:

        user_id:

          type: string

          format: uuid

        spend_time:

          type: string

          format: date-time

        spend_amount:

          type: integer

          minimum: 1

security:

  - ApiKeyAuth: []

  - BearerAuth: []

paths:

  /users:

    get:

      summary: Get current user data

      description: ''

      responses:

        '200':

          description: User data

          content:

            application/json:

              schema:

                type: array

                items:

                  $ref: '#/components/schemas/User'

    post:

      summary: Create user

      description: Creates a new user after first login

      requestBody:

        required: true

        content:

          application/json:

            schema:

              $ref: '#/components/schemas/UserPost'

            example:

              user_id: '{{user_id}}'

              nickname: hophead

      responses:

        '201':

          description: User created

    patch:

      summary: Update user

      description: 'Updates conversion_rate or balance, filtered by user_id'

      parameters:

        - name: user_id

          in: query

          required: true

          description: Supabase eq filter

          schema:

            type: string

          example: 'eq.{{user_id}}'

      requestBody:

        required: true

        content:

          application/json:

            schema:

              $ref: '#/components/schemas/UserPatch'

            example:

              conversion_rate: 2

      responses:

        '200':

          description: User updated

  /exercise_events:

    post:

      summary: Add exercise event

      description: Logs a new exercise session

      requestBody:

        required: true

        content:

          application/json:

            schema:

              $ref: '#/components/schemas/ExerciseEvent'

            example:

              user_id: '{{user_id}}'

              ex_amount: 10

              ex_time: '2026-03-27T12:00:00Z'

              client_event_id: '{{client_event_id}}'

      responses:

        '201':

          description: Exercise event added

    get:

      summary: Get exercise events

      operationId: ''

      description: Returns exercise sessions for statistics

      parameters:

        - name: user_id

          in: query

          required: true

          schema:

            type: string

          example: 'eq.{{user_id}}'

        - name: order

          in: query

          schema:

            type: string

          example: ex_time.desc

        - name: limit

          in: query

          schema:

            type: integer

          example: 5

        - name: select

          in: query

          schema:

            type: string

          example: 'user_id,ex_time,ex_amount'

      responses:

        '200':

          description: OK

          content:

            application/json:

              schema:

                type: array

                items:

                  $ref: '#/components/schemas/ExerciseEventStats'

  /spend_events:

    post:

      summary: Add spend event

      description: Logs balance spending event

      requestBody:

        required: true

        content:

          application/json:

            schema:

              $ref: '#/components/schemas/SpendEvent'

            example:

              user_id: '{{user_id}}'

              spend_amount: 50

              spend_time: '2026-03-27T12:00:00Z'

              client_event_id: '{{client_event_id}}'

      responses:

        '201':

          description: Spend event added

    get:

      summary: Get spend events

      description: Returns spendings for statistics

      parameters:

        - name: user_id

          in: query

          required: true

          schema:

            type: string

          example: 'eq.{{user_id}}'

        - name: order

          in: query

          schema:

            type: string

          example: spend_time.desc

        - name: limit

          in: query

          schema:

            type: integer

          example: 5

        - name: select

          in: query

          schema:

            type: string

          example: 'user_id,spend_time,spend_amount'

      responses:

        '200':

          description: OK

          content:

            application/json:

              schema:

                type: array

                items:

                  $ref: '#/components/schemas/SpendEventStats'
```



## Supabase DB schema

### Tables:
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








end
