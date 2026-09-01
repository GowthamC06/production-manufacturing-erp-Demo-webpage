# Production Manufacturing ERP

A frontend demo of an **Enterprise Resource Planning (ERP) system for garment/apparel manufacturing** — covering the full production lifecycle from merchandising and purchasing to cutting, stitching, quality control, and dispatch, alongside HR, finance, and reporting modules. Built as a static single-page prototype with a mocked "fake backend" (data seeded into `localStorage`), so it runs entirely in the browser with no server or database required.

## Features

- **Role-based Login** — switch between Admin and Employee views via a role selector on the login screen
- **Admin / Director Dashboard** — high-level KPIs and business overview
- **Employee Dashboard** — personal task view for shop-floor / staff users

### Production Modules
- **Merchandising** — order and buyer management
- **Production Planning** — plan and schedule manufacturing runs
- **Cutting**, **Stitching**, **Finishing** — track each stage of the garment production line
- **Quality Control** — inspection and quality tracking
- **Dispatch** — shipment and delivery tracking
- **Inventory** — fabric and stock management
- **Fabric** — fabric-specific inventory tracking

### Business Operations Modules
- **Customer Management** — customer/buyer records
- **Purchase** — procurement management
- **Finance** — financial tracking
- **HR** — human resources management
- **Attendance** — employee attendance tracking
- **Leave Management** — leave requests and approvals
- **My Tasks** — task assignments (employee view)
- **Reports** — analytics and reporting
- **Settings** — application configuration
- **Notifications** — in-app alerts

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (single-page app, no framework)
- [Bootstrap 5.3.3](https://getbootstrap.com/) (via CDN)
- [Font Awesome 6.5.1](https://fontawesome.com/) (via CDN)
- Google Fonts — Poppins, JetBrains Mono
- `localStorage` as a mock data store (no backend/database)
- Light/dark mode support

## Project Structure

```
Production_Manufacturing_ERP/
├── index.html     # Full single-page app — login, all modules, and dashboards
├── script.js      # App logic, mock data, routing between modules
└── style.css      # Styling, theming (light/dark mode), layout
```

## Getting Started

Since this is a static frontend project, no build step or server is required.

1. Clone the repository
   ```bash
   git clone https://github.com/GowthamC06/<your-repo-name>.git
   ```
2. Open `index.html` in your browser (or use a local dev server like VS Code's Live Server extension)

## Demo Access

The login page uses a simple role selector (no real authentication) — pick **Admin** or **Employee** and log in via the demo access option to explore that role's dashboard and available modules.

> ⚠️ This is a prototype with no real backend or security — authentication is fully simulated for demo purposes.

## Disclaimer

This is a **demo/prototype project** built for learning and portfolio purposes. All data and workflows are fictional/simulated, and there is no real backend, database, or production deployment. It is not intended for production use.

## License

Not yet decided — add a license (e.g., MIT) if you plan to open-source this.
