---
publishDate: 2026-01-04T00:00:00Z
author: Patrick Brady
title: Building My First Blog with Claude Code
excerpt: How I built this engineering blog using Claude Code, Astro, and GitHub Pages in an afternoon.
image: https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
category: Meta
tags:
  - astro
  - github-pages
  - claude-code
  - web-development
---

## Welcome to My Blog!

This is my first post, and fittingly, it's about how I built this very blog you're reading. I wanted to share the journey of setting up a modern software engineering blog using some interesting tools.

## The Stack

After some research and discussion, I landed on this tech stack:

- **Astro** - A modern static site generator that's blazingly fast
- **Tailwind CSS** - Utility-first CSS framework for styling
- **AstroWind** - A beautiful, feature-rich Astro theme
- **GitHub Pages** - Free hosting with custom domain support
- **Claude Code** - An AI coding assistant that helped me set everything up

## Why These Choices?

### Astro over Jekyll/Hugo/Next.js

I chose Astro for a few key reasons:

1. **Speed** - Astro ships zero JavaScript by default, only loading it when needed
2. **Flexibility** - I can use React components when I want interactivity
3. **Content-focused** - Built specifically for content sites like blogs
4. **Modern DX** - Great developer experience with TypeScript, MDX support, and hot reload

While Hugo is faster at build time and Jekyll is the default for GitHub Pages, Astro hit the sweet spot of simplicity and power.

### GitHub Pages

GitHub Pages was a no-brainer for hosting:

- **Free** - No hosting costs
- **Custom domain support** - www.patrady.com works perfectly
- **GitHub Actions** - Easy CI/CD integration
- **Reliable** - GitHub's infrastructure is solid

## The Build Process

Here's what it took to go from zero to deployed:

### 1. Initial Setup

We started with the AstroWind template, which gave us:

- A beautiful, responsive design out of the box
- Dark mode support (respects system preferences)
- Blog listing and individual post pages
- SEO optimization with meta tags and sitemaps
- Syntax highlighting for code blocks

### 2. GitHub Pages Configuration

Setting up GitHub Pages with a custom domain involved:

1. Creating a GitHub Actions workflow for deployment
2. Adding a CNAME file with my custom domain
3. Configuring DNS with my domain registrar (Squarespace)
4. Setting up the custom domain in GitHub Pages settings

The trickiest part was making sure GitHub used our Astro build workflow instead of trying to build with Jekyll (the default). We solved this by:

- Adding a `.nojekyll` file
- Changing the GitHub Pages source to "GitHub Actions"

### 3. Domain Configuration

DNS setup with Squarespace was straightforward:

- CNAME record: `www` → `patrady.github.io`
- Domain forwarding: `patrady.com` → `www.patrady.com` (301 redirect)

After DNS propagation (~10 minutes), the site was live!

## Features Out of the Box

The AstroWind template came with impressive features:

- ✅ Responsive design
- ✅ Dark mode
- ✅ Reading time estimates
- ✅ Tag and category filtering
- ✅ RSS feed generation
- ✅ Syntax highlighting
- ✅ Image optimization
- ✅ SEO-friendly URLs

## What's Next?

Now that the foundation is in place, here's what I'm planning:

1. **Add search functionality** - Probably using Pagefind for static search
2. **Customize the design** - Remove template content and make it more personal
3. **Set up analytics** - Privacy-focused analytics with Plausible or Umami
4. **Write actual content** - Technical deep dives, tutorials, and learnings
5. **Add interactive demos** - Leverage Astro's support for React components

## Reflections

Building this blog was surprisingly smooth. The combination of modern tools (Astro, Tailwind) with AI assistance (Claude Code) made what could have been a multi-day project into an afternoon of work.

The hardest parts weren't technical - they were decision-making:

- Which static site generator?
- Which theme?
- How to structure content?

Once those decisions were made, execution was straightforward.

## Try It Yourself

If you're thinking about starting a blog, I highly recommend this stack:

1. Start with [AstroWind](https://github.com/onwidget/astrowind)
2. Deploy to GitHub Pages (it's free!)
3. Add a custom domain (optional but professional)
4. Start writing!

The whole setup is [open source on GitHub](https://github.com/patrady/blog-engineering) if you want to see how it's built.

---

Thanks for reading my first post! I'm excited to start sharing more technical content soon. Follow along for posts about web development, system design, and software engineering best practices.
