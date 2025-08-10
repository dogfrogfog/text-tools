# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

some new info

## Commands

### Development
- `npm run dev` - Start development server with Turbopack at http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Component Management
- `npx shadcn@latest add [component]` - Add new shadcn/ui components

## Architecture

### Tech Stack
- **Framework**: Next.js 15.1 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components (New York style)
- **Theme**: next-themes for dark/light mode support
- **Language**: TypeScript with strict mode enabled
- **Package Manager**: pnpm

### Project Structure
The application follows Next.js App Router conventions:

- `/app` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with ThemeProvider and ModeToggle
  - `page.tsx` - Main text transformation interface (client component)
- `/components` - React components
  - `/ui` - shadcn/ui components (Button, Card, Textarea, DropdownMenu)
  - `theme-provider.tsx` - Dark/light mode provider
  - `mode-toggle.tsx` - Theme switcher dropdown
- `/lib/utils.ts` - Utility functions including `cn()` for className merging

### Key Features
The application is a text transformation tool with the following capabilities:
- Case conversions: UPPERCASE, lowercase, Sentence case, Title Case, Capitalized Case, aLtErNaTiNg CaSe, Inverse Case
- Word and character counting
- Copy to clipboard, download as text file, and clear functionality
- Dark/light theme toggle

### Component Configuration
Components are configured via `components.json`:
- Uses New York style from shadcn/ui
- CSS variables for theming
- Lucide React for icons
- Path aliases: `@/` maps to project root
