<script>
    import Musixmatch from "../../components/Musixmatch.svelte";
    export let data;
    const { lyrics, artists } = data; 
</script>

<Musixmatch {lyrics} {artists} />
