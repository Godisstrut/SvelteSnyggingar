<script>
    import Header from "../components/Header.svelte";
    import Musixmatch from "../components/Musixmatch.svelte";
    import Navigation from "../components/Navigation.svelte";
    import Button from "../components/Button.svelte";

    export let data;
    const { lyrics, artist } = data; // Changed to 'artists' to reflect the array of artist names
    console.log(artist);
    let guess = "";
    let currentIndex = 0; // Initialize the current index

    const compareGuess = () => {
        console.log('Button clicked'); // Debug log to check if the function is triggered
        const currentArtist = artist[currentIndex].trim().toLowerCase();
        if (guess.trim().toLowerCase() === currentArtist) {
            alert('Rätt');
        } else {
            alert('Fel');
        }
        guess = ""; // Clear the input field
        currentIndex++; // Move to the next lyric

        if (currentIndex >= lyrics.length) {
            currentIndex = 0; // Restart from the beginning if at the end
            alert('You have finished all the lyrics!');
        }
    };
</script>

<main>
    <Header />
    <Navigation />
    <Musixmatch />
    {#if lyrics.length > 0}
        <p>{lyrics[currentIndex]}</p>
    {/if}
    <input type="text" placeholder="Skriv artist" bind:value={guess} />
    <button on:click={compareGuess}>Skicka</button> <!-- Fixa button componenten istället -->
</main>
