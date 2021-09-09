// ------------------------------------
// Constants
// ------------------------------------
export const LIVE_TRADES_ADD = 'LIVE_TRADES_ADD'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function liveTradesReducer(state = initialState, action) {
    switch (action.type) {
        case LIVE_TRADES_ADD:
            return [action.payload, ...state]
        default:
            return state
    }
}

// ------------------------------------
// Actions
// ------------------------------------
export function liveTradesAdd(liveTrades = {}) {
    return {
        type: LIVE_TRADES_ADD,
        payload: liveTrades
    }
}
