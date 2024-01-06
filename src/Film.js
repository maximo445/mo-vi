class Film {
    constructor(name, id, posterPath) {
        this.name = name;
        this.id = id;
        this.posterPath = posterPath;
    }

    toPlainObject() {
        return {name: this.name, id: this.id, posterPath: this.posterPath};
    }
}

export default Film;