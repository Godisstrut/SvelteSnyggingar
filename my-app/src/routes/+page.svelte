<script>
    import Header from "../components/Header.svelte";
    import Musixmatch from "../components/Musixmatch.svelte";
    import Navigation from "../components/Navigation.svelte";
    import Button from "../components/Button.svelte";

    export let data;
    const { lyrics, artists } = data; 
</script>

<main>
    <Header />
    <Navigation />
    <Musixmatch {lyrics} {artists} />
</main>
