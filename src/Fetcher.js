// require('dotenv-webpack').config();

class Fetcher {

    constructor() {
        
        this._key = '3bf00ace9a6286886a6fd8b94eb32f49';
        // this._key = process.env.API_KEY;

        this._urls = {
            popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${this._key}`,
            popularTV: `https://api.themoviedb.org/3/tv/popular?api_key=${this._key}`,
            movies: `https://api.themoviedb.org/3/search/movie?query={keywords}&include_adult=false&api_key=${this._key}`,
            shows: `https://api.themoviedb.org/3/search/tv?query={keywords}&include_adult=false&api_key=${this._key}`,
            film: `https://api.themoviedb.org/3/find/{id}?api_key=${this._key}`
        }

    }

    async getPopularMovies() {
        const movies = await this._fetcher(this._urls.popularMovies);
        return movies;
    }

    async getPopularShows() {
        const shows = await this._fetcher(this._urls.popularTV);
        return shows;
    }

    async searchMovies(query) {
        const myURl = this._setUrl('searchMovies', query);
        const movies = await this._fetcher(myURl);
        return movies;

    }

    async findFilm(id) {
        const url = this._urls.film.replace('{id}', id);
        const film = await this._fetcher(url);
        return url;
    }

    async searchShows(query) {
        const myURl = this._setUrl('searchShows', query);
        const shows = await this._fetcher(myURl);
        return shows;
    }

    async _fetcher(url) {
        // Basic GET request
        try {
            
            const response = await fetch(url);
            const data = await response.json();
            return data;

        } catch (err) {
            console.log(err);
        }

    }

    _setUrl(type, keywords = '') {

        const formatedKeywords = keywords.split(' ').join(',');

        if (type === 'searchMovies') {
            return this._urls.movies.replace('{keywords}', formatedKeywords);
        };
        if (type === 'searchShows') {
            return this._urls.shows.replace('{keywords}', formatedKeywords);
        };
    }    
}

export default Fetcher;