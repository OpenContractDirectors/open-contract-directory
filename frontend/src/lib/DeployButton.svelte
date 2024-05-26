<script>
  let buttonText = 'Deploy';
</script>

<button
  class="bg-red-200 hover:bg-red-200 font-bold py-2 w-32 rounded m-2 cursor-default"
  on:mouseenter={() => (buttonText = 'Coming Soon')}
  on:mouseleave={() => (buttonText = 'Deploy')}
>
  {buttonText}
</button>
