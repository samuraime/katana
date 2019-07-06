const initialState = {
  notifications: [],
};

function reducer(state = initialState, { type, payload }) {
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

export default reducer;
