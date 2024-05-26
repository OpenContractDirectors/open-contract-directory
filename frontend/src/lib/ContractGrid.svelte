<script lang="ts">
  export let contracts;
  export let allMetadata;
  export let certifier;

  import type { Contract } from './loadRegistry.ts';
  import Panel from './Panel.svelte';
  import { getContractName } from './registry';

  $: panels = contracts.map((contract: Contract) => {
    const name = getContractName(allMetadata, contract.metadataHash);
    return {
      id: contract.id,
      name: name || 'Unknown metadata',
      metadataHash: contract.metadataHash,
    };
  });
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8">
  {#if panels.length === 0}
    <Panel id={null} name="No certified contracts found" metadataHash={null} {certifier} />
  {/if}
  {#each panels as panel}
    <Panel id={panel.id} name={panel.name} metadataHash={panel.metadataHash} {certifier} />
  {/each}
</section>
