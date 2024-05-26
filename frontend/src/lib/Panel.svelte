<script>
  export let id;
  export let name;
  export let metadataHash;
  export let certifier;
</script>

<a
  href="/ocds/{metadataHash}/{certifier}"
  class:pointer-events-none={id === null}
  class="inline-block panel-link"
>
  <div class="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
    <h2 class="text-2xl font-bold mb-4">{name}</h2>
    <p>OCD #{id}</p>
  </div>
</a>
