<script lang="ts">
  import { weatherData } from "./store";
  import { onMount } from "svelte";

  let condition: string = "Clear";
  let isDay: boolean = true;

  weatherData.subscribe((data) => {
    if (data) {
      condition = data.weather[0].main;
      const timezone = data.timezone;
      const localTime = new Date(Date.now() + timezone * 1000);
      const hours = localTime.getUTCHours();
      isDay = hours > 6 && hours < 18;
    }
  });
</script>

<div class="futuristic-card">
  <div class="card-border"></div>
  <div class="card-content">
    {#if $weatherData}
      <div class="weather-icon">
        {#if condition === 'Clear'}
          {#if isDay}
            <div class="sun-glow"></div>
          {:else}
            <div class="moon-glow"></div>
          {/if}
        {:else if condition === 'Clouds'}
          <div class="cloud-base"></div>
        {:else if condition === 'Rain'}
          <div class="rain-drops"></div>
        {/if}
      </div>
      <div class="info">
        <h2 class="city">{$weatherData.name}</h2>
        <p class="temperature">{Math.round($weatherData.main.temp)}&deg;</p>
        <p class="description">{$weatherData.weather[0].description}</p>
      </div>
    {:else}
      <div class="loading-text">Awaiting Transmission...</div>
    {/if}
  </div>
</div>

<style>
  .futuristic-card {
    position: relative;
    width: 100%;
    max-width: 400px;
    aspect-ratio: 1 / 1.2;
    margin: 2rem auto;
    perspective: 1000px; /* For 3D effects */
  }

  .card-content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(30, 30, 30, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
    color: var(--color-text);
    transform-style: preserve-3d;
    transition: transform 0.5s;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .futuristic-card:hover .card-content {
    transform: rotateY(5deg) rotateX(5deg);
  }

  .card-border {
    position: absolute;
    top: -1px; left: -1px; right: -1px; bottom: -1px;
    border-radius: 20px;
    background: linear-gradient(45deg, var(--color-accent), var(--color-primary));
    filter: blur(5px);
    animation: pulseBorder 4s infinite;
    z-index: -1;
  }

  .info {
    padding: 1rem;
  }

  .city {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  .temperature {
    font-size: 5rem;
    font-weight: 700;
    font-family: var(--font-family-heading);
    text-shadow: 0 0 15px currentColor;
    margin: 0;
  }

  .description {
    font-size: 1.2rem;
    text-transform: capitalize;
  }

  .loading-text {
    font-size: 1.5rem;
    color: var(--color-accent);
  }

  /* Dynamic Icons */
  .weather-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
  }

  .sun-glow {
    width: 100px;
    height: 100px;
    background: var(--color-primary);
    border-radius: 50%;
    box-shadow: 0 0 50px var(--color-primary);
    animation: pulseSun 2s infinite;
  }

  .moon-glow {
    width: 80px;
    height: 80px;
    background: #f0f0f0;
    border-radius: 50%;
    box-shadow: 0 0 40px #f0f0f0;
  }

  .cloud-base {
    width: 120px;
    height: 70px;
    background: #ccc;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 20px #ccc;
    animation: drift 5s infinite linear alternate;
  }
  
  @keyframes pulseBorder {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.3; }
  }

  @keyframes pulseSun {
    0%, 100% { transform: scale(1); box-shadow: 0 0 50px var(--color-primary); }
    50% { transform: scale(1.1); box-shadow: 0 0 70px var(--color-primary); }
  }

  @keyframes drift {
    from { transform: translateX(-10px); }
    to { transform: translateX(10px); }
  }
</style>
