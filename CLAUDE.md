# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A React + Vite expense/finance tracker. This is the starter project for a Claude Code course — it originally shipped as one messy component with a bug and poor UI, which is being incrementally cleaned up.

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

- `App.jsx` owns the only shared state: the `transactions` array (`useState`, seeded with mock data, in-memory only — nothing is persisted) and the hardcoded `categories` array. It defines `addTransaction`/`deleteTransaction` and passes them down as callback props; it holds no form or filter state itself.
- `Summary.jsx` takes `transactions` and derives `totalIncome`/`totalExpenses`/`balance` internally (each transaction's `amount` is a plain number, so these are straight `reduce` sums — no string coercion needed).
- `TransactionForm.jsx` owns its own local form state (`description`, `amount`, `type`, `category`) and calls the `onAddTransaction` callback prop with a fully-formed transaction object (`amount` converted via `Number(amount)` since it comes from a text input).
- `TransactionList.jsx` owns its own local filter state (`filterType`, `filterCategory`) and renders the filtered table; it takes `transactions` and `categories` as props. Each row's Delete button confirms via `window.confirm` before calling the `onDeleteTransaction` callback prop with the transaction's `id`.
- Styling is plain CSS in `src/App.css` and `src/index.css`, no CSS framework.
