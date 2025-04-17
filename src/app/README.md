# 🧩 App Directory (`/app`)

> **Next.js App Router** structure — core pages, layouts, and route handlers live here.

This folder defines the root application structure using the Next.js **App Router** (introduced in Next 13). It handles routing, layouts, and server-side logic via API routes.

---

## 🧱 Structure

    /app
      ├── /about           # Static route for the "About" page
      ├── /api             # Route handlers (acts as API endpoints)
      ├── /user-profile    # User profile page (wip)
      ├── layout.tsx       # Shared layout across all routes
      └── page.tsx         # Root '/' page — homepage content

---

## 💡 Notes

- Built using the **Next.js App Router** — every directory is either a **page**, **layout**, or **API route**.
- Each route is **file-system based**, meaning folder names = URLs.
- Route handlers in `/api` can replace traditional `/pages/api/*` endpoints.

---

## 🔗 Related Docs

- [Next.js App Router Docs](https://nextjs.org/docs/app/building-your-application/routing)
- [Layouts in App Router](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
