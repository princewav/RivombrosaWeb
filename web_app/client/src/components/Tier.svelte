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
    <tr>
      <th>Evento</th>
      <th>Esito</th>
      <th>Quota</th>
      <th>Coefficiente</th>
      <th>Stake</th>
    </tr>
    {#each ['tier_1', 'tier_2', 'tier_3'] as tier, i}
      <tr class="tier-row">
        <th colspan="5">Tier {i + 1}</th>
      </tr>
      {#each tierData[tier] as match}
        <tr>
          <td>{match.match}</td>
          <td>{match.outcome}</td>
          <td>{match.marathon}</td>
          <td>{match.coeff}</td>
          <td>{match.stake}</td>
        </tr>
      {:else}
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
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
  tr:not(:first-child):hover {
    background: rgb(237, 251, 255);
  }
  .tier-row {
    text-transform: uppercase;
    background: rgb(236, 248, 255);
  }
</style>
