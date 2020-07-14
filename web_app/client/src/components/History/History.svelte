<script>
  import { onMount } from 'svelte';

    let bets = [];
  // let bets = [
  //   {
  //     odd: 2.45,
  //     success: null,
  //     coeff: 1.593,
  //     outcome: '2',
  //     id: 7,
  //     esps: 0.78,
  //     match: 'Norwich - Burnley',
  //     date_played: '14 Lug 2020',
  //     tier: 'tier_0',
  //     stake: 18,
  //     league: 'inghilterra'
  //   },
  //   {
  //     odd: 1.8,
  //     success: null,
  //     coeff: 0.785,
  //     outcome: '1',
  //     id: 6,
  //     esps: 0.283,
  //     match: 'Juventus - Lazio',
  //     date_played: '14 Lug 2020',
  //     tier: 'tier_2',
  //     stake: 12,
  //     league: 'italia'
  //   },
  //   {
  //     odd: 1.53,
  //     success: null,
  //     coeff: 1.011,
  //     outcome: '1',
  //     id: 5,
  //     esps: 0.309,
  //     match: 'Wolves - Crystal Palace',
  //     date_played: '14 Lug 2020',
  //     tier: 'tier_1',
  //     stake: 18,
  //     league: 'inghilterra'
  //   },
  //   {
  //     odd: 4.2,
  //     success: null,
  //     coeff: 0.754,
  //     outcome: '1',
  //     id: 4,
  //     esps: 0.634,
  //     match: 'Arsenal - Liverpool',
  //     date_played: '14 Lug 2020',
  //     tier: 'tier_2',
  //     stake: 6,
  //     league: 'inghilterra'
  //   },
  //   {
  //     odd: 1.8,
  //     success: null,
  //     coeff: 0.785,
  //     outcome: '1',
  //     id: 3,
  //     esps: 0.283,
  //     match: 'Juventus - Lazio',
  //     date_played: '14 Lug 2020',
  //     tier: 'tier_2',
  //     stake: 12,
  //     league: 'italia'
  //   },
  //   {
  //     odd: 3.98,
  //     success: null,
  //     coeff: 1.622,
  //     outcome: 'X',
  //     id: 2,
  //     esps: 1.291,
  //     match: 'Fiorentina - Torino',
  //     date_played: '14 Lug 2020',
  //     tier: 'tier_0',
  //     stake: 14,
  //     league: 'italia'
  //   },
  //   {
  //     odd: 2.45,
  //     success: null,
  //     coeff: 1.624,
  //     outcome: '2',
  //     id: 1,
  //     esps: 0.796,
  //     match: 'Norwich - Burnley',
  //     date_played: '14 Lug 2020',
  //     tier: 'tier_0',
  //     stake: 18,
  //     league: 'inghilterra'
  //   }
  // ];

  //   onMount(async () => {
  //     const res = await fetch('/load_bets');
  //     bets = await res.json();
  //   });
</script>

<div class="container">
  <div class="table">
    <div class="table-head grid">
      <p>ID</p>
      <p>Data giocata</p>
      <p>Evento</p>
      <p>Esito</p>
      <p>Quota</p>
      <p>Coeff.</p>
      <p>ESPS</p>
      <p>Stake</p>
      <p>Vinta</p>
    </div>
    {#each bets as bet}
      <div class="row grid">
        <p>{bet.id}</p>
        <p>{bet.date_played}</p>
        <p>{bet.match}</p>
        <p>{bet.outcome}</p>
        <p>{bet.odd}</p>
        <p>{bet.coeff}</p>
        <p>{bet.esps}</p>
        <p>€ {bet.stake}</p>
        <p>{'?'}</p>
      </div>
    {/each}
  </div>
</div>

<style type="text/scss">
  $black: #1f1f1f;
  $red: #a63d40;
  $green: #90a959;
  $blue: #6494aa;
  $yellow: #e9b872;
  .table {
    max-width: 900px;
    margin: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: 34px 130px 1fr 60px 60px 60px 60px 60px 80px;
  }
  .table-head {
    text-align: center;
    margin-bottom: 0.3em;
    p {
      box-shadow: 1px 2px 3px #00000023;
      margin: 2px;
      background: $black;
      color: white;
      padding: 0.5em;
    }
  }
  .row {
    margin-bottom: 0.3em;
    p {
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.4em;
      background: #e0e0e0;
    }
  }
  .tier {
    margin-bottom: 1.2em;
    box-shadow: 1px 2px 3px #00000048;
  }
</style>
