# Patrick Brady's Engineering Blog

Personal software engineering blog covering web development, system design, and technical deep dives.

**Live site:** https://www.patrady.com

## About

This is my personal blog where I write about software engineering topics including:

- Web development best practices and patterns
- System design and architecture
- Technical deep dives into interesting problems
- Tools, frameworks, and technologies
- Lessons learned from building software

## Tech Stack

- **[Astro 5.0](https://astro.build/)** - Modern static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[AstroWind](https://github.com/onwidget/astrowind)** - Astro theme (customized)
- **GitHub Pages** - Hosting with custom domain
- **GitHub Actions** - CI/CD for automatic deployments

## Local Development

### Prerequisites

- Node.js 24.0.0 or higher
- npm

### Setup

1. Clone the repository:

```bash
git clone https://github.com/patrady/blog-engineering.git
cd blog-engineering
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321/`

### Available Commands

| Command           | Action                                 |
| :---------------- | :------------------------------------- |
| `npm install`     | Install dependencies                   |
| `npm run dev`     | Start dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`     |
| `npm run preview` | Preview production build locally       |
| `npm run check`   | Run Astro checks, ESLint, and Prettier |
| `npm run fix`     | Auto-fix linting and formatting issues |

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

**Deployment workflow:** `.github/workflows/deploy.yml`

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/        # Images, styles
│   ├── components/    # Astro components
│   ├── content/       # Content collections config
│   ├── data/
│   │   └── post/      # Blog posts (Markdown/MDX)
│   ├── layouts/       # Page layouts
│   ├── pages/         # File-based routing
│   └── utils/         # Utility functions
├── astro.config.ts    # Astro configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Writing Blog Posts

Blog posts are written in Markdown (`.md`) or MDX (`.mdx`) and placed in `src/data/post/`.

### Post Frontmatter

```yaml
---
publishDate: 2026-01-04T00:00:00Z
author: Patrick Brady
title: Your Post Title
excerpt: Brief description for previews and SEO
image: https://example.com/image.jpg
category: Category Name
tags:
  - tag1
  - tag2
---
```

## License

MIT License - See [LICENSE](LICENSE) for details.

## Acknowledgements

Built with [AstroWind](https://github.com/onwidget/astrowind) template.
