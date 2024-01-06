// import FilmDetailsUI

import FilmDetailsUI from './FilmDetailesUI';
import FilmsTracker from './FilmsTracker';
import img from './img/no-image.jpg';

class UI extends FilmDetailsUI {

    constructor() {
        super();
        // this._fetcher = new Fetcher();
        this._filmTracker = new FilmsTracker();
        this._listOpened = false;
    }

    _closePopUp() {
        const popUp = document.querySelector('#add-to-list-popup');
        
        popUp.classList.remove('lift-up-addCreate');

        setTimeout(() => {
            popUp.style.display = 'none';
        }, 510)
    }

    _showCreateList() {        
        document.querySelector('#create-list').style.display = 'block';
        document.querySelector('#display-create-list').style.display = 'none';
    }

    isSelected() {

        const currentURL = window.location.href;

        const urlParams = new URL(currentURL);

        let type = urlParams.searchParams.get('type');

        const movies = document.querySelector('#selection .movies');
        const tv = document.querySelector('#selection .tv');

        if (type === 'movies' || !type) {
            movies.classList.add('isSelected');
            tv.classList.remove('isSelected');
        } else if (type === 'tv') {
            tv.classList.add('isSelected');
            movies.classList.remove('isSelected');
        }

    }

    _addFilm(e) {

        e.preventDefault();

        let name = '';
        let id ='';
        let poster = '';

        if (e.target.classList.contains('fas')) {
            name = e.target.parentElement.getAttribute('data-name');
            id = e.target.parentElement.getAttribute('data-id');            
            poster = e.target.parentElement.getAttribute('data-poster');            
        } else {
            name = e.target.getAttribute('data-name');
            id = e.target.getAttribute('data-id');
            poster = e.target.getAttribute('data-poster');
        }

        const checkedLists = e.target.querySelectorAll('input[type="checkbox"]:checked');

        if (checkedLists.length === 0) return;

        checkedLists.forEach(selection => {
            this._filmTracker.addTolist(name, id, poster, selection.value);
        });

        if (this._listOpened) {
            this._render('updateListsPU');
        }

        this._filmTracker.compareData();

        this._closePopUp();

    }

    _render(action) {
        switch (action) {
            case 'updateListsPU':
                this._displayListsPopUp(false, true);
                break;        
            default:
                break;
        }
    }

    createTemplateLists() {
        const names = ['worship', 'powerful', 'insipirational']
        names.forEach(name => {
            this._filmTracker.createList(name);
        })
    }

    _createList(e) {

        e.preventDefault();

        const name = e.target.previousElementSibling.previousElementSibling.getAttribute('data-name');
        const id = e.target.previousElementSibling.previousElementSibling.getAttribute('data-id');
        const poster = e.target.previousElementSibling.previousElementSibling.getAttribute('data-poster'); 

        const listName = document.querySelector('#list-name').value;

        const newList = this._filmTracker.createList(listName);

        this._filmTracker.addTolist(name, id, poster, newList.id);

        if (this._listOpened) {
            this._render('updateListsPU');
        }

        this._filmTracker.compareData();

        this._closePopUp();
    }

    _displayListsPopUp (event, dontClose = false) {

        const numberOfList = this._filmTracker.lists.length;

        if (numberOfList <= 0) return;

        if (!this._listOpened || dontClose) {

            const popUp = document.querySelector('.toggle-lists .list-container');
            if (popUp) {
                popUp.remove();
            }

            const div = document.createElement('div');
            div.classList.add('list-container');
            div.innerHTML = `
                <ul>
                    ${this._filmTracker.lists.map(list => {
                        return `
                        <li><a id="list-name-films" href="list.html?id=${list.id}"><span>${list.getShortName()}:</span> <span>${list.films.length}</span></a></li>
                        `;
                    }).join('')}
                </ul>
            `;
            document.querySelector('.toggle-lists').appendChild(div);

            const newElement = document.querySelector('.list-container');
            
            newElement.offsetWidth;

            newElement.classList.add('lift-up-newElement');

            this._listOpened = true;

        } else {

            const listPopUp =  document.querySelector('.toggle-lists .list-container');

            listPopUp.style.transform = 'translateY(30px)';
            listPopUp.style.opacity = '0';
            
            setTimeout(() => {
                listPopUp.remove();
            }, 710);

            this._listOpened = false;

        }
    }

