# 📚 Lib Directory (`/lib`)

> Core shared logic, types, and constants — used across the app and features.

The `/lib` folder contains **non-UI code** that powers the core functionality of the app. This includes constants, reusable types, and helper functions.

---

## 🧱 File Breakdown

    /lib
      ├── chart.consts.ts         # Static constants for chart generation
      ├── chart.types.ts          # Shared TypeScript types for astral charts
      ├── create-chart.helpers.ts # Pure functions used to build charts (math, data formatting, mappers, etc.)
      └── location.types.ts       # Types for location search results, coordinates, etc.

---

## 📌 Notes on Structure

> This structure may evolve as the codebase grows — refactoring is expected!

- **Constants & Types** are colocated by domain (`chart.*`, `location.*`) to improve discoverability.
- **Helper functions** are kept pure and decoupled from React, which makes them easy to:
  - Test
  - Reuse in client/server environments
  - Optimize separately from UI concerns
