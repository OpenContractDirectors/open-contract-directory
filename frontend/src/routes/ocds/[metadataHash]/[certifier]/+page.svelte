<script lang="ts">
  export let data;

  import Header from '$lib/Header.svelte';
  import Manifesto from '$lib/Manifesto.svelte';
  import DeploymentsSection from '$lib/DeploymentsSection.svelte';
  import FrontendsSection from '$lib/FrontendsSection.svelte';
  import { getContractID, getCertifiedFrontends, getDeployments } from '$lib/registry';

  let registry = data.registry;
  let metadata = data.allMetadata[data.metadataHash];
  let certifier = data.certifier;

  let contractID = getContractID(registry, data.metadataHash);

  function getDescription(metadata) {
    const output = metadata.data.output;
    const userdocTitle = output.userdoc.title;
    const userdocNotice = output.userdoc.notice;
    const devdocTitle = output.devdoc.title;
    const devdocNotice = output.devdoc.notice;

    const title = userdocTitle || devdocTitle || '';
    const body =
      userdocNotice ||
      devdocNotice ||
      "The contract's metadata file does not contain a description.";
    return title + (title ? ': ' : '') + body;
  }

  $: name = metadata.name.slice(0, -5);
  $: description = getDescription(metadata);
  $: deployments = getDeployments(registry, contractID);
  $: frontends = getCertifiedFrontends(registry, contractID, certifier);
</script>

<main class="container mx-auto p-4">
  <Header />
  <Manifesto />
  <h1 class="text-3xl font-bold mb-4">OCD #{contractID}: {name}</h1>
  <div class="flex flex-col gap-4">
    <p class="text-gray-600 mb-6">{description || 'No description available.'}</p>
    <FrontendsSection {frontends} />
    <DeploymentsSection {deployments} />
  </div>
</main>
