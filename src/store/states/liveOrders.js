// ------------------------------------
// Constants
// ------------------------------------
export const ORDER_BOOK_CHANGE = 'ORDER_BOOK_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function liveOrdersChange(liveOrders = []) {
    return {
        type: ORDER_BOOK_CHANGE,
        payload: liveOrders
    }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export function updateLiveOrders({dispatch}) {
    return (nextLiveOrders) => dispatch(liveOrdersChange(nextLiveOrders))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function liveOrdersReducer(state = initialState, action) {
    return action.type === ORDER_BOOK_CHANGE ? action.payload : state
}
