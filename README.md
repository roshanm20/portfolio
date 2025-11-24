
# Muhammed Roshan M — Portfolio

This is a personal portfolio web application for Muhammed Roshan M, built with React and TypeScript. It showcases education, research, projects, skills, awards, and work experience in a modern, interactive, and visually rich format inspired by Nothing OS.

## Features

- **Intro Animation:** Astronomy-themed canvas animation on load
- **Responsive Navigation:** Sticky navbar with smooth scrolling and mobile support
- **Hero Section:** Prominent intro with summary and call-to-action
- **BentoGrid:** Visual grid for education, skills, tools, and languages
- **Sectioned Content:**
  - Research Experience
  - Projects (with tech stack and links)
  - Work Experience
  - Workshops & Conferences
  - Leadership & Positions
  - Achievements (animated timeline)
- **Modern UI:** Tailwind CSS, dark theme, and custom iconography

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons


## Gemini API Requirement

This project requires a Gemini API key for enabling the chat support feature.

- Get your Gemini API key here: [Google AI Gemini API Documentation](https://ai.google.dev/gemini-api/docs/get-started)
- Set your API key in a `.env.local` file as `GEMINI_API_KEY=your_key_here` before running the app.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)


### Build for Production

To build the app for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run preview
```

## Folder Structure

- `components/` — All React UI components
- `constants.ts` — Portfolio data (education, projects, etc.)
- `types.ts` — TypeScript types for data
- `App.tsx` — Main app layout
- `index.tsx` — Entry point
- `vite.config.ts` — Vite configuration
- `tailwind.config.js` — Tailwind CSS config (if present)

## License

This project is open source and available under the MIT License.
