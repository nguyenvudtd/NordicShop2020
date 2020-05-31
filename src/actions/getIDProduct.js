import { GETID, ADDTOCARD, REMOVECARD } from "./actionType"

export const getID = (id) => {
    return {
        type: GETID,
        payload: id,
    }
}
export const addToCard = (Card) => {
    return {
        type: ADDTOCARD,
        payload: Card,
    }
}
export const removeToCard = (Card) => {
    return {
        type: REMOVECARD,
        payload: Card,
    }
}

