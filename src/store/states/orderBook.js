// ------------------------------------
// Constants
// ------------------------------------
export const ORDER_BOOK_CHANGE = 'ORDER_BOOK_CHANGE'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function orderBookReducer(state = initialState, action) {
    switch (action.type) {
        case ORDER_BOOK_CHANGE:
            return action.payload
        default:
            return state
    }
}

// ------------------------------------
// Actions
// ------------------------------------
export function orderBookChange(orderBook = {}) {
    return {
        type: ORDER_BOOK_CHANGE,
        payload: orderBook
    }
}
