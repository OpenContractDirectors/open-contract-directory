<script>
  export let frontends = [];
</script>

<div class="mb-6">
  <h3 class="font-semibold mb-2">Frontends</h3>
  <ul class="list-disc list-inside">
    {#if frontends.length === 0}
      <p>No frontends certified.</p>
    {/if}
    {#each frontends as frontend}
      <li>ipfs://{frontend.ipfsHash}</li>
    {/each}
  </ul>
</div>
