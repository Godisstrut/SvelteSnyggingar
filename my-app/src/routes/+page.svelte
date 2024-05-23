<script>
    import Header from "../components/Header.svelte"
    import Musixmatch from "../components/Musixmatch.svelte";
    import Navigation from "../components/Navigation.svelte";

    export let data;
    console.log("data:", data)
    const { lyrics } = data
    console.log("lyrics:", lyrics)
</script>

<main>
    <Header />
    <Navigation />
    <Musixmatch />
    <p>{lyrics}</p>
    <!-- {#each tracks as track}
        <h1>{track[0]}</h1>
    {/each} -->
</main>