import { MM_ROOT, MM_API_KEY } from '$env/static/private';

export async function load( { fetch } ) {
    const artists = ['drake', 'rihanna', 'eminem', 'beyonce', 'kanye west'];

    const getRandomArtist = () => {
        const randomIndex = Math.floor(Math.random() * artists.length);
        return artists[randomIndex];
    };

    const fetchTracks = async () => {
        try {
            const artist = getRandomArtist();
            const res = await fetch(`${process.env.MM_ROOT}track.search?q_artist=${encodeURIComponent(artist)}&f_has_lyrics&page_size=3&s_track_rating=desc&apikey=${process.env.MM_API_KEY}`)
            const data = await res.json()
            console.log("Data:", data.message.body.track_list[0].track.track_name)
            if (data.message.body.track_list.length === 0) { // Onödigt?
                throw new Error('Ingen låt hittades');
            }
            let tracks = [];
            for (let i = 0; i < data.message.body.track_list.length; i++) {
                tracks.push(data.message.body.track_list[i].track.track_id);
            }
            return tracks;
        } catch (error) {
            console.log('Error fetching', error);
            return [];
        }
    };

    const fetchLyrics = async () => {
        while (true) {
            try {
                const trackIds = await fetchTracks()

                const randomIndex = Math.floor(Math.random() * trackIds.length);
                const randomNumber = trackIds[randomIndex];

                const resLyrics = await fetch(`${process.env.MM_ROOT}track.lyrics.get?track_id=${randomNumber}&apikey=${process.env.MM_API_KEY}`)
                const lyricsData = await resLyrics.json()
                console.log("lyricsData: ", lyricsData)
                if (!lyricsData.message.body || !lyricsData.message.body.lyrics || !lyricsData.message.body.lyrics.lyrics_body || lyricsData.message.header.status_code === 404) {
                    console.log("Hittade inga lyrics, kör igen");
                    continue;
                } else {
                    const lyricsBody = lyricsData.message.body.lyrics.lyrics_body

                    const paragraphs = lyricsBody.split('\n\n');
                    const firstParagraph = paragraphs[0].trim();
                    console.log("firstParagraph:", firstParagraph)
                    return firstParagraph;
                };
            } catch (error) {
                console.error('Error fetching lyrics', error);
            }
        }
    };

	return {
        lyrics: await fetchLyrics()
	}
}