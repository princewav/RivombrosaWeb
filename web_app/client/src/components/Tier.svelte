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

<div class="tier">
  <h2>
    <img src={srcFlag} alt="flag" />
    {country}
  </h2>
  <table>
    <tr class="table-head">
      <th>Evento</th>
      <th>Esito</th>
      <th>Quota</th>
      <th>Coefficiente</th>
      <th>Stake</th>
      <th>Gioca</th>
    </tr>
    {#each ['tier_1', 'tier_2', 'tier_3'] as tier, i}
      <tr class="tier-row">
        <th colspan="6">Tier {i + 1}</th>
      </tr>
      {#each tierData[tier] as match}
        <tr>
          <td>{match.match}</td>
          <td>{match.outcome}</td>
          <td>{match.marathon}</td>
          <td>{match.coeff}</td>
          <td>
            <b>€ {match.stake}</b>
          </td>
          <td>
            <button class="btn btn-check">✓</button>
          </td>
        </tr>
      {:else}
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td />
        </tr>
      {/each}
    {/each}
  </table>
</div>

<style>
  h2 {
    text-transform: uppercase;
    font-size: 2em;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    text-align: center;
  }
  h2 img {
    margin-right: 10px;
    width: 1.5em;
    height: 1.5em;
  }
  table {
    width: 100%;
    text-align: center;
  }
  th,
  td {
    padding: 7px;
    border: rgb(241, 241, 241) solid 1px;
    border-radius: 5px;
  }
  tr:not(:first-child):not(.tier-row) {
    transition: background ease 0.3s;
  }
  tr:not(:first-child):not(.tier-row):hover {
    background: rgb(248, 248, 248);
  }
  .tier-row {
    text-transform: uppercase;
    background: rgb(236, 248, 255);
  }
  .table-head {
    background: #197eb5;
    color: white;
  }
  .btn-check {
    color: white;
    background: rgb(27, 220, 119);
    font-size: 1.4em;
    padding: 0.1em 0.7em;
    margin: 0;
    transition: background 0.3s ease;
  }
  .btn-check:hover {
    background: rgb(18, 170, 92);
  }
  .btn-check:active {
    background: rgb(11, 124, 90);
  }
</style>
