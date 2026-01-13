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
    on:keydown={(e) => e.key === "Enter" && handleSearch()}
    placeholder="Enter a city name..."
    class="search-input"
  />
  <button on:click={handleSearch} class="search-button">Search</button>
</div>

<style>
  .search-container {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 500px; /* Consistent max-width */
    margin: 0 auto; /* Center the search bar */
  }

  .search-input {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    outline: none;
  }

  .search-input:focus {
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  .search-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 50px;
    background-color: #ff3e6c;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(255, 62, 108, 0.3);
  }

  .search-button:hover {
    background-color: #ff1a53;
    transform: translateY(-2px);
  }

  /* Media Query for smaller screens */
  @media (max-width: 480px) {
    .search-container {
      flex-direction: column;
      gap: 0.75rem;
    }

    .search-input,
    .search-button {
      width: 100%;
      border-radius: 25px; /* Slightly smaller radius for a sleeker look */
    }
  }
</style>
