<script>
    import Button from "./Button.svelte"

    function reloadPage() {
        location.reload();
    }
</script>


<nav class="flex justify-center mt-5 pt-10 gap-20 ">
    <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded" on:click={reloadPage}>TriviaGuessr</Button>
    <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded">LyricGuessr</Button>
</nav>