// Initial State
const initialState = {
  counter: 0,
  lodding: false,
  json: {},
};

// Redux: Counter Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LOCATION': {
      return {
        ...state,
        lodding: action.loading,
      };
    }
    case 'LOCATION_GET': {
      return {
        ...state,
        lodding: action.loading,
        json: action.json,
      };
    }
    case 'INCREASE_COUNTER': {
      return {
        ...state,
        counter: state.counter + action.value,
      };
    }
    case 'DECREASE_COUNTER': {
      return {
        ...state,
        counter: state.counter - action.value,
      };
    }
    default: {
      return state;
    }
  }
};

// Exports
export default counterReducer;
