<script lang="ts">
  import SearchBar from "./lib/SearchBar.svelte";
  import WeatherDisplay from "./lib/WeatherDisplay.svelte";
</script>

<div class="nanobanana-app">
  <header class="app-header">
    <h1>NANO WEATHER</h1>
    <p>Cybernetic Climate Control</p>
  </header>

  <main class="main-content">
    <SearchBar />
    <WeatherDisplay />
  </main>

  <footer class="app-footer">
    <p>Powered by Svelte & Nanobanana Tech</p>
  </footer>
</div>

<style>
  .nanobanana-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: calc(100vh - 4rem); /* Full height minus padding */
    gap: 2rem;
  }

  .app-header {
    text-align: center;
    animation: fadeInDown 1s ease-out;
  }

  .app-header h1 {
    font-size: clamp(3rem, 10vw, 5rem);
    margin: 0;
    color: var(--color-primary);
    letter-spacing: 0.1em;
  }

  .app-header p {
    font-size: 1rem;
    color: var(--color-accent);
    margin: 0;
    text-transform: uppercase;
  }

  .main-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .app-footer {
    font-size: 0.8rem;
    color: var(--color-text);
    opacity: 0.6;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
