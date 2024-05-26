<script>
  import DeployButton from '$lib/DeployButton.svelte';
  import * as chains from 'viem/chains';

  export let deployments = [];

  function getChainName(chainID) {
    for (const key in chains) {
      console.log(chains[key]);
      if (chains[key].id === chainID) {
        return chains[key].name;
      }
    }
    return chainID.toString();
  }
</script>

<div>
  <h3 class="font-semibold mb-2">Deployments</h3>
  <ul class="list-disc list-inside mb-6">
    {#if deployments.length === 0}
      <p>No deployments certified.</p>
    {/if}
    {#each deployments as deployment}
      <li class="mb-1">{getChainName(deployment.chainID)}: {deployment.address}</li>
    {/each}
    <DeployButton />
  </ul>
</div>
