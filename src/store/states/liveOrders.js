import {LIVE_ORDERS_TABLE_LIMIT} from "../../constants";

// ------------------------------------
// Constants
// ------------------------------------
export const LIVE_ORDERS_ADD = 'LIVE_ORDERS_ADD'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function liveOrdersReducer(state = initialState, action) {
    switch (action.type) {
        case LIVE_ORDERS_ADD:
            return [action.payload, ...state.slice(0, LIVE_ORDERS_TABLE_LIMIT - 1)]
        default:
            return state
    }
}

// ------------------------------------
// Actions
// ------------------------------------
export function liveOrdersAdd(liveOrders = {}) {
    return {
        type: LIVE_ORDERS_ADD,
        payload: liveOrders
    }
}
