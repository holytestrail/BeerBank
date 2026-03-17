# BBapp — контекст для Claude

## Суть приложения
Our app is for people who love beer but lack the motivation for regular workouts. Through gamification — exchanging exercises for the right to drink a certain amount of beer — we encourage them to add quick, simple exercises to their daily routine so they start moving their asses, even if it’s only for their favorite drink.

**Usage Scenario**:

Step 1: When I have a free minute, I do a few push-ups, squats, or other simple exercises. I add the number of repetitions to my BeerBank App, which converts them into Beer Credit according to the conversion rate I chose earlier. For example, 1 push-up = 2 Serbian dinars.

Step 2: When I want to buy a beer, I check my Beer Credit. If I have enough dinars, I can buy a beer and decrease my Beer Credit accordingly. If I don’t have enough credit, I’m honest with myself and skip the beer. Next time, I make sure I do enough exercise in advance before going to a bar.

## Стек
Frontend: React + Vite, PWA, Zustand, Dexie.js, Workbox
Backend: Supabase (PostgreSQL + Auth + REST)
Deploy: Vercel

## Структура БД
[вставить актуальную схему]

## Архитектурные договорённости
[ключевые пункты]

## Текущий статус
Что сделано, что в работе, что следующее.

## Ссылки на документы
- Требования: /docs/product/requirements.md
- ...
```

В начале каждого нового чата ты вставляешь этот файл — и я сразу в контексте.

---

## Как делить работу по чатам

Один чат = одна тема. Хорошее деление:

| Чат | Что обсуждаем |
|---|---|
| **Архитектура** | Схема БД, синхронизация, офлайн-логика |
| **Frontend** | Конкретный экран или компонент |
| **Supabase/Backend** | Настройка, политики, API |
| **Требования** | Доработка, уточнения, новые фичи |
| **Дебаг** | Конкретная проблема с кодом |

Не стоит мешать в одном чате «правим требования» и «пишем компонент» — контекст разрастается и я начинаю путаться в деталях.

---

## Практический workflow
```
1. Обновил документ → закоммитил в GitHub
2. Открыл новый чат
3. Вставил context.md + нужный документ
4. Сформулировал конкретную задачу
5. Получил результат → сохранил/закоммитил