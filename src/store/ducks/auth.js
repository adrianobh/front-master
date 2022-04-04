//Actions types
export const Types = {
  USER_LOGOUT: "USER_LOGOUT",
  USER_DATA_SET: "USER_DATA_SET",
};
//Reducer
const user =
  localStorage.user !== "undefined" && localStorage.user !== null
    ? JSON.parse(localStorage.getItem("user"))
    : "";

const INIT_STATE = {
  user,
};

export default function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case Types.USER_LOGOUT: {
      return {
        ...state,
      };
    }

    case Types.USER_DATA_SET: {
      return { ...state, user: action.payload };
    }

    default:
      return state;
  }
}
//Actions Creators
export function loginAction(data) {
  return async (dispatch) => {
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: Types.USER_DATA_SET, payload: data });
  };
}

export function setUser(user) {
  return async (dispatch) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: Types.USER_DATA_SET, payload: user });
  };
}

export function logoutAction() {
  localStorage.clear();
  return { type: Types.USER_LOGOUT };
}
