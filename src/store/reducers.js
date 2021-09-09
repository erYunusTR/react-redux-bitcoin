import {combineReducers} from 'redux'

import orderBookReducer from './states/orderBook'
import liveOrdersReducer from './states/liveOrders'
import liveTradesReducer from './states/liveTrades'

export function makeRootReducer(asyncReducers) {
    return combineReducers({
        // Add sync reducers here
        orderBook: orderBookReducer,
        liveOrders: liveOrdersReducer,
        liveTrades: liveTradesReducer,
        ...asyncReducers
    })
}

export function injectReducer(store, {key, reducer}) {
    store.asyncReducers[key] = reducer // eslint-disable-line no-param-reassign
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
