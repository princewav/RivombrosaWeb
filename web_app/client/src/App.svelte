<script>
  import Tier from './components/Tier.svelte';
  import { post, items, isEmpty } from './utils';
  const backupTiers = {
    portogallo: {
      tier_1: [],
      tier_2: [],
      tier_3: []
    },
    spagna: {
      tier_1: [],
      tier_2: [],
      tier_3: [
        {
          match: 'Valencia - Espanyol',
          outcome: '1',
          date: '16 Lug 21:00',
          marathon: 1.6,
          pinnacle: 1.546,
          coeff: 0.781,
          stake: 14,
          esps: 0.25
        },
        {
          match: 'Athletic Bilbao - Leganes',
          outcome: '1',
          date: '16 Lug 21:00',
          marathon: 1.86,
          pinnacle: 1.787,
          coeff: 0.874,
          stake: 12,
          esps: 0.325
        }
      ]
    },
    italia: {
      tier_1: [
        {
          match: 'Parma - Sampdoria',
          outcome: '1',
          date: '19 Lug 17:15',
          marathon: 2.83,
          pinnacle: 2.46,
          coeff: 4.174,
          stake: 42,
          esps: 2.363
        }
      ],
      tier_2: [
        {
          match: 'Milan - Bologna',
          outcome: '1',
          date: '18 Lug 21:45',
          marathon: 1.63,
          pinnacle: 1.565,
          coeff: 1.128,
          stake: 18,
          esps: 0.368
        },
        {
          match: 'Fiorentina - Torino',
          outcome: 'X',
          date: '19 Lug 19:30',
          marathon: 4,
          pinnacle: 3.71,
          coeff: 1.009,
          stake: 8,
          esps: 0.807
        }
      ],
      tier_3: [
        {
          match: 'SPAL - Inter',
          outcome: '2',
          date: '16 Lug 21:45',
          marathon: 1.4,
          pinnacle: 1.355,
          coeff: 0.859,
          stake: 20,
          esps: 0.24
        },
        {
          match: 'Roma - Verona',
          outcome: '1',
          date: '15 Lug 21:45',
          marathon: 1.69,
          pinnacle: 1.625,
          coeff: 0.971,
          stake: 16,
          esps: 0.328
        },
        {
          match: 'Lecce - Fiorentina',
          outcome: '1',
          date: '15 Lug 21:45',
          marathon: 3.88,
          pinnacle: 3.63,
          coeff: 0.782,
          stake: 6,
          esps: 0.607
        },
        {
          match: 'Roma - Inter',
          outcome: 'X',
          date: '19 Lug 21:45',
          marathon: 3.96,
          pinnacle: 3.68,
          coeff: 0.845,
          stake: 8,
          esps: 0.67
        }
      ]
    },
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
          date: '16 Lug 21:15',
          marathon: 5.7,
          pinnacle: 5.06,
          coeff: 1.286,
          stake: 10,
          esps: 1.466
        }
      ],
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
