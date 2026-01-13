<script lang="ts">
  import SearchBar from "./lib/SearchBar.svelte";
  import WeatherDisplay from "./lib/WeatherDisplay.svelte";
</script>

<main class="app-container">
  <header>
    <h1>Svelte Weather</h1>
  </header>

  <div class="content">
    <SearchBar />
    <WeatherDisplay />
  </div>
</main>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem 1rem;
    width: 100%;
    max-width: 900px; /* Adjust max-width as needed */
    margin: 0 auto;
  }

  header {
    text-align: center;
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    color: #f0f0f0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .app-container {
      padding: 1rem;
      gap: 1.5rem;
    }

    h1 {
      font-size: clamp(2rem, 8vw, 2.5rem);
    }
  }
</style>