// ------------------------------------
// Constants
// ------------------------------------
export const ORDER_BOOK_CHANGE = 'ORDER_BOOK_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function liveTradesChange(liveTrades = []) {
    return {
        type: ORDER_BOOK_CHANGE,
        payload: liveTrades
    }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export function updateLiveTrades({dispatch}) {
    return (nextLiveTrades) => dispatch(liveTradesChange(nextLiveTrades))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function liveTradesReducer(state = initialState, action) {
    return action.type === ORDER_BOOK_CHANGE ? action.payload : state
}
