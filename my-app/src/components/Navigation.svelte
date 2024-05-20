<script>
    import Button from "./Button.svelte"
    import TextInfo from "./TextInfo.svelte";
    import Modal from './Modal.svelte';
    import Content from "./Content.svelte";

</script>

<nav class="flex justify-center mt-5 pt-20 gap-20 ">
    <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded w-44 h-18">TriviaGuessr</Button>
    <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-6 px-8 rounded w-44 h-18">LyricGuessr</Button>
</nav>

<div class="flex justify-center mt-2 gap-20 ">
    <TextInfo class="text-sky-400 font-bold p-5 ">Klassiskt Trivia-spel</TextInfo>
    <TextInfo class="text-sky-400 font-bold p-5">Gissa låttext-spelet</TextInfo>
</div>

<Content />
<Modal />