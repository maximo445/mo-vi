import Fetcher from './Fetcher';

class FilmDetailsUI  {
    constructor() {
        this._fetcher = new Fetcher();  
        this.hoverTime = null;
    }

    activateFilms () {
        const films = document.querySelectorAll('.card-item');
        // films.forEach(film => {
        //     film.addEventListener('mouseenter', this._startTime.bind(this));
        //     film.addEventListener('mouseleave', this._clearTimeOut.bind(this));
        // })
        films.forEach(film => {
            film.firstElementChild.addEventListener('click', this._getFilm.bind(this));
        })
    }

    async _getFilmData(filmId) {        
        

    }

    _getFilm(e) {
        
        const element = e.target.parentElement;

        const film = {};

        if (element.classList.contains('card-item')) {
            const temp = element.querySelector('.bottom .infoButton');
            film.backdrop_path = temp.getAttribute('data-backdrop_path');
            film.overview = temp.getAttribute('data-overview');
            film.name = temp.getAttribute('data-name'); 
            this._showFilmDetails(film);           
        } 
        
    }

    _showFilmDetails(film) {

        const filmDetails = document.querySelector('#film-details');
        filmDetails.innerHTML = '';

        const div = document.createElement('div');
        div.classList.add('container');
        div.innerHTML = `
        <div class="inner-container">
                <div class="exit">
                    <button class="exit-btn"><span class="text">X</span></button>
                </div>
                <div class="overview">
                    <h3 class="title">${film.name}</h3>
                    <p class="body">${film.overview}</p>
                </div>
            </div>
        <div class="image-wrapper"></div>
            `;      
        
        filmDetails.appendChild(div);
        filmDetails.style.display = 'flex';
        document.querySelector('#film-details .image-wrapper').style.background = film.backdrop_path ? `url('https://image.tmdb.org/t/p/w500${film.backdrop_path}') no-repeat center center/cover` : `#333`;
        document.querySelector('.exit-btn').addEventListener('click', this._closeSelf.bind(this));

        const container = document.querySelector('#film-details .container');
        
        container.offsetWidth;
        container.classList.add('present-overview');
        
        console.log(container);
    }

    _closeSelf(e) {
        const container = e.target;
        document.querySelector('#film-details').style.display = 'none'; 
        container.remove();
    }
}

export default FilmDetailsUI;