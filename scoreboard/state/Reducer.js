export const initialState = {
  // socket: getSocket(),
  isLoggedIn: false,
  email: "", //email will be used as the primary key for most things
  username: "",
  adminStatus: false,
  records: [],
};

export const storageReducer = (state, action) => {
  switch (action.type) {
    case "INIT_STORED": {
      return action.data;
    }
    case "SET_RECORDS": {
      return {
        ...state,
        records: action.data,
      };
    }
    default:
      return state;
  }
};
