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

This repo includes a deployment script at [scripts/deploy.sh](scripts/deploy.sh). It reads a local .env file, sets non-VITE_ keys as Fly secrets, and forwards VITE_ keys as Docker build arguments.

1. Install and authenticate with flyctl.
    ```
    flyctl auth login
    ```
2. Deploy:
   ```bash
   ./scripts/deploy.sh
   ```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
```

## Project Structure

- src/components — shared UI building blocks
- src/features — product listing, search, filters, details
- src/pages — route-level screens
- src/services — API access layer
- src/providers — service and app providers
- src/layouts - UI reusable layouts
