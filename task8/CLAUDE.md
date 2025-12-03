
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

The following development commands are identified:

*   **Installation:** `yarn`
*   **Start Local Development Server:** `yarn start` (executes `docusaurus start`)
*   **Build Static Content:** `yarn build` (executes `docusaurus build`)
*   **Deploy Website:**
    *   Using SSH: `USE_SSH=true yarn deploy` (executes `docusaurus deploy`)
    *   Not using SSH: `GIT_USER=<Your GitHub username> yarn deploy` (executes `docusaurus deploy`)
*   **Swizzle (eject/customize Docusaurus components):** `yarn swizzle` (executes `docusaurus swizzle`)
*   **Clear Build Artifacts:** `yarn clear` (executes `docusaurus clear`)
*   **Serve Build Output:** `yarn serve` (executes `docusaurus serve`)
*   **Write Translations:** `yarn write-translations` (executes `docusaurus write-translations`)
*   **Write Heading IDs:** `yarn write-heading-ids` (executes `docusaurus write-heading-ids`)
*   **Type Check:** `yarn typecheck` (executes `tsc`)

## High-Level Code Architecture

The codebase is structured as a Docusaurus-based static website, primarily utilizing TypeScript, React, Markdown, and MDX.

**Root Level:**

*   `package.json`: Manages project dependencies and defines various scripts for development and deployment.
*   `README.md`: Provides a general overview of the project and initial setup instructions.
*   `docusaurus.config.ts`: The main configuration file for the Docusaurus site, controlling site metadata, plugins, themes, and other global settings.
*   `sidebars.ts`: Configures the navigation structure for the documentation sections.
*   `tsconfig.json`: TypeScript compiler configuration.
*   `node_modules/`: Contains installed Node.js packages and their dependencies.

**`src/` Directory:**

This directory houses the custom components, pages, and styling for the Docusaurus website.

*   **`components/`:** Contains reusable React components.
    *   `HomepageFeatures/index.tsx`: A TypeScript React component, likely for displaying features on the homepage.
    *   `HomepageFeatures/styles.module.css`: CSS Modules for styling the `HomepageFeatures` component.
*   **`css/`:** Contains global or shared CSS files.
    *   `custom.css`: Custom global CSS styles applied to the website.
*   **`pages/`:** Contains React components that serve as individual pages.
    *   `index.tsx`: The main React component for the website's homepage.
    *   `index.module.css`: CSS Modules for styling the homepage component.

**`blog/` Directory:**

This directory is dedicated to blog posts and related assets.

*   Contains example Markdown and MDX blog posts.
*   `authors.yml`: Configuration file for blog post authors.
*   `tags.yml`: Configuration file for blog post tags.

**`docs/` Directory:**

This directory contains the website's documentation.

*   `intro.md`: An introductory Markdown document for the documentation section.
*   **`tutorial-basics/`:** A subdirectory for basic tutorial documents.
*   **`tutorial-extras/`:** A subdirectory for additional tutorial documents.

**`static/` Directory:**

This directory serves static assets directly.

*   Contains images such as `img/favicon.ico`, `img/logo.svg`, and `img/docusaurus-social-card.jpg`, as referenced in `docusaurus.config.ts`.