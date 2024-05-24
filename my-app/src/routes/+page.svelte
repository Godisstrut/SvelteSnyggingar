<script>
    import Header from "../components/Header.svelte";
    import Musixmatch from "../components/Musixmatch.svelte";
    import Navigation from "../components/Navigation.svelte";
    import Trivia from "../components/Trivia.svelte";
    import Footer from "../components/Footer.svelte";

    export let data;
    const { lyrics, artists } = data; 
</script>

<main>
    <Header />
    <Navigation />
    <Musixmatch {lyrics} {artists} />
    <Trivia />
    <Footer />
</main>
