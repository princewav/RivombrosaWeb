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
      <p>Evento (Data)</p>
      <p>Esito</p>
      <p>Quota*</p>
      <p>Coeff.</p>
      <p>Stake</p>
    </div>
    {#each ['tier_1', 'tier_2', 'tier_3'] as tier, i}
      <div class="tier">
        {#each tierData[tier] as match}
          <div class:tie={match.outcome == 'X'} class="row grid {tier}">
            <p>{match.match} ({match.date})</p>
            <p>{match.outcome}</p>
            <p>{match.marathon} ({match.pinnacle})</p>
            <p>
              <b class:alert={match.coeff > 2}>{match.coeff}</b>
            </p>
            <p>€ {match.stake}</p>
          </div>
        {:else}
          <div class="row grid {tier}">
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
  $black: #1f1f1f;
  $red: #a63d40;
  $green: #90a959;
  $blue: #6494aa;
  $yellow: #e9b872;

  h2 {
    text-transform: uppercase;
    font-size: 1.5em;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $black;
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
  .alert {
    color: rgb(80, 7, 7) !important;
  }
  .table {
    margin: auto;
    max-width: 600px;
    text-align: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .table-head {
    margin-bottom: 0.3em;
    p {
      box-shadow: 1px 2px 3px #00000023;
      margin: 2px;
      background: $black;
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
    p:first-child {
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

  .tier_1 p {
    background: $red;
  }
  .tier_2 p {
    background: $green;
  }
  .tier_3 p {
    background: $blue;
  }
  .tier_1.tie p:not(:first-child) {
    background: #a63d40a4;
  }
  .tier_2.tie p:not(:first-child) {
    background: #90a959c2;
  }
  .tier_3.tie p:not(:first-child) {
    background: #6494aaa4;
  }

  @media only screen and (min-width: 1200px) {
    .table {
      margin: auto;
      max-width: 90%;
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
    .table-head {
      p:first-child {
        grid-column: span 2;
      }
    }
    .row {
      p:first-child {
        grid-column: span 2;
      }
    }
    .tier_1.tie p {
      background: #a63d40a4;
    }
    .tier_2.tie p {
      background: #90a959c2;
    }
    .tier_3.tie p {
      background: #6494aaa4;
    }
  }
</style>
