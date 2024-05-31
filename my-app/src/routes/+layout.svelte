<script>
    import "../app.css";
    import Button from "../components/Button.svelte";
</script>
<main>
    <header data-sveltekit-reload>
        <h1 class=" text-3xl font-extrabold font-bold p-10 bg-cyan-100 text-4xl text-center text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"><a href="/">Geniusguessr</a></span></h1>
    </header>

    <nav class="flex justify-center mt-5 pt-10 gap-3 md:gap-20" >
        <a href="/lyrics" data-sveltekit-preload-data="hover" class="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded">LyricsGuessr</a>
        <a href="/trivia" data-sveltekit-preload-data="hover" class="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded">TriviaGuessr</a>
    </nav>

    <slot />

    <footer class="w-full bg-cyan-100 fixed bottom-0">
        <h1 class="text-xl font-bold text-center text-gray-900 dark:text-white"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-300">Made in 2024</span></h1>
    </footer>
</main>