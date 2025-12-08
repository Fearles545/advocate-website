# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

This is a modern Angular 20 website for a private lawyer specializing in pension law in Ukraine. The site features responsive design with Angular Material, SEO optimization with SSG (Static Site Generation), and an extensive blog system with Ukrainian legal content.

## Development Commands

### Core Commands
- `npm start` - Start development server at http://localhost:4200/
- `npm run start-local` - Start server accessible on local network (0.0.0.0)
- `npm run build` - Build the project for production
- `npm run build:ssg` - Build with SSG optimization (production configuration)
- `npm run preview` - Preview built site locally on port 8080
- `npm run deploy` - Trigger GitHub Actions deployment workflow
- `ng test` - Run unit tests with Karma

### Code Quality
- ESLint and Prettier are configured for code quality
- TypeScript strict mode is enabled
- No specific lint/typecheck commands found - use standard Angular CLI tooling

## Architecture Overview

### Tech Stack
- **Angular 20** with standalone components (no NgModules)
- **Angular Material** for UI components
- **ng-gallery** for image displays
- **SSG (Static Site Generation)** for performance
- **Express** for server-side rendering

### Project Structure
- `src/app/` - Main application code with standalone components
- `src/app/core/` - Core services, directives, and shared utilities
- `src/app/blog/` - Blog system with extensive Ukrainian pension law content
- `src/assets/` - Static assets including images, icons, and documents

### Key Components
- **Main sections**: Main, About Me, Services, Documents, Contacts, Blog
- **Blog system**: Comprehensive blog with HTML posts, SEO metadata files (.seo.ts), and navigation
- **Responsive design**: Mobile-first approach with Angular CDK BreakpointObserver
- **SEO service**: Route-based SEO optimization with meta tags and titles

### Development Principles (from .github/copilot-instructions.md)
- **Standalone components only** - no NgModules
- **Mobile-first responsive design** using flexbox/grid with %, vw/vh, rem units
- **Accessibility focused** with semantic HTML and ARIA attributes
- **SEO optimized** with proper meta tags and semantic markup
- **Angular Material preferred** for UI components
- **Modern TypeScript** with strict mode

### Blog System
- Located in `src/app/blog/`
- HTML posts in `src/app/blog/blog-posts/posts/`
- Each post has corresponding `.seo.ts` file for metadata
- Lazy-loaded blog routes
- Social sharing components
- Blog pagination service
- Ukrainian content focused on pension law

### Asset Management
- Images optimized as WebP format
- External dependencies listed in angular.json
- Separate folders for icons, logos, documents, and service icons
- Assets copied to `posts/` and root directory during build

## Important Notes

- All components use standalone architecture
- Website content is in Ukrainian
- Focus on pension law and legal services
- Production build includes prerendering for SSG
- GitHub Actions deployment configured via `npm run deploy`