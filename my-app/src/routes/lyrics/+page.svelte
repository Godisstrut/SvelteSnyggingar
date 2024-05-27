<script>
    import Musixmatch from "../../components/Musixmatch.svelte";
    export let data;
    const { lyrics, artists } = data; 
    console.log(lyrics)
</script>

<Musixmatch {lyrics} {artists} />
