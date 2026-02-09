# UBI Product Toolkit App

A React + TypeScript application for browsing the Ubiquiti product catalog. It supports grid and list layouts, filtering by product line, and quick search with debounced suggestions. Product details include images and a raw JSON view of the underlying data.

## Features

- Product catalog with list and grid views
- Infinite scrolling on listings
- Search with debounced suggestions
- Filter by product line
- Product details with image preview and raw JSON
- Centralized error handling for API failures

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack Query (data fetching & caching)
- Zustand (UI state)
- Zod (schema validation)
- Axios (HTTP)

## Data Source

- Products: https://static.ui.com/fingerprint/ui/public.json
- Images: https://images.svc.ui.com/

## Getting Started

1. Install dependencies:
    ```bash
    npm install
    ```
2. Start the dev server:
    ```bash
    npm run dev
    ```

## Docker

Build the image:

```bash
docker build -t ubi-product-toolkit-app .
```

Run the container:

```bash
docker run --rm -p 8080:80 ubi-product-toolkit-app
```

## Deploy (Fly.io)

This repo includes a deployment script at [scripts/deploy.sh](scripts/deploy.sh). It reads a local .env file, sets non-VITE* keys as Fly secrets, and forwards VITE* keys as Docker build arguments.
**Important:** For deployment from local env

1. Install and authenticate with flyctl.
    ```
    flyctl auth login
    ```
2. Deploy:
    ```bash
    ./scripts/deploy.sh
    ```

## Testing

This project uses Vitest for unit testing and React Testing Library for component testing.

### Test Libraries

- **Vitest** - Unit testing framework built for Vite
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment simulation
- **@vitest/coverage-v8** - Code coverage reporting

### Running Tests

```bash
npm run test          # Run tests once
npm run test:watch   # Run tests in watch mode with auto-reload
npm run test:coverage # Generate coverage report
```

### Test Structure

All tests are organized in `src/__tests__/`:

- `src/__tests__/unit/` — Unit tests for utilities, services, hooks
- `src/__tests__/components/` — Component tests

Example test files are included to demonstrate testing patterns.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
npm run test
npm run test:watch
npm run test:coverage
```

## Project Structure

- src/components — shared UI building blocks
- src/features — product listing, search, filters, details
- src/pages — route-level screens
- src/services — API access layer
- src/providers — service and app providers
- src/layouts - UI reusable layouts
