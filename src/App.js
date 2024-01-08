import UI from './UI';
import SearchUI from './SearchUI';

class App {

    constructor(){

        this.ui = new UI();
        this.searchUI = new SearchUI();
        
        // check for load and page changes
        window.addEventListener('load', this._route.bind(this));
        window.addEventListener('hashchange', this._route.bind(this));

        //display add form
    }
    
    _route() {
        
        const pathName = window.location.pathname;
        
        switch (pathName) {
            case '/':
                this.ui.displayPopularMovies();
                this.ui.isSelected('movie'); 
                break;
            case '/index.html':
                this.ui.displayPopularMovies();
                this.ui.isSelected('movie'); 
                break;
            case '/shows.html':
            case '/shows':
                this.ui.displayPopularShows();
                this.ui.isSelected('tv');
                break;
            case '/list.html':
                this.ui.displayListFilms();
                this.searchUI.displayBackNaviation();
                break;
            case '/search.html':
                this.searchUI.displaySearch();
                this.searchUI.displayBackNaviation();
                break;
            default:
                break;
        }

    }
}

export default App;