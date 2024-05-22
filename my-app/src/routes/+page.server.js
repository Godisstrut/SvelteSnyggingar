import MM_ROOT from '$env/static/private';
import MM_API_KEY from '$env/static/private';

export async function load( { fetch } ) {
    const res = await fetch(`${process.env.MM_ROOT}track.search?q_track=${encodeURIComponent('thriller')}&q_artist=${encodeURIComponent('michael jackson')}&apikey=${process.env.MM_API_KEY}`)
    const data = await res.json()

    console.log(data.message.body.track_list[0].track.track_id)

    const track = data.message.body.track_list[0].track

	return {
		tracks: track
	}
}