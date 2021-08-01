import {createStore} from './Redux/index.js';
import {reducer} from './Reducers/index.js';
import movies from './movies.js';
import {movieListAsMap, getAllds, getLeastValued, getMostValuedIds } from './normalize.js'

const initialState = {
    movieList: movieListAsMap(movies),
    filter: 'all',
    list: {
        all: getAllds(movies),
        mostValued: getMostValuedIds(movies),
        leastValued: getLeastValued(movies)
    },
}

const store = createStore(reducer, initialState);

export default store;