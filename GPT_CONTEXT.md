# GPT Context: Frontend Rapid Prototyping Repository

This document provides a comprehensive context window for AI assistants (like GPTs) to understand the Frontend Rapid Prototyping Repository project. It details the project's current state, technological stack, feature set, and underlying architectural patterns to enable effective assistance with development tasks, debugging, or planning.

---

## Project Name: Fanta Frontend (github.com/danetroup/fanta-frontend)

**Project Goal:** To establish a robust, scalable, and highly customizable frontend boilerplate for rapid prototyping and application development. The project aims to provide a comprehensive, theme-aware UI component library and a solid architectural foundation, enabling quick iteration and deployment of user interfaces for various projects.

**Current State & Architecture:**
The project exists as a public GitHub repository, serving as a **boilerplate starter kit**. This current iteration is a fully functional **frontend-only application** designed to be cloned/forked by developers to kickstart new projects. It's built with the intention of eventually having its core reusable components extracted into a separate, updatable NPM package, though that extraction is not yet complete.

**Key Technologies:**
* **Framework:** React (latest stable version, used with Hooks)
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v3 (utility-first, configured for class-based theming)
* **CSS Preprocessor:** Sass (Dart Sass) - used for overriding third-party library styles.
* **Routing:** React Router DOM (v6)
* **Data Grid:** AG Grid (themable via Sass variable overrides)
* **Charting Library:** Recharts (themable via dynamic prop styling)
* **External UI Libraries Integrated:** `react-select` (for Multi-Select), `react-datepicker` (for Date Picker)

**Core Features & Components Developed:**

1.  **Comprehensive Theming System:**
    * **Mechanism:** Class-based theme toggling (e.g., `light`, `dark`, `corporate`, `midnight` classes on `<html>`).
    * **Implementation:** `ThemeContext` and `useTheme` hook for global state. Theme preference persists in `localStorage`.
    * **Styling:** Uses CSS variables (`--app-primary-color`, `--app-text-color`, etc.) defined within theme classes in `src/styles/themes.css`. Tailwind's `tailwind.config.js` maps utility classes (e.g., `bg-primary`) to these variables.
    * **Overrides:** Custom Sass files (`_ag-custom-theme.scss`, `_custom-datepicker-theme.scss`) are used to override default styles of third-party libraries (AG Grid, React Datepicker) using our theme's CSS variables, ensuring consistent theming across all UI elements.

2.  **Core UI Components (`src/components/ui`):** All components are written in TypeScript and are theme-aware.
    * `Button.tsx`: Versatile button component (primary, secondary, danger, outline variants; sm, md, lg sizes; disabled states).
    * `Input.tsx`: Standard text input field.
    * `Card.tsx`: Generic container component.
    * `Modal.tsx`: Basic, reusable dialog modal.
    * `Select.tsx`: Standard dropdown select component.
    * `Checkbox.tsx`: Checkbox input.
    * `Radio.tsx`: Radio button input.
    * `Tooltip.tsx`: Basic tooltip on hover.
    * `Menu.tsx` / `MenuItem.tsx`: Dropdown menu for navigation/actions.
    * `List.tsx` / `ListItem.tsx`: Unordered and ordered list components.
    * `DefinitionList.tsx` / `DefinitionTerm.tsx` / `DefinitionDescription.tsx`: Definition list components.
    * `Drawer.tsx`: Sliding sidebar/drawer component (from left, right, top, bottom positions, with animation via CSS transforms and controlled mounting).
    * `ComboBox.tsx`: Autocomplete/searchable select component (basic in-memory filtering).
    * `MultiSelect.tsx`: Multi-selection dropdown using `react-select` (custom styles applied).
    * `DatePicker.tsx`: Date selection component using `react-datepicker` (custom styles applied).

3.  **Form & File Upload Components (`src/components/forms`):**
    * `FormTemplate.tsx`: A versatile component for building dynamic forms based on a `fields` array, leveraging existing UI inputs.
    * `FileUpload.tsx`: Drag-and-drop file upload component with browse functionality.

4.  **Data Visualization Components (`src/components/data`):**
    * `DataTable.tsx`: Wrapper component for AG Grid, demonstrating advanced features (filtering, sorting, pagination, custom cell renderers) and deep theming.
    * `BarChart.tsx`: Wrapper for Recharts Bar Chart.
    * `LineChart.tsx`: Wrapper for Recharts Line Chart.

5.  **Utilities & Hooks (`src/hooks`):**
    * `useDataFetch.ts`: Custom hook for simulating API calls with loading and error states.
    * `mockData.ts`: Various mock datasets for development.

6.  **Layouts & Example Pages (`src/layouts`, `src/pages`):**
    * `DefaultLayout.tsx`: Primary application layout (header, main content, footer) with integrated theme switcher and navigation links.
    * `Dashboard.tsx`: Example application overview page.
    * `DataGridPage.tsx`: Dedicated page for advanced AG Grid features.
    * `ChartsPage.tsx`: Dedicated page showcasing various Recharts charts.
    * `Styleguide.tsx`: Comprehensive visual showcase and interactive playground for all UI components and styling.
    * `LibraryOverviewPage.tsx`: Documentation page listing core technologies and integrated external libraries with links.

**Development Journey Notes (Common Debugging Patterns):**
* **TypeScript Strictness:** `verbatimModuleSyntax` is enabled, requiring `import type { TypeName }...` for all type-only imports.
* **CSS Variable Cascade:** Challenges ensuring custom CSS variables (defined per theme class on `<html>`) correctly override default values or library styles. This often required specific selectors (e.g., `html.dark .ag-theme-quartz`) and ensuring correct `rgb()`/`rgba()` syntax for values.
* **Sass Module Resolution:** Initial difficulties with `@import` paths for `node_modules` in Sass were resolved by careful path specification and `vite.config.ts` `includePaths` configuration.
* **Component Animation:** Drawer animation required careful management of `shouldRender` state, `requestAnimationFrame`, and `setTimeout(..., 0)` to ensure visible "in" transitions.
* **Third-Party Library Integration:** Required adapting to specific library APIs for theming (e.g., `react-select`'s `StylesConfig`, `react-datepicker`'s `popperClassName` and custom Sass overrides).

**Future Context:**
The project is open source (MIT License) on GitHub, intended to be used as a starter template (`git clone` or "Use this template" feature). The long-term plan involves potentially extracting the reusable components into a separately published private NPM package for easier updates in consuming projects.