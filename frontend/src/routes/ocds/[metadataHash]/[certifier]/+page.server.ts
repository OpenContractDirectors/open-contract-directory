import { loadRegistry } from '$lib/loadRegistry';
import { loadMetadata } from '$lib/loadMetadata';
import { registryClient } from '$lib/clients';
import { certifier } from '$lib/ContractGrid.svelte';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const registry = await loadRegistry(registryClient);
  const metadata = await loadMetadata(fetch);

  return {
    registry: registry.toPojo(),
    allMetadata: metadata,
    metadataHash: params.metadataHash,
    certifier: params.certifier,
  };
}
