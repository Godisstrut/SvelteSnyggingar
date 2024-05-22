import MM_ROOT from '$env/static/private';
import MM_API_KEY from '$env/static/private';

export async function load( { fetch } ) {

    const fetchTracks = async () => {
        const res = await fetch(`${process.env.MM_ROOT}track.search?q_artist=${encodeURIComponent('drake')}&f_has_lyrics&page_size=3&s_track_rating=desc&apikey=${process.env.MM_API_KEY}`)
        const data = await res.json()
        let tracks = []
        for (let i = 0; i < data.message.body.track_list.length; i++) {
            tracks.push(data.message.body.track_list[i].track.track_id);
        }
        return tracks
    }

    const fetchLyrics = async () => {
        const trackIds = await fetchTracks()

        const randomIndex = Math.floor(Math.random() * trackIds.length);
        const randomNumber = trackIds[randomIndex];

        console.log(randomNumber);

        const resLyrics = await fetch(`${process.env.MM_ROOT}track.lyrics.get?track_id=269588564&apikey=${process.env.MM_API_KEY}`)
        const lyricsData = await resLyrics.json()
        const lyricsBody = lyricsData.message.body.lyrics.lyrics_body
        return lyricsBody
    }

	return {
        lyrics: await fetchLyrics()
	}
}