# Multi-Tenant Ticket Management Frontend

A React + TypeScript frontend for managing projects and tickets inside a multi-tenant workspace. Users authenticate into a tenant-specific environment where they can create projects, track tickets, and update ticket status through a streamlined dashboard.

## Overview

This app is designed for a shared, tenant-aware workflow where each tenant has its own isolated project and ticket set. The frontend handles the user experience for:

- authentication and onboarding
- tenant-scoped navigation
- project creation and organization
- ticket tracking and status transitions
- responsive dashboard layout and form-driven workflows

## Core Features

- User login and registration
- Tenant-specific route structure
- Project dashboard with search, filtering, and creation
- Project detail views with ticket lists
- Ticket creation and detailed ticket inspection
- Drag-style or status-based workflow updates
- Sidebar navigation and authenticated session flow
- Validation, toast feedback, and modern UI components

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- TanStack Query
- Axios
- Tailwind CSS
- React Hook Form
- Zod
- shadcn/ui-style component architecture

## Project Structure

```bash
src/
├── components/
│   ├── layouts/
│   ├── ui/
│   └── app-sidebar.tsx
├── contexts/
├── features/
│   ├── auth/
│   ├── common/
│   ├── projects/
│   └── tickets/
├── lib/
├── pages/
│   ├── auth/
│   ├── project/
│   └── tickets/
├── routes/
├── main.tsx
└── index.css
```

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root with your backend URL:

```bash
VITE_BASE_URL=http://localhost:3000
```

This value is used by the Axios client for API calls.

### 3) Run the app locally

```bash
npm run dev
```

Then open the local Vite URL, typically:

```bash
http://localhost:5173
```

## Available Scripts

```bash
npm run dev      # start the Vite development server
npm run build    # run TypeScript checks and build the app
npm run preview  # preview the production build locally
npm run lint     # lint the project with ESLint
```

## Routing Pattern

The frontend is built around tenant-aware URLs such as:

```bash
/:slug/login
/:slug/projects
/:slug/projects/:id/tickets
```

This assumes the backend provides tenant-aware user sessions and project/ticket resources.

## Backend Dependency

This repository is the frontend layer only. It depends on an API service for:

- user login and registration
- tenant validation and identity checks
- project CRUD operations
- ticket CRUD and status updates

## Notes

- Session-based authentication is enabled via cookies.
- The app expects the backend to be running and reachable through the configured `VITE_BASE_URL`.
- The frontend is designed to work alongside a multi-tenant backend service rather than as a standalone application.

## License

This project is currently configured for internal or project-specific use unless a repository-level license is added later.

