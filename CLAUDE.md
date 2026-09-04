# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A React + Vite expense/finance tracker. This is the starter project for a Claude Code course — it intentionally ships with a bug, poor UI, and messy code, all in a single component (`src/App.jsx`).

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

There is no test suite configured in this repo.

## Architecture

- Everything lives in `src/App.jsx` as one component: transaction state, form state, filters, derived totals, and the full render tree. There is no component decomposition, routing, or state management library yet.
- Transactions are in-memory only (`useState`, seeded with mock data) — nothing is persisted, and `amount` is stored/handled as a string (from text input) rather than a number, which affects the income/expense/balance sum logic.
- Styling is plain CSS in `src/App.css` and `src/index.css`, no CSS framework.
- Category list is a hardcoded array (`categories` in `App.jsx`) shared between the add-transaction form and the filter dropdown.
