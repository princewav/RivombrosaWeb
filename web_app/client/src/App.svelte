<script>
  import Header from './components/Header.svelte';
  import Tier from './components/Tier.svelte';
  import { post, items } from './utils';
  // let tiers = {};
  let tiers = {};

  async function getTiers() {
    tiers = await (await fetch('/get_tiers')).json();
  }
</script>

<div>
  <Header />
  <div class="container">
    <div class="main-btn-container">
      <button class="btn btn-light" on:click={getTiers}>TIERS!</button>
    </div>
    {#each items(tiers) as [country, tierData]}
      {#if tierData.tier_1.length || tierData.tier_2.length || tierData.tier_3.length}
        <Tier {country} {tierData} />
        <br />
      {/if}
    {/each}
  </div>
</div>

<style>
  .main-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 20px;
  }
</style>
