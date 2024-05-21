from bottle import route, run
from lyricsgenius import Genius
import json

token = "64pHJESFmSJZgbzRp8d7awJ621BlVDanghJ1_8mDe8geUYGn8fe3SYTJFL-vVCDP"
artists = ["Drake"]

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
        current_artist = genius.search_artist(artist, max_songs=3, sort="popularity")
        for song in current_artist.songs:
            ids.append(song.id)
            
            
    return json.dumps(ids)

List_of_songs = []
3315890, # Drake
7076626, # Taylor Swift 
235729, # Eminem
3003630, 3209330, 3786667, # Lil Uzi Vert  
70324, 1149, 2412669, # Kanye West 
2398213, 2378935, 2413890 # Rihanna 
353931,390407, 54643 # Elton john
1063, # Queen
49192, 77594, 77782 # Coldplay
1644, 69620, 2912 # Michael Jackson
1043468, 1326910, 1670159 # Ted gärdestad
2942139, 698675, 2865735 # Post Malone


run(host="127.0.0.1", port=8080)