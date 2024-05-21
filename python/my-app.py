from bottle import route, run
from lyricsgenius import Genius
import json

token = "64pHJESFmSJZgbzRp8d7awJ621BlVDanghJ1_8mDe8geUYGn8fe3SYTJFL-vVCDP"
artists = ["Drake", "Taylor Swift", "Eminem"]

@route("/")
def index():
    genius = Genius(token)

    id = 2885745
    lyrics = genius.lyrics(id)

    return json.dumps(lyrics)

@route("/id/<id>")
def get_lyric_by_id(id):
    genius = Genius(token)
    lyrics = genius.lyrics(id)
    return json.dumps(lyrics)

@route("/ids")
def get_ids():
    return json.dumps([3315890, 7076626, 235729])

@route("/get_lyric_ids")
def get_lyric_ids():
    genius = Genius(token)
    ids = []

    for artist in artists:
        current_artist = genius.search_artist(artist, max_songs=1, sort="popularity")
        for song in current_artist.songs:
            ids.append(song.id)
            
            
    return json.dumps(ids)



run(host="127.0.0.1", port=8080)