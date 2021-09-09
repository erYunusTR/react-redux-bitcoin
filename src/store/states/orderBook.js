// ------------------------------------
// Constants
// ------------------------------------
export const ORDER_BOOK_CHANGE = 'ORDER_BOOK_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function orderBookChange(orderBook = []) {
    return {
        type: ORDER_BOOK_CHANGE,
        payload: orderBook
    }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export function updateOrderBook({dispatch}) {
    return (nextOrderBook) => dispatch(orderBookChange(nextOrderBook))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function orderBookReducer(state = initialState, action) {
    return action.type === ORDER_BOOK_CHANGE ? action.payload : state
}
