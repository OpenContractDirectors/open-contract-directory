<script lang="ts">
  export let certifiers: (string | null)[];
  export let selected: string | null;
  export let onChange: (value: string) => void;

  function handleSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    onChange(select.value);
  }
</script>

<div class="p-4 flex items-center gap-3">
  <div><span class="mb-2 text-lg">Pick a certifier you trust:</span></div>

  <select
    class="border bg-red-200 p-2 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    on:change={handleSelect}
    bind:value={selected}
  >
    {#each certifiers as certifier}
      <option value={certifier}>{certifier || 'None'}</option>
    {/each}
  </select>
</div>
