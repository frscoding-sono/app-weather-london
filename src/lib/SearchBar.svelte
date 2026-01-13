<script lang="ts">
  import { city } from './store';

  let localCity: string = '';

  function handleSearch() {
    if (localCity.trim()) {
      city.set(localCity.trim());
      localCity = ''; // Clear input after search
    }
  }
</script>

<div class="search-bar">
  <input 
    type="text" 
    bind:value={localCity} 
    placeholder="Enter a city"
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
  />
  <button on:click={handleSearch}>Search</button>
</div>

<style>
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 500px;
  }

  input {
    flex-grow: 1;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 2rem 0 0 2rem;
    outline: none;
    transition: border-color 0.2s;
  }

  input:focus {
    border-color: #007bff;
  }

  button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 0 2rem 2rem 0;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
