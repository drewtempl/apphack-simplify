from flask import Flask, jsonify
# from src import auth
from src import top_songs, auth

app = Flask(__name__)


@app.route("/user")
def user():
    user = top_songs.get_user()
    response = jsonify(user)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/top-tracks/<timeframe>")
def top_tracks(timeframe):
    tracks = top_songs.get_top_songs(20, timeframe)

    response = jsonify(tracks)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/make-playlist/<type>/<timeframe>")
def make_playlist(type, timeframe):
    if (type == 'recommendation'):
        playlist = top_songs.recommended_playlist(25, 'medium_term')

    elif (type == 'top-tracks'):
        playlist_url = top_songs.top_tracks_playlist(25, timeframe)
    
    response = {'url': playlist_url}
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
