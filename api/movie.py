import jsonpickle


class Movie:
    def __init__(self):
        self.film = ""
        self.genre = ""
        self.studio = ""
        self.score = None
        self.profitability = None
        self.rotten_tomato_score = None
        self.world_wide_gross_usd = None
        self.year = None

    def to_json(self):
        return jsonpickle.encode(self)
