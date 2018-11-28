import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import client from '../utils/client';

const configureStore = (initialState =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument({ client }))
    )
  ));

export default configureStore;
