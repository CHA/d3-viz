from flask import Flask
import mysql.connector as mysql
from flask_cors import CORS
from movie import Movie
import jsonpickle


app = Flask(__name__)
CORS(app)

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
        movie = Movie()
        movie.film = item[0]
        movie.genre = item[1]
        movie.world_wide_gross_usd = item[2]
        result.append(movie)
    return jsonpickle.encode(result)


@app.route("/movies/agg/genre")
def get_movies_gross_by_genre():
    cursor = db.cursor()
    cursor.execute(
        """
        SELECT genre, SUM(world_wide_gross_usd) 
        FROM movies 
        GROUP BY genre
        """
    )
    result = []
    for record in cursor.fetchall():
        result.append({"genre": record[0], "gross_usd": record[1]})

    return result


if __name__ == "main":
    app.run(host="0.0.0.0")
