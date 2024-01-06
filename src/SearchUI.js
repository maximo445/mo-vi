// import: UI

import UI from './UI';

class SearchUI extends UI {
    constructor() {
        super();
        this.searching = document.querySelector('#search-form');
        this._hookSearching();
    }

    _hookSearching () {
        if (this.searching) {
            this.searching.addEventListener('submit', this.goToSearchPage.bind(this));
        }
    }

    goToSearchPage(e) {

        e.preventDefault();

        const currentURL = window.location.href;

        const urlParams = new URL(currentURL);

        let type = urlParams.searchParams.get('type');

        if (!type)  {
            type = 'movies';
        }

        const inputString = document.querySelector('#search-form  input');

        if(!inputString.value) return;

        const inputParams = inputString.value.split(' ').join('+');

        inputString.value = '';

        window.location.href =`/search.html?type=${type}&query=${inputParams}`;

    }

    async displaySearch() {

        const currentURL = window.location.href;
        const urlParams = new URL(currentURL);
        const type = urlParams.searchParams.get('type');
        const query = urlParams.searchParams.get('query').split(' ').join('+');
        console.log(query);
        const {results} = type === 'movies' ? await this._fetcher.searchMovies(query) : await this._fetcher.searchShows(query);

        // using display popular movies to search - consider renaming the moethod
        type === 'movies' ? this.displayPopularMovies(results) : this.displayPopularShows(results);     
    }

    displayBackNaviation() {

        const currentURL = window.location.href;

        const urlParams = new URL(currentURL);

        let type = urlParams.searchParams.get('type');

        const div = document.createElement('div');
        if (type === 'movies' || !type) {
            div.innerHTML = '<a class="isSelected" href="/index.html?type=movies" id="tv">&lt; back</a>';
        } else {
            div.innerHTML = '<a class="isSelected" href="/index.html?type=tv" id="tv">&lt; back</a>'
        }

        document.querySelector('#back .container').appendChild(div);
    }

}

export default SearchUI;