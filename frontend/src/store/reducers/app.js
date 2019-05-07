const initialState = {
  notifications: [],
};

function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'ADD_NOTIFICATION': {
      return {
        ...state,
        notifications: [...state.notifications, payload],
      };
    }
    default: {
      return state;
    }
  }
}

export default appReducer;
