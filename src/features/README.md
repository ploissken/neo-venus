# 🌟 Features Directory (`/features`)

> Self-contained feature modules for specific UI and logic.

This folder organizes **feature-driven modules** — each folder contains the components and logic related to a single functional domain.

---

## 📚 What we have so far

    /features
      ├── /about         # static container with some (poor) information about the app. To be improved!
      ├── /create-chart  # for the creation of anonymous charts, based on date, time and location
      ├── /home          # currently it displays the astral chart for the current sky, with optional location consideration
      ├── /user          # WIP: will contain user info, preferences, settings and created charts

---

## 🧠 Why Feature-Based?

This approach:

- Reduces coupling across the codebase
- Keeps related files together
- Makes large projects easier to scale and onboard new devs

---

## 🔗 Resources

- [Feature-Based Folder Structure](https://medium.com/nerd-for-tech/structuring-react-projects-with-feature-driven-development-%EF%B8%8F-b671ee898145)
- [React Architecture Patterns](https://reactpatterns.com/)
