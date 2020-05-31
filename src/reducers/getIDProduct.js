import { GETID, ADDTOCARD, REMOVECARD } from "../actions/actionType";
const initialHeroState = {
    id: {},
    // addtoCard: [{}],
    addtoCard: null,
};
const cartDetail = (state = initialHeroState, action) => {
    switch (action.type) {
        case ADDTOCARD: {

            //console.log('newList :', action.payload.Cart);
            const newCart = action.payload.Cart
            const Quantity = action.payload.Quantity
            let newList = state.addtoCard
            if (newList == null) {
                newList = [{}]
            }
            else {

            }
            const newListFilter = newList.filter(list => list.id != newCart.id)
            const newCartQuantity = {
                Quantity: Quantity,
                ...newCart,

            };
            //console.log('newCart :', newCartQuantity);
            newListFilter.push(newCartQuantity);

            return {
                ...state,
                addtoCard: newListFilter,
            };
        }
        case GETID: {
            const newId = {
                ...action.payload,
            };
            //console.log('newId :', action);
            // const newActiveHero = action.payload;
            return {
                ...state,
                id: newId,
            };
        }
        case REMOVECARD: {

            const newCart = action.payload.Cart
            const newList = state.addtoCard
            const newListFilter = newList.filter(list => list.id != newCart)
            console.log('ID CARD :', newCart);
            console.log('REMOVECARD :', newListFilter);
            return {
                ...state,
                addtoCard: newListFilter,
            };

            // const newActiveHero = action.payload;
            // return {
            //     ...state,
            //     // id: newId,
            // };
        }
        default:
            return state;
    }
};

export default cartDetail;