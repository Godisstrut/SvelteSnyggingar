import { MM_ROOT, MM_API_KEY } from '$env/static/private';

export async function load( { fetch } ) {
    const artists = ['drake', 'rihanna', 'eminem', 'beyonce', 'kanye west', 'taylor swift', 'linkin park', 'backstreet boys'];

    const getRandomArtist = () => {
        const artistsCopy = [...artists];
        const randomArtists = [];

        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * artistsCopy.length);

        randomArtists.push(artistsCopy.splice(randomIndex, 1)[0]);
        }
        console.log("random:", randomArtists)
        return randomArtists;
    };

    const artist = getRandomArtist();

    const fetchTracks = async () => {
        try {
            const trackIds = {};
            for (let i = 0; i < artist.length; i++) {
                const res = await fetch(`${process.env.MM_ROOT}track.search?q_artist=${encodeURIComponent(artist[i])}&f_has_lyrics&page_size=3&s_track_rating=desc&apikey=${process.env.MM_API_KEY}`)
                console.log(artist[i])
                const data = await res.json();
                // console.log("Data:", data.message.body.track_list[0].track.track_name)
                trackIds[artist[i]] = data.message.body.track_list.map(track => track.track.track_id);
            }
            return trackIds;
        } catch (error) {
            console.log('Error fetching', error);
        }
    };

    const fetchLyrics = async () => {
        while (true) {
            try {
                const trackIds = await fetchTracks()
                console.log("trackIds:", trackIds)
                const randomIndex = Math.floor(Math.random() * trackIds.length);
                const randomNumber = trackIds[randomIndex];

                const resLyrics = await fetch(`${process.env.MM_ROOT}track.lyrics.get?track_id=${randomNumber}&apikey=${process.env.MM_API_KEY}`)
                const lyricsData = await resLyrics.json()
                // console.log("lyricsData: ", lyricsData)
                if (!lyricsData.message.body || !lyricsData.message.body.lyrics || !lyricsData.message.body.lyrics.lyrics_body || lyricsData.message.header.status_code === 404) {
                    console.log("Hittade inga lyrics, kör igen");
                    continue;
                } else {
                    const lyricsBody = lyricsData.message.body.lyrics.lyrics_body

                    const paragraphs = lyricsBody.split('\n\n');
                    const firstParagraph = paragraphs[0].trim();
                    // console.log("firstParagraph:", firstParagraph)
                    return firstParagraph;
                };
            } catch (error) {
                console.error('Error fetching lyrics', error);
            }
        }
    };

	return {
        lyrics: await fetchLyrics(),
        artist: artist
	}
}