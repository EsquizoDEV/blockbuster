import {ADD_MOVIES, SEARCH_MOVIE, SET_FILTER} from '../Actions/index.js';
import {
    movieListAsMap,
    getAllds,
    getLeastValued,
    getMostValuedIds
} from '../normalize.js'


function findById(id, allIds) { 
    const parseId = parseInt(id, 10);
    
    if (allIds.includes(parseId)) {
        return [parseId]
    }
    return allIds
 };
 
 function filterByTitle(title, movies) {
     const list = []
      movies.forEach((movie) => {
         if(movie.title.toLowerCase().includes(title.toLowerCase())){
            list.push(movie.id)
         }
     })

     return list;
     
 };
 
 function searchMovie(query, list, allIds) {
     if (isNaN(query)) {
         return filterByTitle(query,list)
     }
     return [findById(query, allIds)]
 }
export const reducer = (state,{type, payload}) => {
    switch(type) {
        case ADD_MOVIES: {
            const movieList = movieListAsMap(payload, state.movieList)
            const leastValued = getLeastValued(payload, state.list.leastValued)
            const mostValued = getMostValuedIds(payload, state.list.mostValued)
            const all = getAllds(payload, state.list.all)
            return {
                ...state,
                movieList,
                list: {
                    ...state.list,
                    all,
                    leastValued,
                    mostValued
                }
            }
        }
        case SET_FILTER:
            return {
                ...state,
                filter: payload
            }
        case SEARCH_MOVIE:
            return {
                ...state,
                filter:'search',
                list: {
                    ...state.list,
                    search:searchMovie(payload, state.movieList, state.list.all)
                }
            }

        default:
            return state
    };
};