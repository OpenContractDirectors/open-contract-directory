import { loadRegistry } from '$lib/loadRegistry';
import { loadMetadata } from '$lib/loadMetadata';
import { registryClient } from '$lib/clients';

export async function load({ fetch }) {
  const registry = await loadRegistry(registryClient);
  const metadata = await loadMetadata(fetch);
  console.log(registry);

  return {
    registry: registry.toPojo(),
    allMetadata: metadata,
  };
}
