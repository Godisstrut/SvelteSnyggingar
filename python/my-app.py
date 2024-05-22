from bottle import Bottle, run, response
from lyricsgenius import Genius
import json
import random

token = "64pHJESFmSJZgbzRp8d7awJ621BlVDanghJ1_8mDe8geUYGn8fe3SYTJFL-vVCDP"
artists = ["Drake"]

app = Bottle()

@app.route('/data')
def get_data():
    response.content_type = 'application/json'
    return {
        "message": "Hello from the Bottle server!",
        "value": 42
    }

@app.route("/")
def index():
    genius = Genius(token)

    id = 2885745
    lyrics = genius.lyrics(id)

    return json.dumps(lyrics)

@app.route("/id/<id>")
def get_lyric_by_id(id):
    genius = Genius(token)
    lyrics = genius.lyrics(id)
    return json.dumps(lyrics)

@app.route("/ids")
def get_ids():
    return json.dumps([3315890, 7076626, 235729])

@app.route("/get_lyric_ids")
def get_lyric_ids():
    genius = Genius(token)
    ids = []

    for artist in artists:
        current_artist = genius.search_artist(artist, max_songs=3, sort="popularity")
        for song in current_artist.songs:
            ids.append(song.id)
            
    return json.dumps(ids)

List_of_songs = [
    3315890, 7076626, 235729, 3003630, 3209330, 3786667, 70324, 1149, 2412669, 
    2398213, 2378935, 2413890, 353931, 390407, 54643, 1063, 49192, 77594, 77782, 
    1644, 69620, 2912, 1043468, 1326910, 1670159, 2942139, 698675, 2865735
]

@app.route("/get_random_song")
def get_lyrics():
    genius = Genius(token)
    random_song = random.choice(List_of_songs)
    lyrics = genius.lyrics(random_song)

    return json.dumps(lyrics)

# Run the app
if __name__ == '__main__':
    run(app, host="0.0.0.0", port=8080)
