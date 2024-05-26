<script>
  let buttonText = 'Deploy';
</script>

<button
  class="bg-gray-300 hover:bg-gray-300 font-bold py-2 w-32 rounded m-2 cursor-default"
  on:mouseenter={() => (buttonText = 'Coming Soon')}
  on:mouseleave={() => (buttonText = 'Deploy')}
>
  {buttonText}
</button>
