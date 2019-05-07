const initialState = {
  isAuthed: false,
};

function accountReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'AUTH_SUCCESS': {
      return {
        ...state,
        isAuthed: payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default accountReducer;
