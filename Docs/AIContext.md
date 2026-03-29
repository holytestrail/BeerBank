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


## Пошаговый план работы над приложением

1. ✅ Требования, БД, Vision, API
2. ✅ Окружение, Supabase
3. ✅ Прототип UI
4. **Финальный UI в React** _Результат: приложение открывается в браузере, все экраны отображаются с финальным дизайном, навигация между ними работает. Данные хардкодные — баланс всегда 0, rate всегда 1._
5. **Локальная логика** (Zustand + Dexie) _Результат: все кнопки работают, баланс считается, валидация работает, тосты появляются. Данные сохраняются между перезагрузками страницы. Без логина, без сервера._
6. **Экран авторизации** (дизайн + Google OAuth) _Результат: при открытии приложения показывается экран логина. Google OAuth работает. После логина открывается главный экран. Logout работает._
7. **Деплой на Vercel** _Результат: приложение доступно по публичной ссылке. Можно открыть на телефоне и добавить на главный экран._
8. **Онлайн-режим** (синхронизация с Supabase) _Результат: данные тянутся с сервера при открытии. После каждого действия данные сохраняются в Supabase. Одни и те же данные видны на телефоне и компьютере под одним аккаунтом._
9. **Офлайн-режим** (Dexie + PWA) _Результат: приложение работает без интернета. Действия сохраняются локально. При восстановлении связи данные синхронизируются с сервером без дублей._
10. **Лендинг** _Результат: по корневому URL открывается страница с описанием приложения и кнопкой входа. Приложение доступно по отдельному пути._