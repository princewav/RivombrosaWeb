<script>
  import Tiers from './components/Tiers/Tiers.svelte';
  import History from './components/History/History.svelte';

  let activePage = 'tiers';
</script>

<div>
  <header>
    <h2>SHINNY PORK SOCIETY</h2>
    <div class="links">
      <ul>
        <li
          on:click={() => {
            activePage = 'tiers';
          }}>
          Tiers
        </li>
        <li
          on:click={() => {
            activePage = 'history';
          }}>
          Storico
        </li>
      </ul>
    </div>
  </header>

  <div class="container">
    {#if activePage == 'tiers'}
      <Tiers />
    {:else if activePage == 'history'}
      <History />
    {/if}
  </div>
</div>

<style type="text/scss">
  header {
    padding: 10px;
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f5f5f5;
    margin-bottom: 0.4em;
  }
  .links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: fit-content;
    margin-right: 30px;
    height: 100%;

    ul {
      height: 100%;
      display: flex;
      li {
        cursor: pointer;
        transition: all ease 0.3s;
        color: black;
        text-decoration: none;
        list-style-type: none;
        margin-right: 20px;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
</style>
