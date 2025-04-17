# 🪝 Hooks Directory (`/hooks`)

> Reusable custom React hooks for managing state, effects, or shared logic.

This folder contains **custom React hooks** used throughout the application. Each hook is focused, testable, and easy to compose into larger features.

---

## 📚 So far we have

- `useChartContext.ts` — Fetch and structure data from chart services.

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
