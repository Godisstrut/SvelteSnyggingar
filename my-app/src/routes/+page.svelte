<script>
    import Header from "../components/Header.svelte"
    import Musixmatch from "../components/Musixmatch.svelte";
    import Navigation from "../components/Navigation.svelte";

    export let data;
    const { tracks } = data

    console.log(data)
</script>

<main>
    <Header />
    <Navigation />
    <Musixmatch />
    <h1>{tracks.track_id}</h1>
    <!-- {#each tracks as track}
        <h1>{track[0]}</h1>
    {/each} -->
</main>