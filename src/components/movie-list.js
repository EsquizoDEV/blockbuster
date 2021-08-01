import {Component, createElement} from '../lib/react/index.js';
import styled from '../lib/styledComponents.js';
import Wrapper from './wrapper.js';
import Movie from './movie.js';
import store from '../store.js'
import { ADD_MOVIES } from '../Actions/index.js';
import api from '../api.js';

const MovieListStyled = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    justify-content: center;
    box-sizing: border-box;
    gap: 1em;
`

class MovieList extends Component {
    state = {
     page:1
    };
    getPage  = async (page) => {
        const {results} = await api.moviePage(page)
        store.dispatch({
            type:ADD_MOVIES,
            payload: results
        });
    };
    
    handleIntersection = (entries) => {
        if(entries[0].isIntersecting) {
            console.log('traer nueva pagina')
            this.getPage(this.state.page)
            this.setState({
                page: this.state.page + 1
            });
        }
    }
    
    componentDidMount() {
        // this.getPage(this.state.page);
        store.subscribe(() => {
            this.setState()
        });
        const observer = new IntersectionObserver(this.handleIntersection)
        observer.observe(window.intersector)
    }
    render( ) {
        const state = store.getState();
        const movieList = state.movieList;
        const movieListId = state.list[state.filter]
        return Wrapper({
            children: MovieListStyled({
                children: movieListId.map(id => new Movie(movieList.get(id)))
           
            })
        })
    }
};

export default MovieList;