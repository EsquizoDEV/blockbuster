function movieListAsMap(newList, oldList = new Map()) {
    return newList.reduce((list,movie) => {
        list.set(movie.id, movie);
        return list;
    }, oldList);

} 

function getAllds(list, oldList = []) {
    return oldList.concat(list.map(movie => movie.id));
};

function getMostValuedIds(list, oldList = []) {
    return list.reduce((list, movie) => {
        if(movie.vote_average >= 7) {
            list.push(movie.id);
        };
        return list
    },oldList)
}

function getLeastValued(list, oldList = []) {
    return list.reduce((list, movie) => {
        if(movie.vote_average < 7) {
            list.push(movie.id)
        };
        return list
    }, oldList);
}



export {
    movieListAsMap,
    getAllds,
    getMostValuedIds,
    getLeastValued
}
