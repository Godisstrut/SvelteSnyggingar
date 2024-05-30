// Här hämtar vi nycklar till lyrics API:et
import { MM_ROOT, MM_API_KEY } from '$env/static/private';

// Skapar en load funktion som sveltekit säger man ska använda om man ska fetcha 
export async function load({ fetch }) {
    // Lista mer artister, Det går att fylla på med fler 
    const artists = ['drake', 'rihanna', 'eminem', 'beyonce', 'kanye west', 
    'taylor swift', 'linkin park', 'backstreet boys', 'post malone', 'billie eilish',
    'kendrick lamar', 'zara larsson', 'ariana grande', 'harry styles', 'ed sheeran', 'sia'];

    // Funktion som hämtar 5 random arister i listan ovanför och returnar dem
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
    // Laddar ner dem 5 random valda artisterna i en lista som vi sedan använder i slutet av denna filen 
    const selectedArtists = getRandomArtist();

    // Detta är en funktion som kör en request till lyrics API:et en i taget och laddner ner en nestladlista med TrackIDs
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
    
    // En funktion som rör om i listan lite så att inte alltid samma låt kommer först i listan, kommer vara mer logist framöver 
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    // denna rör om i grytan så att det blir som sagt inte samma TrackID som är först 
      function randomizeNestedList(nestedList) {
        return nestedList.map(sublist => shuffleArray([...sublist]));
    }
    // Denna funktionen kör en request mot API:et där man måste skicka in ett TrackID, Därefter får vi tillbaka en lyric. 
    const fetchLyrics = async () => {
        try {
            // kör första fetch funktionen för att hämta TrackIDs
            const trackIdsList = await fetchTracks();
            // Rör om i listan 
            randomizeNestedList(trackIdsList)
            // skapar en tom lista som sedan blir dem som visas för användarna 
            const lyricsList = [];

            for (let i = 0; i < trackIdsList.length; i++) {
                const trackIds = trackIdsList[i];
                for (let j = 0; j < trackIds.length; j++) {
                    const trackId = trackIds[j];
                    const resLyrics = await fetch(`${MM_ROOT}track.lyrics.get?track_id=${trackId}&apikey=${MM_API_KEY}`);
                    const lyricsData = await resLyrics.json();

                    // Vissa låtar finns men inte har något låttext och vissa blir bara error, då måste vi kolla nästa låt i listan och se om den finns 
                    if (!lyricsData.message.body || !lyricsData.message.body.lyrics || !lyricsData.message.body.lyrics.lyrics_body || lyricsData.message.header.status_code === 404) {
                        console.log(`Hittade inga lyrics för låtID: ${trackId}, kollar nästa.`);
                        continue;
                    } else {
                    // Hittar alltså denna funktionen en TrackID med låttext så ska dem andra TrackIDs från den artisten slopas och 
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
    // sedan skickar vi iväg en lista med låttext och en lista med artisterna som stämmer överns med varandra, första artisten i ena listan hör ihop med första låttexten i andra listan
    return {
        lyrics: await fetchLyrics(),
        artists: selectedArtists
    };
}
