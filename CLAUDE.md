# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal software engineering blog built with Astro 5.0, based on the AstroWind template. The site is deployed to GitHub Pages with automatic CI/CD via GitHub Actions.

**Live site:** https://www.patrady.com

## Development Commands

### Core Commands

```bash
npm install              # Install dependencies
npm run dev             # Start dev server at localhost:4321
npm run build           # Build production site to ./dist/
npm run preview         # Preview production build locally
```

### Code Quality

```bash
npm run check           # Run Astro checks, ESLint, and Prettier
npm run check:astro     # Run Astro type checking only
npm run check:eslint    # Run ESLint only
npm run check:prettier  # Run Prettier check only
npm run fix             # Auto-fix ESLint and Prettier issues
npm run fix:eslint      # Auto-fix ESLint only
npm run fix:prettier    # Auto-fix Prettier only
```

## Architecture

### Content Collections & Blog Posts

The blog uses Astro Content Collections for type-safe blog post management:

- **Post Location**: All blog posts are stored as Markdown/MDX files in `src/data/post/`
- **Collection Definition**: `src/content/config.ts` defines the schema with the glob loader pattern: `glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' })`
- **Post Normalization**: `src/utils/blog.ts` contains the core blog logic:
  - `getNormalizedPost()` transforms raw posts into the `Post` type with computed fields
  - `fetchPosts()` loads all posts, sorted by publish date, filtering out drafts
  - `getRelatedPosts()` uses category (weight: 5) and tag (weight: 1) matching to find related content
  - Static path generators for blog list, individual posts, categories, and tags

### Permalink System

Controlled by `src/utils/permalinks.ts`:

- **Configuration**: `src/config.yaml` defines permalink patterns (e.g., `/%slug%` for posts)
- Blog posts support variable substitution: `%slug%`, `%year%`, `%month%`, `%day%`, `%hour%`, `%minute%`, `%second%`, `%category%`
- Categories use `/category/[slug]` pattern
- Tags use `/tag/[slug]` pattern

### AstroWind Vendor Integration

The `vendor/integration` directory contains a custom Astro integration from the AstroWind template:

- Loaded in `astro.config.ts` as `astrowind({ config: './src/config.yaml' })`
- Provides blog configuration (`APP_BLOG`) imported as `astrowind:config`
- This is template code being migrated to a proper integration (see `vendor/README.md`)

### Configuration System

- **Site Config**: `src/config.yaml` contains site metadata, SEO defaults, blog settings, and UI theme
- **Navigation**: `src/navigation.ts` defines header/footer navigation (currently has template data)
- **Astro Config**: `astro.config.ts` sets up integrations, Markdown plugins, and path aliases (`~` → `./src`)

### Markdown Processing

Remark and Rehype plugins in `src/utils/frontmatter.ts`:

- `readingTimeRemarkPlugin`: Calculates reading time and adds to frontmatter
- `responsiveTablesRehypePlugin`: Makes tables responsive
- `lazyImagesRehypePlugin`: Adds lazy loading to images

### Component Structure

- `src/components/widgets/`: High-level page sections (Hero, Features, Content, etc.)
- `src/components/common/`: Shared components (Background, Headline, etc.)
- `src/components/blog/`: Blog-specific components (ListItem, Grid, etc.)
- `src/components/ui/`: Low-level UI components (Button, Form, etc.)
- `src/layouts/`: Page layouts (Layout, PageLayout, MarkdownLayout, LandingLayout)
- `src/pages/`: File-based routing with dynamic routes for blog content

### Styling

- **Tailwind CSS**: Configured in `tailwind.config.js` with `@tailwindcss/typography` plugin
- **Custom Styles**: `src/components/CustomStyles.astro` contains global styles
- Base styles disabled in Astro config: `tailwind({ applyBaseStyles: false })`

## Deployment

The site deploys automatically to GitHub Pages when changes are pushed to `main`:

- **Workflow**: `.github/workflows/deploy.yml`
- **Build Process**: Runs `npm run build` to generate static files in `./dist/`
- GitHub Pages serves from the `gh-pages` branch

## Required Frontmatter for Blog Posts

When creating new posts in `src/data/post/`:

```yaml
---
publishDate: 2026-01-04T00:00:00Z # Required
author: Patrick Rady # Optional
title: Your Post Title # Required
excerpt: Brief description # Optional
image: https://example.com/img.jpg # Optional
category: Category Name # Optional
tags: # Optional
  - tag1
  - tag2
draft: false # Optional, defaults to false
---
```

## TypeScript Configuration

- Node version: >=24.0.0 (see `package.json` engines)
- Path alias: `~` maps to `./src` (configured in `astro.config.ts` and `tsconfig.json`)
- Type definitions: `src/types.d.ts` contains custom type definitions for the blog system

## ESLint Configuration

Uses flat config format (`eslint.config.js`):

- Parses `.astro` files with `astro-eslint-parser`
- TypeScript support via `@typescript-eslint/parser`
- Custom rule: Unused vars must start with `_` to be ignored
- Ignores: `dist`, `node_modules`, `.github`, `types.generated.d.ts`, `.astro`
