**1. UI — то, что видит пользователь** Экраны, кнопки, цифры. Главный экран с балансом, экран списания, настройки. Это "лицо" приложения. Сюда же относится и то, как оно выглядит на телефоне — потому что BeerBank будет использоваться в основном с мобильного.

**2. Логика состояния (State Management)** Приложение должно где-то "помнить" текущие данные: сколько упражнений, какой баланс, какой курс конвертации. Это не база данных — это оперативная память приложения. Нажал кнопку "+10" — баланс сразу обновился на экране, не дожидаясь ответа сервера.

**3. Локальное хранилище (Offline Storage)** BeerBank должен работать без интернета. Если нажал "+10 отжиманий" в метро — данные не должны потеряться. Значит, нужно временное хранилище прямо в браузере/телефоне, которое потом синхронизируется с сервером когда появится сеть.

**4. Синхронизация с сервером** Когда интернет появился — локальные данные отправляются в Supabase. И наоборот: при открытии приложения — подтягиваются актуальные данные с сервера. Это "мост" между телефоном и базой данных.

**5. PWA-оболочка** Чтобы приложение можно было "установить" на телефон как обычное приложение (иконка на рабочем столе, работа без браузера), нужна специальная PWA-обёртка. Она также отвечает за кэширование — чтобы приложение грузилось быстро даже при плохом интернете.


| Element          | Tools                                                               | To do |
| ---------------- | ------------------------------------------------------------------- | ----- |
| UI               | React (design)<br>Vite (builds deploy file)<br>Shadcn/ui + Tailwind |       |
| State Management | Zustand                                                             |       |
| Offline Storage  | Dexie.js, офлайн как запасной вариант.                              |       |
| Server Syncing   | Supabase JS Client                                                  |       |
| PWA shell        | vite-plugin-pwa                                                     |       |




## Как проверять на каждом этапе

**Этапы 1–3 (скелет, UI, локальная логика)** — приложение запускается локально на твоём компьютере. AI даст команду типа `npm run dev`, ты вставишь её в терминал, и приложение откроется по адресу `localhost:5173` в браузере. Интернет не нужен, ничего публиковать не нужно.

Чтобы проверить на телефоне на этих этапах — телефон и компьютер должны быть в одной WiFi-сети, тогда можно открыть локальный адрес компьютера прямо на телефоне.

**Этапы 4–6 (авторизация, сервер, офлайн)** — здесь уже нужен деплой на Vercel, потому что Google OAuth не работает с localhost по соображениям безопасности. Но Vercel деплоится в одну команду (`vercel deploy`) и даёт публичную ссылку вида `beerbank.vercel.app` — бесплатно, занимает минуту.




# BeerBank — Frontend Development Checklist
 
## Stage 1 — Project Skeleton
 
| | |
|---|---|
| **Stack** | React, Vite, vite-plugin-pwa |
| **Where to test** | Locally in browser (`localhost:5173`). Run `npm run dev` in terminal — AI will provide exact command. |
| **What AI does** | Creates the project, sets up all screens (empty), configures navigation between them, configures PWA manifest (app name, icon, colors) |
| **What you do** | Provide app icon image (or approve a placeholder) |
| **What you get** | A working app that opens in the browser, has all screens navigable by tapping, and can be added to the phone home screen |
| **How to check** | 1. Open the link in Chrome on your phone. 2. Tap "Add to Home Screen." 3. Launch from the home screen — it opens without the browser bar. 4. Tap through all screens — nothing crashes. |
 
---
 
## Stage 2 — UI Layout (no logic)
 
| | |
|---|---|
| **Stack** | shadcn/ui, Tailwind CSS |
| **Where to test** | Locally in browser (`localhost:5173`). To check on phone: connect phone and computer to the same WiFi — AI will provide the local network address. |
| **What AI does** | Builds all screens visually: main screen with balance and exercise count, add exercises screen, spend screen, balance correction screen, settings screen. Data is hardcoded (balance always shows "100", rate always "2"). |
| **What you do** | Review the visual result and give feedback on look and feel |
| **What you get** | A fully designed app — all screens look as intended, buttons and inputs are in place, comfortable on mobile |
| **How to check** | 1. Does the main screen show balance and exercise total clearly? 2. Are buttons large enough to tap comfortably on a phone? 3. Does nothing look broken or out of place on a small screen? 4. Does the overall style match the fun/casual tone of the app? |
 
---
 
## Stage 3 — Local Logic (no server)
 
| | |
|---|---|
| **Stack** | Zustand, Dexie.js |
| **Where to test** | Locally in browser (`localhost:5173`). To check on phone: same WiFi network as computer. |
| **What AI does** | Wires up all the logic: buttons work, balance updates instantly, conversion rate applies correctly, validation messages appear for wrong input. Everything runs locally — no server, no login. |
| **What you do** | Run through all scenarios from the requirements manually |
| **What you get** | A fully functional app — all features work, just without saving data to the server or requiring login |
| **How to check** | Run each scenario below and confirm the result: |
 
| Scenario | Steps | Expected result |
|---|---|---|
| Add exercises | Tap an "add" button on main screen | ExTotal increases, MoneyBalance increases by (amount × rate), a random motivational message appears |
| Conversion rate | Change rate in Settings, then add exercises | MoneyBalance increases using the new rate |
| Spend money | Open spend screen, enter amount, confirm | MoneyBalance decreases, a random spend message appears |
| Spend too much | Try to spend more than current balance | Error message appears, balance unchanged |
| Decrease exercises | Open decrease screen, enter number, confirm | ExTotal and MoneyBalance decrease accordingly |
| Wrong input | Enter "abc" or "0" or "-5" in any field | Error message appears, app waits for correct input |
| Double tap | Tap an add button twice very fast | Only one tap is counted (500ms protection) |
 
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
 
| | |
|---|---|
| **Stack** | Supabase JS Client |
| **Where to test** | Deployed on Vercel (same link as Stage 4). |
| **What AI does** | Connects the app to Supabase database: on open, pulls actual data from server; after each action, saves data to server |
| **What you do** | Nothing — just test |
| **What you get** | Data is stored in the cloud. The same data appears on any device where you log in. |
| **How to check** | 1. Add exercises on your phone. 2. Open the app on a computer (or another browser) and log in with the same Google account. 3. The same ExTotal and MoneyBalance are shown. 4. Make a change on the computer — refresh on the phone — the change is reflected. |
 
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
 
| Scenario           | Steps                                            | Expected result                                                              |
| ------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| Offline add        | Turn off WiFi. Add exercises. Turn WiFi back on. | Exercises appear on server (check from another device or Supabase dashboard) |
| Offline spend      | Turn off WiFi. Spend money. Turn WiFi back on.   | Spend appears on server, no duplicate                                        |
| App reload offline | Turn off WiFi. Close and reopen the app.         | App loads, shows correct balance from last sync                              |
| No duplicates      | Add exercises offline, reconnect, check data     | Each action appears exactly once on server                                   |
