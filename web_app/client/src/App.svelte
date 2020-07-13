<script>
  import Tier from './components/Tier.svelte';
  import { post, items, isEmpty } from './utils';
  const backupTiers = {
    russia: {
      tier_1: [],
      tier_2: [],
      tier_3: []
    },
    inghilterra: {
      tier_1: [
        {
          match: 'Crystal Palace - Man United',
          outcome: 'X',
          coeff: 1.266,
          marathon: 5.1,
          stake: 2
        }
      ],
      tier_2: [
        {
          match: 'Newcastle - Tottenham',
          outcome: '1',
          coeff: 1.226,
          marathon: 5.45,
          stake: 2
        }
      ],
      tier_3: [
        {
          match: 'Norwich - West Ham',
          outcome: '2',
          coeff: 0.857,
          marathon: 2.1,
          stake: 9
        },
        {
          match: 'Aston Villa - Crystal Palace',
          outcome: '2',
          coeff: 0.925,
          marathon: 3.45,
          stake: 4
        },
        {
          match: 'Chelsea - Norwich',
          outcome: '1',
          coeff: 0.916,
          marathon: 1.21,
          stake: 47
        },
        {
          match: 'Everton - Aston Villa',
          outcome: '1',
          coeff: 0.936,
          marathon: 1.9,
          stake: 11
        },
        {
          match: 'West Ham - Watford',
          outcome: 'X',
          coeff: 0.837,
          marathon: 3.76,
          stake: 3
        }
      ]
    },
    italia: {
      tier_1: [
        {
          match: 'Juventus - Atalanta',
          outcome: '2',
          coeff: 1.399,
          marathon: 3.58,
          stake: 3
        }
      ],
      tier_2: [],
      tier_3: [
        {
          match: 'SPAL - Inter',
          outcome: 'X',
          coeff: 0.894,
          marathon: 5.3,
          stake: 2
        },
        {
          match: 'Cagliari - Lecce',
          outcome: 'X',
          coeff: 0.931,
          marathon: 4.15,
          stake: 3
        },
        {
          match: 'Genoa - SPAL',
          outcome: '2',
          coeff: 0.8,
          marathon: 5.7,
          stake: 2
        }
      ]
    },
    portogallo: {
      tier_1: [],
      tier_2: [],
      tier_3: []
    },
    spagna: {
      tier_1: [],
      tier_2: [],
      tier_3: []
    }
  };
  let tiers = {};
  // let tiers = backupTiers;
  let showTiers = false;

  async function getTiers() {
    tiers = await (await fetch('/get_tiers')).json();
    // tiers = backupTiers;
  }

  let username = '';
  let password = '';
  function login() {
    if (username == 'los puercos' && password == 'rivombrosa1') showTiers = true;
  }
</script>

<div>
  <div class="container">
    <div class="main-btn-container">
      <button class="btn btn-light" on:click={getTiers}>UPDATE TIERS</button>
    </div>
    {#each items(tiers) as [country, tierData]}
      {#if tierData.tier_1.length || tierData.tier_2.length || tierData.tier_3.length}
        <Tier {country} {tierData} />
        <br />
      {/if}
    {/each}
    {#if !isEmpty(items)}*: Quota Marathon (Quota Pinnacle){/if}
    <br />
    <br />
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
