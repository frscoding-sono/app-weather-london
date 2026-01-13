
import { writable, derived } from 'svelte/store';

// Get the API key from environment variables
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Initial state for the city
const initialCity = 'Seoul';
export const city = writable<string>(initialCity);

// Derived store for weather data
export const weatherData = derived(
  city,
  ($city, set) => {
    if (!$city) {
      set(null); // No city, no data
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${$city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        set(data);
      })
      .catch(error => {
        console.error("Failed to fetch weather data:", error);
        set(null); // Set to null on error
      });
  },
  null // Initial value
);
