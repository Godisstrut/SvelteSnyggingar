import { MM_ROOT, MM_API_KEY } from '$env/static/private';

export async function load({ fetch }) {
    const artists = ['drake', 'rihanna', 'eminem', 'beyonce', 'kanye west', 'taylor swift', 'linkin park', 'backstreet boys'];

    const getRandomArtist = () => {
        const artistsCopy = [...artists];
        const randomArtists = [];

        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * artistsCopy.length);
            randomArtists.push(artistsCopy.splice(randomIndex, 1)[0]);
        }
        console.log("random:", randomArtists);
        return randomArtists;
    };

    const selectedArtists = getRandomArtist();

    const fetchTracks = async () => {
        try {
            const trackIdsList = [];
            for (let i = 0; i < selectedArtists.length; i++) {
                const res = await fetch(`${MM_ROOT}track.search?q_artist=${encodeURIComponent(selectedArtists[i])}&f_has_lyrics&page_size=3&s_track_rating=desc&apikey=${MM_API_KEY}`);
                const data = await res.json();
                const trackIds = data.message.body.track_list.map(track => track.track.track_id);
                trackIdsList.push(trackIds);
            }
            return trackIdsList;
        } catch (error) {
            console.log('Error fetching', error);
            return [];
        }
    };

    const fetchLyrics = async () => {
        try {
            const trackIdsList = await fetchTracks();
            const lyricsList = [];

            for (let i = 0; i < trackIdsList.length; i++) {
                const trackIds = trackIdsList[i];
                for (let j = 0; j < trackIds.length; j++) {
                    const trackId = trackIds[j];
                    const resLyrics = await fetch(`${MM_ROOT}track.lyrics.get?track_id=${trackId}&apikey=${MM_API_KEY}`);
                    const lyricsData = await resLyrics.json();

                    if (!lyricsData.message.body || !lyricsData.message.body.lyrics || !lyricsData.message.body.lyrics.lyrics_body || lyricsData.message.header.status_code === 404) {
                        console.log(`No lyrics found for track ID ${trackId}, checking next track.`);
                        continue;
                    } else {
                        const lyricsBody = lyricsData.message.body.lyrics.lyrics_body;
                        const paragraphs = lyricsBody.split('\n\n');
                        const firstParagraph = paragraphs[1].trim();
                        const lines = firstParagraph.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                        lyricsList.push(lines);
                        break;
                    }
                }
            }
            return lyricsList;
        } catch (error) {
            console.error('Error fetching lyrics', error);
            return [];
        }
    };

    return {
        lyrics: await fetchLyrics(),
        artists: selectedArtists
    };
}
