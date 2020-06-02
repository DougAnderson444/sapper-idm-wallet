<script>
  import TopAppBar, {Row, Section, Title, FixedAdjust, DenseFixedAdjust, ProminentFixedAdjust, ShortFixedAdjust}  from "@smui/top-app-bar";
  import IconButton from '@smui/icon-button';

  let dense = false;
  let prominent = false;
  let variant = "standard";
  let collapsed = false;
  let title = "Standard";

  variant = "short";
  collapsed = true;
  title = "Short";

</script>
<style>
  :global(app, body, html) {
    display: block !important;
    height: auto !important;
    width: auto !important;
    position: static !important;
  }
</style>
<TopAppBar {dense} {prominent} {variant} bind:collapsed>
  <Row>
    <Section>
      <IconButton class="material-icons">menu</IconButton>
      <Title>{title}</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton class="material-icons" aria-label="Download">file_download</IconButton>
      {#if variant !== 'short'}
        <IconButton class="material-icons" aria-label="Print this page">print</IconButton>
        <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>
      {/if}
    </Section>
  </Row>
</TopAppBar>