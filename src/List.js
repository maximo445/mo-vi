// import: IdGenerator

import IdGerator from './IdGerator';

class List extends IdGerator {
    constructor(name) {
        super();
        // form IdGerator
        this.id = this._generateUniqueId();
        this.name = name;
        this.films = [];
    }

    toPlainObject() {
        const films = this.films.map(film => film.toPlainObject());
        return {id: this.id, name: this.name, films};
    }

    addFilm(film) {
        const exist = this.films.filter(myFilm => myFilm.id === film.id);
        if (exist.length >= 1) return;
        this.films.push(film);
    }

    getShortName() {
        return this.name.length > 9? `${this.name.substring(0, 9)}.. `.toUpperCase() : this.name.toUpperCase(); 
    }
}

export default List;