    _displayAddListPopUp(e) {
        
        let name = '';
        let id ='';
        let poster = '';

        if (e.target.classList.contains('fas')) {
            name = e.target.parentElement.getAttribute('data-name');
            id = e.target.parentElement.getAttribute('data-id'); 
            poster = e.target.parentElement.getAttribute('data-poster');           
        } else {
            name = e.target.getAttribute('data-name');
            id = e.target.getAttribute('data-id');
            poster = e.target.getAttribute('data-poster');
        }

        // dinamically create popUp element

        const popUp  = document.querySelector('#add-to-list-popup');

        popUp.innerHTML = ``;
         
        const div = document.createElement('div');
        div.classList.add('container');

        div.innerHTML = `
            <div class="close-container">
                <button class="close-popup">X</button>
            </div>
            <form id="add-to">
                <input class="cs-buttom" type="submit" value="Add">
                <br>
                ${this._filmTracker.lists.map(list => {
                    return `
                        <label>
                            <input type="checkbox" data-it="${list.id}" name="id" value="${list.id}"> ${list.name}
                        </label>                    
                    `;
                }).join('<br>')}
            </form>
            <button class="cs-buttom" id="display-create-list"> + Create List</button>
            <form id="create-list">
                <label for="field1">Name</label>
                <br>
                <input class="cs-input" class="cs-buttom" type="text" id="list-name" name="list-name">
                <br>
                <input class="cs-buttom" type="submit" value="Create">
            </form>                                              
        `;

        popUp.appendChild(div);
        popUp.style.display = 'flex';

        popUp.offsetWidth;

        popUp.classList.add('lift-up-addCreate');

        const addToForm = document.querySelector('#add-to');

        addToForm.setAttribute('data-name', name);
        addToForm.setAttribute('data-id', id);
        addToForm.setAttribute('data-poster', poster);

        document.querySelector('.close-popup').addEventListener('click', this._closePopUp.bind(this));
        document.querySelector('#display-create-list').addEventListener('click', this._showCreateList.bind(this));
        document.querySelector('#add-to').addEventListener('submit', this._addFilm.bind(this));
        document.querySelector('#create-list').addEventListener('submit', this._createList.bind(this));

    }

    displayListFilms() {

        const listId = window.location.search;

        const params = new URLSearchParams(listId);

        const param1Value = params.get('id'); 

        const list = this._filmTracker.getList(param1Value);

        document.querySelector('#list-header h1').innerHTML = `${list.name}`.toLocaleUpperCase();

        const listsObject = list.toPlainObject();

        const films = listsObject.films;     

        films.forEach(movie => {
            const div = document.createElement('div');
            div.classList.add('swiper-slide');
            div.innerHTML = `
            <div class="card-item-2">
                <img src="https://image.tmdb.org/t/p/w500${movie.posterPath ? movie.posterPath : '/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg'}" alt="film-poster">
                <div class="bottom">
                    <h2 class="title">${movie.name}</h2>
                    <p class="rating">rating: 10</p>
                </div>
            </div>    
            `;
            document.querySelector('.swiper-wrapper').appendChild(div);
        });

        const swiper = new Swiper('.swiper', {

            slidesPerView: 1,
            speed: 400,
            spaceBetween: 15,
            // autoplay: {
            //     delay: 4000
            // },
            breakpoints: {
                // when window width is >= 320px
                500: {
                  slidesPerView: 2,
                  spaceBetween: 5
                },
                // when window width is >= 480px
                700: {
                  slidesPerView: 3,
                  spaceBetween: 15
                },
                // when window width is >= 640px
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 20
                }
            },
            // Navigation arrows
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            }
          });
    

    }

    async displayPopularMovies(optionalResults = null) {
        
        const {results} = await this._fetcher.getPopularMovies();
        let searchResults = null;
        if (optionalResults) {
            searchResults = optionalResults;
        } else {
            searchResults = results;
        }

        console.log(searchResults);

        searchResults.forEach(movie => {
            const div = document.createElement('div');
            div.classList.add('card-item');
            div.innerHTML = `
                <img class="poster" src=${movie.poster_path ? `"https://image.tmdb.org/t/p/w500${movie.poster_path}"` :`${img}`} alt="film-poster">
                <h2 class="title">${movie.title}</h2>
                <div class="bottom">
                    <p class="rating">rating: ${movie.vote_average}</p>
                    <button class="infoButton display-list-form" data-name="${movie.title}" data-id="${movie.id}" data-poster="${movie.poster_path}"  data-overview="${movie.overview}" data-backdrop_path="${movie.backdrop_path}"><i class="fas fa-plus"></i></button>
                </div>
                `;
                document.querySelector('.film-container').appendChild(div);
        });

        document.querySelector('.toggle-lists .fas').addEventListener('click', this._displayListsPopUp.bind(this));

        const popupButtons = document.querySelectorAll('.display-list-form');

        popupButtons.forEach(button => {
            button.addEventListener('click', this._displayAddListPopUp.bind(this));
        })

        this.activateFilms();

    }

    async displayPopularShows(optionalResults = null) {

        const {results} = await this._fetcher.getPopularShows();

        let searchResults = null;
        if (optionalResults) {
            searchResults = optionalResults;
        } else {
            searchResults = results;
        }

        console.log(searchResults);

        searchResults.forEach(show => {
            const div = document.createElement('div');
            div.classList.add('card-item');
            div.innerHTML = `
                <img class="poster" src=${show.poster_path ? `"https://image.tmdb.org/t/p/w500${show.poster_path}"` :`/${img}`} alt="film-poster">
                <h2 class="title">${show.name}</h2>
                <div class="bottom">
                    <p class="rating">rating: ${show.vote_average}</p>
                    <button class="infoButton display-list-form" data-name="${show.name}" data-id="${show.id}" data-poster="${show.poster_path}" data-overview="${show.overview}" data-backdrop_path="${show.backdrop_path}"><i class="fas fa-plus"></i></button>
                </div>
            `;
            document.querySelector('.film-container').appendChild(div);
        });

        document.querySelector('.toggle-lists .fas').addEventListener('click', this._displayListsPopUp.bind(this));

        const popupButtons =document.querySelectorAll('.display-list-form');

        popupButtons.forEach(button => {
            button.addEventListener('click', this._displayAddListPopUp.bind(this));
        }) 

        this.activateFilms();
    }

}

export default UI;