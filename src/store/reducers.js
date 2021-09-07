import {combineReducers} from 'redux'

import locationReducer from './location'

export function makeRootReducer(asyncReducers) {
    return combineReducers({
        // Add sync reducers here
        location: locationReducer,
        ...asyncReducers
    })
}

export function injectReducer(store, {key, reducer}) {
    store.asyncReducers[key] = reducer // eslint-disable-line no-param-reassign
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
