<script>
    import Header from "../components/Header.svelte"
    import Musixmatch from "../components/Musixmatch.svelte";
    import Navigation from "../components/Navigation.svelte";
    import Button from "../components/Button.svelte"

    export let data;
    // console.log("data:", data)
    const { lyrics, artist } = data
    // console.log("lyrics:", lyrics)
    // console.log("artist:", artist)

    let guess = "";

    const compareGuess = () => {
        if (guess.trim().toLowerCase() === artist) {
            alert('Rätt')
        } else {
            alert('Fel')
        }
    };
</script>

<main>
    <Header />
    <Navigation />
    <Musixmatch />
    <p>{lyrics}</p>
    <input type="text" placeholder={'Skriv artist'} bind:value={guess} />
    <button on:click={compareGuess}>Skicka</button> <!-- Fixa button componenten istället -->
</main>