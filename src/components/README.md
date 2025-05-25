# 🧩 Components Directory (`/components`)

> Reusable, composable UI blocks that make up the visual structure of the app.

This folder contains the building blocks of the interface — from atomic elements (like icons and logos) to larger layout chunks (like navigation, page containers or data renderers). Components are modular and grouped by feature when appropriate.

---

## 🧱 Structure

    /components
      ├── /chart             # Astral Chart related components
            ├── /creation    # Inputs for creating an astral
            ├── /data        # Data display components
            └── /drawings    # SVG Visual Chart components
      ├── /icons             # Custom icon components
      ├── /logo              # App logo components
      ├── /navbar            # Navigation bar and drawer components
      └── /profile           # User profile related components

---

## 📚 Folder Breakdown

### `/chart`

- Core components for **astrology charts**.

### `/chart/creation`

- Components responsible for the **chart creation flow**, such as DateTime and Location Pickers.

### `/chart/drawings`

- Visual representation of the **astrological charts**. Planet positions, aspects, signs, and houses info in SVG. Animatied with [motion](https://motion.dev/)

### `/chart/data`

- Textual representation of raw **astrological data**. Includes metadata, planet positions, aspects, and houses info, mostly in tabular forms

### `/icons`

- Custom icon components used across the UI.
- SVG-based imported as React components

### `/logo`

- Contains variants of **mercuryou logo**.

### `/navbar`

- **Navigation bar** used across pages.
- Includes menu drawer for feature navigation

### `/profile`

- **User profile** creation/edition components
