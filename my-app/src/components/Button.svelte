<script>
    export let props = ""; // Skapar en tom props variabel för att redigera komponenten när den används
</script>

<button class={props}>
    <slot />
</button>