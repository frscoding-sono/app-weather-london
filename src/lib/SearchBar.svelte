<script lang="ts">
  import { city } from "./store";
  let currentCity: string = "";

  function handleSearch() {
    if (currentCity.trim()) {
      city.set(currentCity.trim());
      currentCity = ""; // Clear input after search
    }
  }
</script>

<div class="search-container">
  <input
    type="text"
    bind:value={currentCity}
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
    placeholder="Enter City Designation..."
    class="search-input"
  />
  <button on:click={handleSearch} class="search-button">ANALYZE</button>
</div>

<style>
  .search-container {
    display: flex;
    width: 100%;
    max-width: 500px;
    border-radius: 50px;
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    box-shadow: 5px 5px 10px #111, -5px -5px 10px #333;
  }

  .search-input {
    flex-grow: 1;
    border: none;
    background: transparent;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    color: var(--color-text);
    border-radius: 50px 0 0 50px;
    outline: none;
  }

  .search-input::placeholder {
    color: rgba(245, 245, 245, 0.5);
  }

  .search-button {
    border: none;
    border-radius: 0 50px 50px 0;
    background-color: var(--color-primary);
    color: #1a1a1a;
    font-family: var(--font-family-heading);
    font-size: 1rem;
    font-weight: bold;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
      0 0 10px var(--color-primary),
      inset 0 0 5px rgba(255, 255, 255, 0.5);
  }

  .search-button:hover {
    background-color: var(--color-accent);
    color: #1a1a1a;
    box-shadow: 
      0 0 20px var(--color-accent),
      inset 0 0 10px rgba(255, 255, 255, 0.7);
    transform: scale(1.05);
  }
</style>
