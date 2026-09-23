
# Muhammed Roshan M, Portfolio

This is a personal portfolio web application for Muhammed Roshan M, built with React and TypeScript. It presents his AI data operations and delivery work, startup, leadership, skills and physics research background, in a dark design inspired by Nothing OS.

## Features

- **Responsive Navigation:** Sticky navbar with smooth scrolling and mobile support
- **Hero Section:** Prominent intro with summary and call-to-action
- **BentoGrid:** Visual grid for education, skills, tools, and languages
- **Sectioned Content:**
  - Experience
  - How I Work
  - Leadership
  - Skills & Education
  - Things I've Built
  - Research Background
  - Recognition (animated timeline)
- **CV download:** `public/Muhammed_Roshan_M_CV.pdf`
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

- `components/`: React UI components
- `constants.ts`: all portfolio content (edit this to update the site)
- `types.ts`: TypeScript types for the content
- `App.tsx`: page layout and section order
- `index.tsx`: entry point
- `vite.config.ts`: Vite configuration

## License

This project is open source and free.
