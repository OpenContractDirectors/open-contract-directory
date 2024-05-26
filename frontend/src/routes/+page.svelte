<script lang="ts">
  export let data;

  import Header from '$lib/Header.svelte';
  import Manifesto from '$lib/Manifesto.svelte';
  import ContractGrid from '$lib/ContractGrid.svelte';
  import CertifierSelector from '$lib/CertifierSelector.svelte';
  import { getCertifiers, getCertifiedContracts } from '$lib/registry';

  let registry = data.registry;
  let certifiers = [null, ...getCertifiers(registry)];
  let selectedCertifier: string | null = null;

  $: certifiedContracts = getCertifiedContracts(registry, selectedCertifier || '');
</script>

<main class="container mx-auto p-4 pb-8">
  <Header />
  <Manifesto />
  <h1 class="text-3xl font-bold mb-2">Contracts</h1>
  <div class="flex justify-center">
    <CertifierSelector
      {certifiers}
      selected={null}
      onChange={(value) => (selectedCertifier = value)}
    />
  </div>
  {#if certifiedContracts.length === 0}
    <p class="text-center text-lg mt-4">No certified contracts found</p>
  {:else}
    <ContractGrid
      contracts={certifiedContracts}
      allMetadata={data.allMetadata}
      certifier={selectedCertifier}
    />
  {/if}
</main>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>
