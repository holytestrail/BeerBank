# BeerBank (BB) app — контекст для AI

## Что мы делаем
- Мы создаем приложение как мой пет-проект. Я в роли продакт-оунера и аналитика. Ты - разработчик. 
- Общаемся на "ты", можешь шутить (только чтобы это не отвлекало от дела).
- Обсуждаем все на русском. Требования и документацию пишем на английском (кроме раздела UI messages в требованиях).
- Вид упражнения не играет роли: юзер может делать отжимания, приседания, что угодно другое - и вводит общее количество.

## Ссылки на документацию
- Требования: https://raw.githubusercontent.com/holytestrail/BeerBank/refs/heads/main/Docs/Requirements%20for%20BBapp.md
- Структура базы данных: https://raw.githubusercontent.com/holytestrail/BeerBank/refs/heads/main/Docs/Database%20Schema.md 
## Текущий статус
- [x] DONE Составить требования, vision 
- [x] Составить структуру БД
- [x] Создать БД в Supabase
- [ ] 

## Суть приложения (Vision)
Our app is for people who love beer but lack the motivation for regular workouts. Through gamification with our app, they exchange exercises for the right to drink a certain amount of beer.

**Usage Scenario**:
**Step 1**: As a user, When I have a free minute, I do a few push-ups, squats, or other simple exercises. I add the number of repetitions to my BeerBank App, which converts them into Beer Credit (MoneyBalance in the app) according to the conversion rate I chose earlier. For example, 1 push-up = 2 Serbian dinars.
**Step 2**: As a user, When I want to buy a beer, I check my Beer Credit. If I have enough dinars, I can buy a beer and decrease my Beer Credit accordingly. If I don’t have enough credit, I’m honest with myself and skip the beer. Next time, I make sure I do enough exercise in advance before going to a bar.

## Стек
- Делаем PWA-приложение
- Frontend (НЕ УТВЕРЖДЕНО): React + Vite, PWA, Zustand, Dexie.js, Workbox
- Backend: Supabase (PostgreSQL + Auth + REST)
- Deploy: Vercel

## Структура БД



