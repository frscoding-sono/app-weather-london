import { writable, derived } from 'svelte/store';

// --- Types ---
export interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// --- Stores ---
export const city = writable('London');
export const loading = writable(false);
export const weatherData = writable<WeatherData | null>(null);
export const weatherError = writable<string | null>(null);

// --- API Key ---
const apiKey = '77ff7c57ccd64bdf5ad4598b7010c068';

// --- Derived Store for API calls ---
export const triggerSearch = derived(city, ($city, set) => {
  if ($city) {
    set($city);
  }
});

triggerSearch.subscribe(async ($city) => {
  if (!$city) return;

  loading.set(true);
  weatherError.set(null);
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${$city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "City not found");
    }
    const data: WeatherData = await response.json();
    weatherData.set(data);
  } catch (err) {
    if (err instanceof Error) {
        weatherError.set(err.message);
    }
    weatherData.set(null);
  } finally {
    loading.set(false);
  }
});
