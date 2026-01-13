<script lang="ts">
  import { weatherData, weatherError, loading } from './store';
  import WeatherCard from './WeatherCard.svelte';

  let isDay = true;

  // This reactive block determines if it's day or night based on weather data
  $: {
    if ($weatherData) {
      const currentTime = new Date().getTime() / 1000;
      isDay = currentTime > $weatherData.sys.sunrise && currentTime < $weatherData.sys.sunset;
    }
  }
</script>

<div class="container">
  <!-- The background container is now part of WeatherDisplay -->
  <div class="background" class:is-day={isDay}>
    {#if !isDay}
      <div class="stars"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
    {/if}
  </div>

  <!-- The WeatherCard component is now used here -->
  <WeatherCard 
    weatherData={$weatherData} 
    weatherError={$weatherError} 
    loading={$loading} 
    isDay={isDay} 
  />
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .background {
    position: absolute;
    inset: 0;
    z-index: -1;
    transition: background-color 1s ease;
  }

  .is-day { 
    background: linear-gradient(to bottom, #87CEEB, #E0F2F1); 
  }
  
  .background:not(.is-day) { 
    background: linear-gradient(to bottom, #0f172a, #334155); 
  }

  /* --- Stars (moved from WeatherCard) --- */
  @function multiple-box-shadow($n) {
    $value: '#{random(2000)}px #{random(2000)}px #FFF';
    @for $i from 2 through $n {
      $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF';
    }
    @return unquote($value);
  }

  .stars, .stars2, .stars3 {
    position: absolute;
    top: 0; 
    left: 0;
    width: 1px; 
    height: 1px; 
    background: transparent;
    animation: animStar 50s linear infinite;
  }

  .stars { 
    box-shadow: multiple-box-shadow(700); 
  }

  .stars2 { 
    width: 2px; 
    height: 2px; 
    animation-duration: 100s; 
    box-shadow: multiple-box-shadow(200); 
  }

  .stars3 { 
    width: 3px; 
    height: 3px; 
    animation-duration: 150s; 
    box-shadow: multiple-box-shadow(100); 
  }

  @keyframes animStar {
    from { transform: translateY(0px); }
    to { transform: translateY(-2000px); }
  }
</style>
