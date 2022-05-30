import { UI } from '../../types';
const { START_LOADING, STOP_LOADING , SHOW_NETWORK_ERROR, ERASE_NETWORK_ERROR } = UI;

const initialState = {
  isLoading: false,
  networkError: {
    show: false,
    dispatch: null
  }
}
const UIReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING:
      return {
        ...prevState,
        isLoading: true,
      };
    case STOP_LOADING: {
      return {
        ...prevState,
        isLoading: false,
      };
    }
    case SHOW_NETWORK_ERROR:
      const { dispatch } = payload;
      return {
        ...prevState,
        isLoading: false,
        networkError: {show: true, dispatch}
      };
    case ERASE_NETWORK_ERROR:
      return {
        ...prevState,
        isLoading: false,
        networkError: { show:false, dispatch: null }
      };
    default:
      return prevState
  }
}

export default UIReducer;
