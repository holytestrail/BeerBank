# BeerBank (BB) app — контекст для AI

## Что мы делаем
- Мы создаем приложение как мой пет-проект. Я в роли продакт-оунера и аналитика. Ты - разработчик. 
- Общаемся на "ты", можешь шутить (только чтобы это не отвлекало от дела).
- Обсуждаем все на русском. Требования и документацию пишем на английском (кроме раздела UI messages в требованиях).
- Вид упражнения не играет роли: юзер может делать отжимания, приседания, что угодно другое - и вводит общее количество.

## Суть приложения (Vision)
Our app is for people who love beer but lack the motivation for regular workouts. Through gamification with our app, they exchange exercises for the right to drink a certain amount of beer.

**Usage Scenario**:
**Step 1**: As a user, When I have a free minute, I do a few push-ups, squats, or other simple exercises. I add the number of repetitions to my BeerBank App, which converts them into Beer Credit (MoneyBalance in the app) according to the conversion rate I chose earlier. For example, 1 push-up = 2 Serbian dinars.
**Step 2**: As a user, When I want to buy a beer, I check my Beer Credit. If I have enough dinars, I can buy a beer and decrease my Beer Credit accordingly. If I don’t have enough credit, I’m honest with myself and skip the beer. Next time, I make sure I do enough exercise in advance before going to a bar.

## Ссылки на документацию
- Требования: https://raw.githubusercontent.com/holytestrail/BeerBank/22dadb1261b75c9c5811b86c8f3c800795ef7a90/Docs/Requirements%20for%20BBapp.md
  
- Структура базы данных: https://raw.githubusercontent.com/holytestrail/BeerBank/22dadb1261b75c9c5811b86c8f3c800795ef7a90/Docs/Database%20Schema.md
  
- API methods file
  https://raw.githubusercontent.com/holytestrail/BeerBank/22dadb1261b75c9c5811b86c8f3c800795ef7a90/Docs/API/private-b1c-BeerBank-1.0.0-resolved.yaml

- UI prototype file
  https://raw.githubusercontent.com/holytestrail/BeerBank/22dadb1261b75c9c5811b86c8f3c800795ef7a90/beerbank-prototype-v2.html
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


## Текущий статус
- [x] DONE Составить требования, vision 
- [x] Составить структуру БД
- [x] Создать БД в Supabase
- [x] Согласовать стек фронтенда
- [x] ПОдготовка Фронтенда: `Vite + React + Tailwind + shadcn/ui + Zustand + Dexie.js + Supabase client + vite-plugin-pwa — всё установлено и работает`
- [x] Подготовка Бэкенда - Supabase (PostgreSQL + Auth + REST)
- [x] Подключение к фронтенду (API-методы я хочу написать сам)
- [ ] 



# BeerBank — Frontend Development Checklist
 
## Stage 1 — Project Skeleton
 
|                   |                                                                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack**         | React, Vite, vite-plugin-pwa                                                                                                                                                            |
| **Where to test** | Locally in browser (`localhost:5173`). Run `npm run dev` in terminal — AI will provide exact command.                                                                                   |
| **What AI does**  | Creates the project, sets up all screens (empty), configures navigation between them, configures PWA manifest (app name, icon, colors)                                                  |
| **What you do**   | Provide app icon image (or approve a placeholder)                                                                                                                                       |
| **What you get**  | A working app that opens in the browser, has all screens navigable by tapping, and can be added to the phone home screen                                                                |
| **How to check**  | 1. Open the link in Chrome on your phone. 2. Tap "Add to Home Screen." 3. Launch from the home screen — it opens without the browser bar. 4. Tap through all screens — nothing crashes. |
 
---
 
## Stage 2 — UI Layout (no logic)
 
|                   |                                                                                                                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack**         | shadcn/ui, Tailwind CSS                                                                                                                                                                                                                                    |
| **Where to test** | Locally in browser (`localhost:5173`). To check on phone: connect phone and computer to the same WiFi — AI will provide the local network address.                                                                                                         |
| **What AI does**  | Builds all screens visually: main screen with balance and exercise count, add exercises screen, spend screen, balance correction screen, settings screen. Data is hardcoded (balance always shows "100", rate always "2").                                 |
| **What you do**   | Review the visual result and give feedback on look and feel                                                                                                                                                                                                |
| **What you get**  | A fully designed app — all screens look as intended, buttons and inputs are in place, comfortable on mobile                                                                                                                                                |
| **How to check**  | 1. Does the main screen show balance and exercise total clearly? 2. Are buttons large enough to tap comfortably on a phone? 3. Does nothing look broken or out of place on a small screen? 4. Does the overall style match the fun/casual tone of the app? |
 
---
 
## Stage 3 — Local Logic (no server)
 
|                   |                                                                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack**         | Zustand, Dexie.js                                                                                                                                                                              |
| **Where to test** | Locally in browser (`localhost:5173`). To check on phone: same WiFi network as computer.                                                                                                       |
| **What AI does**  | Wires up all the logic: buttons work, balance updates instantly, conversion rate applies correctly, validation messages appear for wrong input. Everything runs locally — no server, no login. |
| **What you do**   | Run through all scenarios from the requirements manually                                                                                                                                       |
| **What you get**  | A fully functional app — all features work, just without saving data to the server or requiring login                                                                                          |
| **How to check**  | Run each scenario below and confirm the result:                                                                                                                                                |
 
---
 
## Stage 4 — Authentication
 
| | |
|---|---|
| **Stack** | Supabase JS Client |
| **Where to test** | Deployed on Vercel — Google OAuth does not work on localhost. AI will handle the deploy; you get a public link like `beerbank.vercel.app`. Takes about a minute, free. |
| **What AI does** | Adds Google login screen, logout button, session persistence (stay logged in after closing the app) |
| **What you do** | Provide Supabase project URL and API key (from Supabase dashboard) |
| **What you get** | The app requires login to use. Google OAuth works. Session is remembered between launches. |
| **How to check** | 1. Open app — login screen appears. 2. Tap "Login with Google" — Google auth screen opens. 3. Complete login — main screen appears. 4. Close the app fully and reopen — still logged in (no re-authentication required). 5. Tap "Log out" — returned to login screen. |
 
---
 
## Stage 5 — Server Sync
 
|                   |                                                                                                                                                                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack**         | Supabase JS Client                                                                                                                                                                                                                                             |
| **Where to test** | Deployed on Vercel (same link as Stage 4).                                                                                                                                                                                                                     |
| **What AI does**  | Connects the app to Supabase database: on open, pulls actual data from server; after each action, saves data to server                                                                                                                                         |
| **What you do**   | Nothing — just test                                                                                                                                                                                                                                            |
| **What you get**  | Data is stored in the cloud. The same data appears on any device where you log in.                                                                                                                                                                             |
| **How to check**  | 1. Add exercises on your phone. 2. Open the app on a computer (or another browser) and log in with the same Google account. 3. The same ExTotal and MoneyBalance are shown. 4. Make a change on the computer — refresh on the phone — the change is reflected. |
 
---
 
## Stage 6 — Offline Mode
 
| | |
|---|---|
| **Stack** | Dexie.js, vite-plugin-pwa, Supabase JS Client |
| **Where to test** | Deployed on Vercel. PWA offline mode does not work on localhost. |
| **What AI does** | Wires offline storage with sync logic: actions taken offline are saved locally and sent to Supabase when connection is restored |
| **What you do** | Nothing — just test |
| **What you get** | The app works without internet. Data is not lost when offline. No duplicates appear after sync. |
| **How to check** | Run each scenario below: |



