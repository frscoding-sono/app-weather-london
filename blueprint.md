
# Svelte Weather App Blueprint

## 1. Overview

A simple, elegant, and reactive weather application built with Svelte, Vite, and TypeScript. It allows users to search for a city and view the current weather conditions with a dynamically changing, animated interface that reflects the time of day and weather.

## 2. Features & Design

### Core Functionality
- **City Search:** Users can input a city name to fetch weather data.
- **Dynamic Weather Display:** The interface updates to show the current weather, including temperature, conditions (clear, clouds, etc.), city name, and country.
- **API Integration:** Fetches data from the OpenWeatherMap API.
- **Centralized State Management:** Uses Svelte stores (`store.ts`) to manage application state, including the current city, weather data, loading status, and errors. The API call is automatically triggered when the city changes.

### Visual Design & Animations
- **Day/Night Themes:** The background and component styles dynamically switch between a light blue/day theme and a dark blue/night theme based on the fetched weather data.
- **Animated Background:** A subtle, animated starfield appears during the night theme.
- **Animated Weather Icons:** The weather card displays animated icons:
    - **Sun:** A rotating sun with a pulsing glow for clear day conditions.
    - **Moon:** A gently rotating moon for clear night conditions.
    - **Clouds:** Drifting, layered clouds for cloudy conditions.

### Component Architecture
- `App.svelte`: The main application component.
- `WeatherDisplay.svelte`: Orchestrates the main view, including the background and the `WeatherCard`.
- `WeatherCard.svelte`: The central UI element that displays all weather information and animations.
- `SearchBar.svelte`: The user input component for searching a city.

---

## 3. Current Task: Implement Responsive Design

### Goal
To ensure the application is fully responsive and provides an excellent user experience on all screen sizes, from mobile phones to desktops.

### Action Plan
1.  **`app.css`:**
    - Add global styles to ensure a consistent and flexible base layout.
    - Use `box-sizing: border-box` for more intuitive layout calculations.

2.  **`App.svelte`:**
    - Modify the main container to use a responsive layout that centers content and adapts to viewport changes.

3.  **`WeatherCard.svelte`:**
    - Change the fixed `width` and `height` of the card to use `max-width` and responsive units.
    - Use media queries (`@media`) to adjust font sizes, padding, and the scale of animated elements (like clouds) on smaller screens.
    - Ensure the internal layout of the card (temperature, city name, etc.) reflows gracefully.

4.  **`SearchBar.svelte`:**
    - Adjust the styles to ensure the search input and button are well-proportioned and easy to use on mobile devices.
