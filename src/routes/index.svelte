<script>
  import Button, { Label } from "@smui/button";
  import { Icon } from "@smui/common";
</script>

<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
  .vert {
    margin: 1em;
  }

  .hero {
    margin: 3rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: #525252;
    width: 100%;
  }

  .title {
    margin: 0;
    width: 100%;
    padding-top: 20px;
    line-height: 1.15;
    font-size: 48px;
  }
  .title,
  .description {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }
  .col {
    max-width: 880px;
    margin: 80px auto 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .row {
    max-width: 880px;
    margin: 80px auto 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .card {
    padding: 18px 18px 24px;
    width: 220px;
    text-align: left;
    text-decoration: none;
    color: #32ba46;
    border: 1px solid #9b9b9b;
  }
  .card:hover {
    border-color: #32ba46;
  }
  .card h3 {
    margin: 0;
    color: #32ba46;
    font-size: 18px;
  }
  .card p {
    margin: 0;
    padding: 12px 0 0;
    font-size: 13px;
    color: #333;
  }
</style>

<svelte:head>
  <title>PeerPiper.io</title>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
</svelte:head>

<div class="hero">
  <center>
    <img
      alt="PeerPiper.io logo"
      width="150"
      height="150"
      layout="fixed"
      class="logo"
      src="p-150x150.png" />
  </center>
  <h1 class="title">PeerPiper.io</h1>
  <p class="description">
    Your ultimate personal data sink. Save once, pipe out to your selected peer
    groups.
  </p>

  <p>
    Your place to manage your own digital footprint, that doesn't depend on
    Facebook or Google -- just your electricty and internet connection. 100%
    Owned and stored by you.
  </p>
  <p>Try it out!</p>

  <!-- on:click={async() => (await goto('/app'))}  -->
  <center>
    <div class="vert">
      <Button rel=prefetch href="app" variant="raised">
        <Icon class="material-icons">launch</Icon>
        <Label>LAUNCH PEERPIPER</Label>
        <Icon class="material-icons">launch</Icon>
      </Button>
    </div>

  </center>
  <div class="row">
    <div class="col">
      <a
        href="https://mailchi.mp/fa2bf49dfc8b/peerpiper"
        target="_blank"
        class="card">
        <h3>PeerPiper Portfolio &rarr;</h3>
        <p>
          Verify all your resume experience, skills, personality, anything
          really.
        </p>
      </a>
    </div>
    <div class="col">
      <a
        href="https://mailchi.mp/fa2bf49dfc8b/peerpiper"
        target="_blank"
        class="card">
        <h3>PeerPiper Pad &rarr;</h3>
        <p>Stream out your address, never miss mail again.</p>
      </a>
    </div>
    <div class="col">
      <a
        href="https://mailchi.mp/fa2bf49dfc8b/peerpiper"
        target="_blank"
        class="card">
        <h3>PeerPiper Pulse &rarr;</h3>
        <p>Stream out your availability, never miss a meeting again.</p>
      </a>
    </div>
  </div>
</div>
