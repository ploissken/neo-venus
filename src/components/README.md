# 🧩 Components Directory (`/components`)

> Reusable, composable UI blocks that make up the visual structure of the app.

This folder contains the building blocks of the interface — from atomic elements (like icons and logos) to larger layout chunks (like navigation, page containers or data renderers). Components are modular and grouped by feature when appropriate.

---

## 🧱 Structure

    /components
      ├── /chart             # Renders the visual astral chart
      ├── /chart-creation    # UI input and form components for creating new charts
      ├── /chart-data        # Displays astral chart data in a readable way
      ├── /icons             # Custom icon components
      ├── /logo              # App logo components
      └── /navbar            # Navigation bar and drawer components

---

## 📚 Folder Breakdown

### `/chart`

- Core component for **rendering the astrology chart**.
- SVG based chart wheel, planets, houses and aspects

### `/chart-creation`

- Components responsible for the **chart creation flow**.
- Inputs, date/time/location pickers, menus

### `/chart-data`

- Visual representation of raw **astrological data**.
- Includes positions, aspects, house info — complements the chart visually and in tabular forms

### `/icons`

- Custom icon components used across the UI.
- SVG-based imported as React components

### `/logo`

- Contains variants of the **application logo**.

### `/navbar`

- **Navigation bar** used across pages.
- Includes menu drawer for feature navigation
