<script>
  export let country;
  export let tierData;
  const codiciPaesi = {
    inghilterra: 'gb',
    italia: 'it',
    spagna: 'es',
    portogallo: 'pt',
    russia: 'ru'
  };

  $: srcFlag = `https://www.countryflags.io/${codiciPaesi[country]}/flat/64.png`;
</script>

<div>
  <h2>
    <img src={srcFlag} alt="flag" />
    {country}
  </h2>
  <div class="table">
    <div class="table-head grid">
      <p>Evento</p>
      <p>Esito</p>
      <p>Quota</p>
      <p>Coeff.</p>
      <p>Stake</p>
    </div>
    {#each ['tier_1', 'tier_2', 'tier_3'] as tier, i}
      <div class="tier">
        {#each tierData[tier] as match}
          <div class:grey={match.outcome == 'X'} class="row grid">
            <p>{match.match}</p>
            <p>{match.outcome}</p>
            <p>{match.marathon}</p>
            <p>
              <b class:alert={match.coeff > 2}>{match.coeff}</b>
            </p>
            <p>€ {match.stake}</p>
          </div>
        {:else}
          <div class="row grid">
            <p />
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style type="text/scss">
  h2 {
    text-transform: uppercase;
    font-size: 1.5em;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  h2 {
    text-align: center;
  }
  h2 img {
    margin-right: 10px;
    width: 1.2em;
    height: 1.2em;
  }
  .btn-check {
    color: white;
    background: #44cfcab9;
    font-size: 1.4em;
    padding: 0;
    background: none;
    width: 100%;
    margin: 0;
    transition: background 0.3s ease;

    &:hover {
      background: rgb(18, 170, 92);
    }
    &:active {
      background: rgb(11, 124, 90);
    }
  }
  .grey {
    color: rgb(199, 199, 199);
  }
  .alert {
    color: rgb(187, 0, 0) !important;
  }
  .table {
    text-align: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .table-head {
    margin-bottom: 1em;
    box-shadow: 1px 2px 3px #00000047;
    p {
      margin: 2px;
      background: #224870;
      // border-radius: 5px;
      color: white;
      padding: 0.5em;
    }
    p:first-child {
      grid-column: span 5;
    }
  }
  .row {
    color: white;
    margin-bottom: 0.3em;
    background: #4ea6d963;
    p:first-child {
      background: #00000010;
      grid-column: span 5;
      font-size: 1.1em;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.4em;
    }
  }
  .tier {
    margin-bottom: 1.2em;
    box-shadow: 1px 2px 3px #00000048;
  }
</style>
