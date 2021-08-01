const createStore = (reducer, initialState) => {
    let state = initialState;
    const kcal = 1932;
    let objective = 0;
    let updater = () => {}

    const getState = () => {
       return state;
    };

    const getRest = () => {
        objective = kcal - state;
        return objective;
    }
    const dispatch = (action) => {
      state = reducer(state,action);
      updater();
    };
    const subscribe = (listener) => {
       updater = listener;
    };
    return {
       getState,
       dispatch,
       subscribe,
       getRest
    };
   };

   function combineReducers() {

   }
   
   export {
      createStore,
      combineReducers
   }