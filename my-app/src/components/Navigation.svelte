<script>
    import Button from "./Button.svelte"
    import TextInfo from "./TextInfo.svelte";
</script>

<nav class="flex justify-center mt-5 pt-20 gap-20 ">
    <Button props="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">TriviaGuessr</Button>
    <Button props="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">LyricGuessr</Button>
</nav>

<p class="flex justify-center mt-5 gap-20 ">
    <TextInfo props="text-sky-400 font-bold  "> Lite info om Trivia</TextInfo>
    <TextInfo props="text-sky-400 font-bold ">Lite info om Lyrics</TextInfo>
</p>

