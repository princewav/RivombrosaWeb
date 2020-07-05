<div class="header">
  <h1>SHINNY PORK SOCIETY</h1>
  <div class="links">
    <div class="item">Link 1</div>
    <div class="item">Link 2</div>
    <div class="item">Link 3</div>
  </div>
</div>

<style>
  .header {
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
    width: 30%;
  }
  .links .item {
    cursor: pointer;
    transition: transform ease 0.3s;
  }
  .links .item:hover {
    transform: scale(1.1);
  }

  h1 {
    font-size: 1.6em;
  }
</style>
