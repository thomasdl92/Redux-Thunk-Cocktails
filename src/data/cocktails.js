import axios from "axios";
const START_FETCH_COCKTAILS = "START_FETCH_COCKTAILS";
const ERROR_FETCH_COCKTAILS = "ERROR_FETCH_COCKTAILS";
const SUCCESS_FETCH_COCKTAILS = "SUCCESS_FETCH_COCKTAILS";
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";

export const setSearchValue = (str) => ({
  type: SET_SEARCH_VALUE,
  payload: str
});

export const getCocktails = () => async (dispatch, getState) => {
  dispatch({ type: START_FETCH_COCKTAILS });
  try {
    const {
      data: { drinks }
    } = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${
        getState().cocktailsState.searchStr
      }`
    );
    dispatch({
      type: SUCCESS_FETCH_COCKTAILS,
      payload: drinks ?? []
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCH_COCKTAILS,
      payload: error.message
    });
  }
};

const cocktails = {
  searchStr: "",
  loading: false,
  error: {
    status: false,
    message: ""
  },
  cocktails: []
};

export default (state = cocktails, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_VALUE:
      return { ...state, searchStr: payload };
    case START_FETCH_COCKTAILS:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
          message: ""
        },
        cocktails: []
      };
    case ERROR_FETCH_COCKTAILS:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: payload
        }
      };
    case SUCCESS_FETCH_COCKTAILS:
      return {
        ...state,
        loading: false,
        error: { status: false, message: "" },
        cocktails: payload
      };
    default:
      return state;
  }
};
