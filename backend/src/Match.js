class Match {
    constructor(name, limit, password) {
        this.name = name;
        this.limit = limit;
        this.password = password;
        this.players = [];
        this.playing = false;
    }

    getInfo() {
        const {name, limit, playing, password, players} = this;
        return {
            name,
            limit,
            players,
            playing,
            isPublic: password === '',
        }
    }
}

export default Match;
