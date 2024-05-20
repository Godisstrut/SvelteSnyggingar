<script>
    import { getConfig } from './config.js';

    let client_id;
    let client_secret;
    let access_token;

    getConfig().then(config => {
        client_id = config.client_id;
        client_secret = config.client_secret;
        access_token = config.access_token;
    });

    import { onMount } from 'svelte';

    let query = 'Kendrick Lamar';
    let results = [];

    const accessToken = access_token;

    const config = {
    client: {
        id: client_id,
        secret: client_secret
    },
    auth: {
        tokenHost: 'https://api.oauth.com'
    }
    };

    const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

    onMount(async () => {
        const response = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        results = data.response.hits;
    });
</script>

<style>
    .song {
        border: 1px solid #ddd;
        padding: 10px;
        margin: 10px 0;
    }
</style>

<div>
    <h1>LyricGuessr</h1>
    <ul>
        {#each results as { result }}
            <li class="song">
                <p><strong>{result.full_title}</strong></p>
                <p><a href={result.url} target="_blank" rel="noopener noreferrer">Genius</a></p>
            </li>
        {/each}
    </ul>
</div>