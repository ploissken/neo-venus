# 🪝 Hooks Directory (`/hooks`)

> Reusable custom React hooks for managing state, effects, or shared logic.

This folder contains **custom React hooks** used throughout the application. Each hook is focused, testable, and easy to compose into larger features.

---

## 🧱 Structure so far

- `useCreateChart.ts` — Generates an Astral Chart with basic inputs
- `useFetch.ts` — Wraps fetch logic, with a single place for fetching, authentication and error handling
- `useSnackabr.ts` — Handles toast displaying

---

## 📚 Folder Breakdown

### `useCreateChart`

- Hook for generating **astrology charts**.

### `useFetch`

- Provides a single entrypoint for fetch, try/catch, and error checking all over the app
- Handles cookie-based auth with consistency
- Seamless handles statuses (e.g. all 401s redirect to /user/sign-in)
- Display toasts on server errors (400, 401, 404, 500) without cluttering every component

### `useSnackabr`

- Hook for handling and displaying feedback toasts for the user

---

## 🔁 Conventions

- All hook filenames start with `use*`.
- Hooks should be:
  - **Pure** (no side effects unless intentionally scoped)
  - **Isolated** (no app-specific dependencies unless abstracted)
  - **Composable** (used easily with other hooks or components)

---

## 🔗 Resources

- [React Docs – Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Custom Hooks Best Practices](https://usehooks.com/)
