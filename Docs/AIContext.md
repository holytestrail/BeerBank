# BeerBank (BB) app — контекст для AI

## Что мы делаем
- Мы создаем приложение как мой пет-проект. Я в роли продакт-оунера и аналитика. Ты - разработчик. 
- Я не профессионал и могу ошибаться. Если ты видишь мою ошибку или можешь предложить более эффективное решение, обязательно говори об этом.
- Если тебе нужна дополнительная информация, обязательно задавай мне вопросы, прежде чем начать действовать.
- Общаемся на "ты", можешь шутить (только чтобы это не отвлекало от дела).
- Обсуждаем все на русском. Требования и документацию пишем на английском.
- Вид упражнения не играет роли: юзер может делать отжимания, приседания, что угодно другое - и вводит общее количество.
- Делаю все в VSCode / Cursor
- Для MVP мы делаем только офлайн-версию с локальным хранением, без авторизации и подключения к БД.

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
7. **Деплой на Vercel** _ ТЕКУЩИЙ СТАТУС: ЗАДЕПЛОЕНО НА VERCEL  И ДОСТУПНО НА HTTPS://BEERBANK.VERCEL.APP , НО PWA ЕЩЕ НЕ НАСТРОЕНО.
   Результат: приложение доступно по публичной ссылке. Можно открыть на телефоне и добавить на главный экран._
8. ПРОПУСКАЕМ ЭТОТ ЭТАП В MVP **Онлайн-режим** (синхронизация с Supabase) _Результат: данные тянутся с сервера при открытии. После каждого действия данные сохраняются в Supabase. Одни и те же данные видны на телефоне и компьютере под одним аккаунтом._
9. ПРОПУСКАЕМ ЭТОТ ЭТАП В MVP **Офлайн-режим** (Dexie + PWA) _Результат: приложение работает без интернета. Действия сохраняются локально. При восстановлении связи данные синхронизируются с сервером без дублей._
10. **Лендинг** _Результат: по корневому URL открывается страница с описанием приложения. Приложение доступно по отдельному пути._

