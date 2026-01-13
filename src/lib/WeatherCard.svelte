<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  // Props to receive data from the parent
  export let weatherData: any = null;
  export let weatherError: string | null = null;
  export let loading: boolean = false;
  export let isDay: boolean = true;

  // Icon mapping, excluding Clear and Clouds which have custom animations
  const weatherIcons = {
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Smoke: '🌫️',
    Haze: '🌫️',
    Dust: '🌫️',
    Fog: '🌫️',
  };

  let cardEl;
  function handleMouseMove(event) {
    if (!cardEl) return;
    const { clientX, clientY } = event;
    const { left, top, width, height } = cardEl.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    
    cardEl.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  function handleMouseLeave() {
    if (!cardEl) return;
    cardEl.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
  }
</script>

<div class="scene-wrapper">
  {#if loading}
    <div class="flex justify-center items-center h-full pt-20">
      <div class="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white/80"></div>
    </div>
  {/if}

  {#if weatherError}
    <div in:fly={{ y: 20 }} class="card-container">
      <div class="weather-card error-card">
          <p class="text-2xl font-bold">Error</p>
          <p class="mt-2">{weatherError}</p>
      </div>
    </div>
  {/if}

  {#if weatherData}
    {@const mainWeather = weatherData.weather[0].main}
    <div 
      in:fly={{ y: 50, duration: 800, delay: 200 }} 
      out:fade
      class="card-container"
      bind:this={cardEl}
      on:mousemove={handleMouseMove} 
      on:mouseleave={handleMouseLeave}
    >
      <div class="weather-card" class:day-theme={isDay} class:night-theme={!isDay}>
        <div class="content">
          <div class="text-center">
            <h2 class="text-5xl font-bold tracking-wider name-text-shadow">{weatherData.name}</h2>
            <p class="text-2xl capitalize">{weatherData.weather[0].description}</p>
          </div>
    
          <div class="my-8 text-center">
            <div class="icon-wrapper">
              {#if mainWeather === 'Clear'}
                {#if isDay}
                  <div class="animated-sun-icon"></div>
                {:else}
                  <div class="animated-moon-icon">
                    <div class="crater crater1"></div>
                    <div class="crater crater2"></div>
                    <div class="crater crater3"></div>
                  </div>
                {/if}
              {:else if mainWeather === 'Clouds'}
                <div class="animated-cloud-icon">
                  <div class="puff puff-1"></div>
                  <div class="puff puff-2"></div>
                  <div class="puff puff-3"></div>
                  <div class="puff puff-4"></div>
                  <div class="puff puff-5"></div>
                  <div class="puff puff-6"></div>
                </div>
              {:else}
                <span class="text-9xl inline-block transition-transform duration-300 hover:scale-110">{weatherIcons[mainWeather] || '🌍'}</span>
              {/if}
            </div>
            <p class="text-9xl font-black tracking-tighter temp-text-shadow">{Math.round(weatherData.main.temp)}<span class="text-7xl align-super opacity-80">°C</span></p>
          </div>
    
          <div class="grid grid-cols-3 gap-4 text-center text-xl">
            <div>
              <p class="font-bold">Feels Like</p>
              <p>{Math.round(weatherData.main.feels_like)}°</p>
            </div>
            <div>
              <p class="font-bold">Humidity</p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div>
              <p class="font-bold">Wind</p>
              <p>{weatherData.wind.speed.toFixed(1)} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .scene-wrapper {
    width: 100%;
    height: 100%;
    perspective: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-container {
    transition: transform 0.1s ease-out;
    transform-style: preserve-3d;
  }

  .weather-card {
    width: 380px;
    border-radius: 2rem;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
    transition: background 0.5s, color 0.5s, border 0.5s;
    transform: translateZ(20px);
    transform-style: preserve-3d;
  }

  .day-theme {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: #2c3e50;
  }

  .night-theme {
    background: rgba(23, 28, 44, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ecf0f1;
  }

  .error-card {
    background: rgba(192, 57, 43, 0.5);
    color: white;
    text-align: center;
  }
  
  .name-text-shadow { text-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); }
  .temp-text-shadow { text-shadow: 0 5px 25px rgba(0,0,0,0.15); }
  .night-theme .name-text-shadow, .night-theme .temp-text-shadow {
     text-shadow: 0 3px 20px rgba(0,0,0,0.3);
  }

  /* --- Icons --- */
  .icon-wrapper {
    height: 200px; 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  /* Nano Banana Cloud */
  .animated-cloud-icon {
    position: relative;
    width: 250px;
    height: 150px;
    filter: drop-shadow(0 10px 15px rgba(0,0,0,0.15));
  }

  .puff {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, #fefce8, #fef3c7); 
    box-shadow: inset 5px -5px 15px rgba(251, 191, 36, 0.2); 
    animation: drift 10s infinite ease-in-out;
  }

  .puff-1 { width: 100px; height: 100px; top: 50px; left: 50px; }
  .puff-2 { width: 120px; height: 120px; top: 10px; left: 90px; animation-delay: -2s; }
  .puff-3 { width: 90px; height: 90px; top: 60px; left: 150px; animation-delay: -4s; }
  .puff-4 { width: 80px; height: 80px; top: 20px; left: 30px; animation-delay: -6s; }
  .puff-5 { width: 70px; height: 70px; top: 80px; left: 20px; animation-delay: -8s; }
  .puff-6 { width: 60px; height: 60px; top: 10px; right: 20px; animation-delay: -1s; }

  @keyframes drift {
    0% { transform: translateX(0) translateY(0) rotate(0deg); }
    25% { transform: translateX(5px) translateY(-5px) rotate(2deg); }
    50% { transform: translateX(0) translateY(10px) rotate(0deg); }
    75% { transform: translateX(-5px) translateY(-5px) rotate(-2deg); }
    100% { transform: translateX(0) translateY(0) rotate(0deg); }
  }

  /* Sun */
  .animated-sun-icon {
    width: 140px; 
    height: 140px; 
    border-radius: 50%;
    background: radial-gradient(circle, #ffeb3b, #fdd835, #f57f17);
    box-shadow: 0 0 20px #fdd835, 0 0 40px #f57f17;
    position: relative;
    animation: sun-pulse 4s infinite ease-in-out;
  }
  .animated-sun-icon::before, .animated-sun-icon::after {
    content: '';
    position: absolute;
    top: -10px; left: -10px;
    width: 160px; height: 160px; 
    background: radial-gradient(circle, rgba(255,235,59,0.5) 0%, transparent 70%);
    border-radius: 50%;
    animation: sun-rays-rotate 10s linear infinite;
  }
  .animated-sun-icon::after {
    transform: scale(1.2);
    animation-delay: -5s;
    animation-duration: 20s;
  }

  @keyframes sun-pulse { 50% { transform: scale(1.05); } }
  @keyframes sun-rays-rotate { to { transform: rotate(360deg); } }

  /* Moon */
  .animated-moon-icon {
    width: 130px; 
    height: 130px; 
    border-radius: 50%;
    background-color: #e0e0e0;
    box-shadow:
      inset -20px -15px 20px rgba(0,0,0,0.2),
      inset 7px 7px 15px rgba(255,255,255,0.9),
      0 0 20px #b0bec5;
    position: relative;
    animation: moon-float 6s infinite ease-in-out;
  }

  .crater {
    position: absolute;
    border-radius: 50%;
    background: rgba(0,0,0,0.1);
    box-shadow: inset 2px 2px 3px rgba(0,0,0,0.3);
  }
  
  .crater1 { top: 28px; left: 14px; width: 35px; height: 35px; }
  .crater2 { top: 56px; right: 21px; width: 21px; height: 21px; }
  .crater3 { bottom: 21px; left: 42px; width: 28px; height: 28px; }

  @keyframes moon-float { 50% { transform: translateY(-10px); } }
</style>