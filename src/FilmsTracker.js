// import: List, Film

import List from './List';
import Film from './Film';

class FilmsTracker {
    constructor() {
        this.lists = [];
        this._getLocalStorage();
    }

    compareData() {
        const trackerList = this.lists;
        const storageList = JSON.parse(localStorage.getItem('lists'));
        console.log({trackerList, storageList: storageList.lists});
    }

    createList (name) {
        const exist = this.lists.filter(list => list.name === name);
        if (exist.length >= 1) return;
        const newList = new List(name);
        this.lists.push(newList);
        return newList;
    }

    addTolist (name, id, posterPath, listID) {
        const newFilm = new Film(name, id, posterPath);
        const list = this.lists.filter(list => list.id === listID)[0];
        list.addFilm(newFilm);
        this._setLocalStorage();
    }

    getList (listID) {
        const list = this.lists.filter(list => list.id === listID)[0];
        return list; 
    }

    _setLocalStorage() {
        const lists = this.lists.map(list => list.toPlainObject());
        const listsObject = {lists: lists};
        const jsonString = JSON.stringify(listsObject);
        localStorage.setItem("lists", jsonString);
    }

    _getLocalStorage() {

        const jsonString = localStorage.getItem('lists');
    
        if (jsonString) {

            this.lists = [];

            const listsObject = JSON.parse(jsonString);

            listsObject.lists.forEach(list => {
                //create new list
                const newList = new List(list.name);
                //change the default id 
                newList.id = list.id;

                list.films.forEach(film => {
                    const newFilm = new Film(film.name, film.id, film.posterPath);
                    newList.addFilm(newFilm);
                });

                this.lists.push(newList);
            });
            
        } else {
            console.log('nothing in yet');
        }
    }

}

export default FilmsTracker;