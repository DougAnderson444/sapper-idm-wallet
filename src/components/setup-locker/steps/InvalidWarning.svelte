<script>
  export let validation;
  if (validation.error) console.error(error);
</script>

<style>
  div.warn {
    margin: 1em;
  }
</style>

{#if validation.error}
    <div class="warn">
      <span>⛔️ Passphrase is not strong enough ⛔️</span>
      {#if validation.warning}
        <div>
          <h4>Warning ⚠️</h4>
          <div>{validation.warning.message}</div>
        </div>
      {/if}
      {#if validation.suggestions && validation.suggestions.length > 0}
        <div>
          <h4>Suggestions 📖</h4>
          {#each validation.suggestions as suggestion, i}
            <li>{i + 1}: {suggestion.message}</li>
          {/each}
        </div>
      {/if}
    </div>
{/if}
