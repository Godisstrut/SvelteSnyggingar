<script>
    import Button from "./Button.svelte"
    import TextInfo from "./TextInfo.svelte";
</script>

<nav class="flex justify-center mt-5 pt-20 gap-20 ">
    <Button props="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded w-44 h-18">TriviaGuessr</Button>
    <Button props="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-8 rounded w-44 h-18">LyricGuessr</Button>
</nav>

<p class="flex justify-center mt-2 gap-20 ">
    <TextInfo props="text-sky-400 font-bold p-5 ">Klassiskt Trivia-spel</TextInfo>
    <TextInfo props="text-sky-400 font-bold p-5">Gissa låttext-spelet</TextInfo>
</p>