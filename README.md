# Ramsey — AI Recipe Generator

A pantry-first web app that generates recipes based on ingredients you already have.

## What it does

- Enter ingredients you have at home with quantities
- AI generates a tailored recipe using those ingredients plus a few extras
- See which ingredients you already have vs. need to buy
- Save favourite recipes and revisit them in the My Recipes tab

## Tech Stack

- **Monorepo:** Turborepo + TypeScript
- **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite + Prisma ORM
- **AI:** Google Gemini API (gemini-2.5-flash)

## Getting Started

Install dependencies:
```bash
yarn install
```

Run the dev server:
```bash
yarn dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
