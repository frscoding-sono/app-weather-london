<script lang="ts">
  import { weatherData } from './store';
  import WeatherCard from './WeatherCard.svelte';
</script>

<div class="display-container">
  {#if $weatherData}
    <WeatherCard />
  {:else}
    <p class="info-text">Enter a city to see the weather.</p>
  {/if}
</div>

<style>
  .display-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .info-text {
    color: #ccc;
    font-size: 1.2rem;
  }
</style>
