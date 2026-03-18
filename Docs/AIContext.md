# BeerBank (BB) app — контекст для AI

## Суть приложения
Our app is for people who love beer but lack the motivation for regular workouts. Through gamification with our app, they exchange exercises for the right to drink a certain amount of beer.

**Usage Scenario**:
**Step 1**: As a user, When I have a free minute, I do a few push-ups, squats, or other simple exercises. I add the number of repetitions to my BeerBank App, which converts them into Beer Credit according to the conversion rate I chose earlier. For example, 1 push-up = 2 Serbian dinars.
**Step 2**: As a user, When I want to buy a beer, I check my Beer Credit. If I have enough dinars, I can buy a beer and decrease my Beer Credit accordingly. If I don’t have enough credit, I’m honest with myself and skip the beer. Next time, I make sure I do enough exercise in advance before going to a bar.

## Стек
Frontend: React + Vite, PWA, Zustand, Dexie.js, Workbox
Backend: Supabase (PostgreSQL + Auth + REST)
Deploy: Vercel

## Структура БД


## Архитектурные договорённости
Если сервер недоступен, значения изменяются локально и синкуются при появлении связи.

## Текущий статус
Что сделано, что в работе, что следующее.

## Ссылки на документы
- Требования: [/docs/product/requirements.md](https://github.com/holytestrail/BeerBank/blob/main/Docs/Requirements%20for%20BBapp.md) 
-  