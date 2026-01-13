<script lang="ts">
  import { weatherData } from "./store";
  import { onMount } from "svelte";

  let isDay: boolean = true;
  let condition: string = "Clear";

  weatherData.subscribe((data) => {
    if (data) {
      const timezone = data.timezone; // Timezone offset in seconds
      const localTime = new Date(Date.now() + timezone * 1000);
      const hours = localTime.getUTCHours();
      isDay = hours > 6 && hours < 18;
      condition = data.weather[0].main;
    }
  });
</script>

<div class="weather-card" class:day={isDay} class:night={!isDay}>
  {#if $weatherData}
    <div class="weather-info">
      <div class="city-name">{$weatherData.name}, {$weatherData.sys.country}</div>
      <div class="temperature">{Math.round($weatherData.main.temp)}&deg;C</div>
      <div class="condition-text">{$weatherData.weather[0].description}</div>
    </div>

    <!-- Animated Icons -->
    {#if condition === "Clear"}
      {#if isDay}
        <div class="sun"></div>
      {:else}
        <div class="moon"></div>
        <div class="stars"></div>
      {/if}
    {:else if condition === "Clouds"}
      <div class="cloud"></div>
      <div class="cloud layer2"></div>
    {/if}
  {:else}
    <div class="loading">Loading...</div>
  {/if}
</div>

<style>
  .weather-card {
    position: relative;
    width: 100%;
    max-width: 400px; /* Max-width for responsiveness */
    aspect-ratio: 1 / 1; /* Maintain a square-like shape */
    border-radius: 30px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 auto; /* Center the card */
    transition: background-color 0.8s ease, color 0.8s ease;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  .day {
    background: linear-gradient(135deg, #87ceeb, #a8e0ff);
    color: #333;
  }

  .night {
    background: linear-gradient(135deg, #1c2a4d, #3e5a8a);
    color: #f0f0f0;
  }

  .weather-info {
    text-align: center;
    z-index: 2;
  }

  .city-name {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 600;
  }

  .temperature {
    font-size: clamp(4rem, 12vw, 6rem);
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .condition-text {
    font-size: clamp(1rem, 3vw, 1.25rem);
    text-transform: capitalize;
  }

  .loading {
    font-size: 1.5rem;
    color: #fff;
  }

  /* Animations */
  .sun, .moon, .cloud {
    position: absolute;
    z-index: 1;
    transition: all 0.5s ease;
  }

  /* Sun */
  .sun {
    width: clamp(80px, 20vw, 120px);
    height: clamp(80px, 20vw, 120px);
    background-color: #ffdd00;
    border-radius: 50%;
    box-shadow: 0 0 30px #ffdd00;
    animation: rotate 20s linear infinite, pulse 2s infinite ease-in-out;
    top: 15%;
    right: 15%;
  }

  /* Moon */
  .moon {
    width: clamp(70px, 18vw, 100px);
    height: clamp(70px, 18vw, 100px);
    background-color: #f0f0f0;
    border-radius: 50%;
    box-shadow: 0 0 25px #f0f0f0;
    animation: rotate 30s linear infinite;
    top: 20%;
    right: 20%;
  }

  /* Stars */
  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    animation: star-field 60s linear infinite;
  }

  /* Cloud */
  .cloud {
    width: clamp(120px, 30vw, 180px);
    height: clamp(50px, 12vw, 70px);
    background: #fff;
    border-radius: 50px;
    top: 30%;
    left: -50%;
    animation: drift 50s linear infinite alternate;
  }

  .cloud.layer2 {
    top: 40%;
    transform: scale(0.8);
    animation-delay: -10s;
    animation-duration: 60s;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 30px #ffdd00; }
    50% { box-shadow: 0 0 50px #ffdd00; }
  }

  @keyframes star-field {
    from { background-position: 0 0; }
    to { background-position: -10000px 5000px; }
  }

  @keyframes drift {
    from { left: -50%; }
    to { left: 100%; }
  }

  /* Media Query for smaller screens */
  @media (max-width: 480px) {
    .weather-card {
      padding: 1.5rem;
      border-radius: 20px;
    }

    .city-name {
        font-size: clamp(1rem, 5vw, 1.2rem);
    }

    .temperature {
        font-size: clamp(3rem, 15vw, 4rem);
    }
  }

</style>
