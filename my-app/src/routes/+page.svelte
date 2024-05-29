<script>
    import { gameIds } from '../stores.js';
    import { onMount } from 'svelte';

    onMount(() => {
        const storedGameIds = JSON.parse(localStorage?.getItem('gameIds') || '[]');
        gameIds.set(storedGameIds);
    } )

    function updateStorage() {
        gameIds.update(ids => {
            const newId = ids.length + 1;
            const newIds = [...ids, newId];
            localStorage?.setItem('gameIds', JSON.stringify(newIds));
            return newIds;
        });
    }
</script>

<div class="flex flex-col items-center mt-4">
    <h1 class="text-xl font-bold mb-4">Results from Musixmatch</h1>
    <button on:click={updateStorage}>Add Game ID</button>
    <ul>
        {#each $gameIds as gameId}
            <li>{gameId}</li>
        {/each}
    </ul>
</div>
