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

    yarn install

Set up environment variables — create a file at apps/api/.env with the following:

    GEMINI_API_KEY=your_key_here
    PORT=3001

To get a free Gemini API key, go to https://aistudio.google.com, sign in with a Google account, and click Get API key.

Run the dev server:

    yarn dev

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
