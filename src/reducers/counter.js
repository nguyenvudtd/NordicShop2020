import { INCREMENT, DECREMENT, RESETQUANTITY } from "../actions/actionType";

const initialHeroState = 1
const counter = (state = initialHeroState, action) => {
  switch (action.type) {
    case INCREMENT: {
      const newCounter = state + 1;
      // localStorage.setItem('counter', newCounter);

      return newCounter;
    }
    case DECREMENT: {
      let newCounter = state - 1;
      if (newCounter == 0) {
        newCounter = 1;
      }
      // localStorage.setItem('counter', newCounter);

      return newCounter;
    }
    case RESETQUANTITY: {
      let newCounter = 1;
      console.log('RESETQUANTITY :', RESETQUANTITY);
      return newCounter;
    }
    default:
      return state;
  }
};

export default counter;