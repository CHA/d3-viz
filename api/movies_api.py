from flask import Flask, jsonify
import mysql.connector as mysql
from movie import Movie
import json

app = Flask(__name__)

db = mysql.connect(
    host="localhost", user="root", password="Clapham101_", database="stocks"
)


@app.route("/movies")
def get_movies():
    cursor = db.cursor()
    cursor.execute("SELECT film, genre, world_wide_gross_usd FROM movies")
    movies = cursor.fetchall()
    result = []
    for item in movies:
        print(item)
        movie = Movie()
        movie.film = item[0]
        movie.genre = item[1]
        movie.world_wide_gross_usd = item[2]
        result.append(movie.to_json())

    return result


if __name__ == "main":
    app.run(host="0.0.0.0")
