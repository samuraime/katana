const initialState = {
  signedIn: false,
  id: '',
  avatar: '',
  email: '',
  name: '',
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'USER_GET_SUCCESS': {
      return {
        ...state,
        ...payload,
        signedIn: true,
      };
    }
    case 'USER_GET_ERROR': {
      return {
        ...state,
        signedIn: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
