# Blueprint: Weather App

## Overview

This project is a modern, stylish weather application built with Svelte and Vite. It provides real-time weather data for a searched city, featuring a dynamic and visually appealing user interface.

## Core Features & Design

*   **Framework:** Svelte with Vite
*   **Styling:** Tailwind CSS with a custom dark theme.
*   **Font:** 'Nanum Pen Script' for all text to create a unique, handwritten feel.
*   **API:** OpenWeatherMap API for fetching weather data.
*   **State Management:** Svelte stores for reactive state management across components.

### Implemented Design Elements

*   **Global Font:** Imported and applied 'Nanum Pen Script' globally.
*   **Dark Mode Background:** Set a default dark background (`#1a202c`) for the entire application.

## Current Task: Advanced Component Styling

**Objective:** Refactor the `WeatherDisplay.svelte` component to be a reusable, independent module with a sophisticated, 3D, and premium design.

**Plan:**

1.  **Create `blueprint.md`:** Establish this file to track project goals and changes. (Done)
2.  **Apply Glassmorphism:** Enhance the main component container with a frosted-glass effect using `backdrop-blur` and refined opacity.
3.  **Implement 3D Lift Effect:** Use multi-layered `box-shadow` to make the component appear to float above the background.
4.  **Add Dynamic Glow:** Create a weather-sensitive glow effect that emanates from the component, adding ambient light.
5.  **Enhance Typography:** Add `text-shadow` to improve readability and create a more premium feel.
6.  **Introduce Micro-interactions:** Add subtle hover and transition effects to interactive elements for a more engaging experience.
7.  **Ensure Component Independence:** Verify that the component is fully self-contained and relies only on Svelte stores for data, making it reusable.
