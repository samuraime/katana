const initialState = {
  list: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'ARCHIEVE_LIST_SUCCESS': {
      return {
        ...state,
        list: payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
