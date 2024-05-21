<script>
    //import { getConfig } from './config.js';
   // import { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } from "simple-oauth2";
   import { getLyrics, getSong } from 'genius-lyrics-api';

    let client_id = "hInz4RKeI9-8TCY7-Le0d16c5nb4tO_jAc4whoKjxYdxAJf5Q1HR6IG7K_ma3_0E"
    let client_secret = "qAjXlPKcfAmhrasofnH5Ze_46xoRiYznbUCPGxWnQK6Z0Q0MAIBhfYvIAU1A-daEHPmpfLLClMp_Q_v77jZw_w";
    let access_token = "64pHJESFmSJZgbzRp8d7awJ621BlVDanghJ1_8mDe8geUYGn8fe3SYTJFL-vVCDP";

    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';



    /* getConfig().then(config => {
        client_id = config.client_id;
        client_secret = config.client_secret;
        access_token = config.access_token;
    }); */

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

    //const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');
    

    onMount(async () => {
        const options = {
            apiKey: '64pHJESFmSJZgbzRp8d7awJ621BlVDanghJ1_8mDe8geUYGn8fe3SYTJFL-vVCDP',
            title: 'Posthumous Forgiveness',
            artist: 'Tame Impala',
            optimizeQuery: true
        };

        getLyrics(options).then((lyrics) => console.log(lyrics));

        getSong(options).then((song) =>
            console.log(`${song.id} - ${song.title} - ${song.url} - ${song.albumArt} - ${song.lyrics}`)
        );
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