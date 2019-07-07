const initialState = {
  signedIn: false,
  id: '',
  avatar: '',
  email: '',
  name: '',
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_USER_SUCCESS': {
      return {
        ...state,
        ...payload,
        signedIn: true,
      };
    }
    case 'GET_USER_PENDING':
    case 'GET_USER_FAILURE': {
      return {
        ...state,
        ...payload,
        signedIn: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
