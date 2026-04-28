# Todo App

A modern todo application built with **Next.js 15**, **React 19**, **Zustand 5**, and **Tailwind CSS 3**.

## Features

- **Create, edit, delete todos** — full CRUD with inline editing
- **4 priority levels** — Low, Medium, High, Urgent (color-coded)
- **Filter views** — All / Active / Completed
- **Drag reorder** — Reorder todos via drag-and-drop
- **LocalStorage persistence** — Todos survive page refresh
- **Real-time stats** — Active/completed counts
- **Responsive UI** — Mobile-friendly with Tailwind CSS

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.7 |
| State | Zustand 5 + Immer + Persist |
| Styling | Tailwind CSS 3 + clsx + tailwind-merge |
| Icons | Lucide React |
| Package Manager | npm |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
todo-app/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── providers.tsx       # App providers
├── components/
│   ├── layouts/            # Layout components
│   │   └── Header.tsx
│   ├── todo/               # Todo feature components
│   │   ├── TodoFilter.tsx  # Filter tabs
│   │   ├── TodoInput.tsx   # Add new todo
│   │   ├── TodoItem.tsx    # Single todo item
│   │   ├── TodoList.tsx    # Todo list with drag reorder
│   │   └── TodoStats.tsx   # Stats bar
│   └── ui/                 # Reusable UI primitives
│       ├── Button.tsx
│       ├── Checkbox.tsx
│       ├── Input.tsx
│       └── Select.tsx
├── lib/
│   ├── cn.ts               # Classname merge utility
│   ├── constants.ts        # App constants
│   └── utils.ts            # Shared utilities
├── stores/
│   └── todo-store.ts       # Zustand store with immer + persist
├── types/
│   └── index.ts            # TypeScript types
└── configs/                # next.config.ts, tailwind.config.ts, etc.
```

## State Management

Built with **Zustand 5** and two middlewares:

- **`immer`** — Enables mutable-style state updates
- **`persist`** — Saves todos to `localStorage` under the key `todo-storage`

Only the `todos` array is persisted; filter state is ephemeral.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
