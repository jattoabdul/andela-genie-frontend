import {
  GET_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_FAIL,
  UPDATE_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL } from '../constants';

const initialState = {
  requests: [],
  meta: {},
  isFetchingRequest: false,
  isAddingGuestTag: false,
  isUpdatingRequest: false,
  errorUpdatingRequest: {}
};

const requestReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch (type) {
      case GET_REQUEST:
        return {
          ...state,
          isFetchingRequest: true
        }
      case GET_REQUEST_SUCCESS:
        return {
          ...state,
          requests: payload.requests,
          meta: payload.meta,
          isFetchingRequest: false
        }
      case GET_REQUEST_FAIL:
        return {
          ...state,
          errorFetchingGuest: payload,
          isFetchingGuest: false
        }

      case UPDATE_REQUEST:
        return {
          ...state,
          isUpdatingRequest: true
        }
      case UPDATE_REQUEST_SUCCESS:
        let requests = state.requests;
        const indexOfRequest = requests.findIndex(request => request.id === payload.request.id);
        if (requests[indexOfRequest]) {
          requests[indexOfRequest] = payload.request
        } else {
          requests = [...requests, payload]
        };
        return {
          ...state,
          requests,
          isUpdatingRequest: false
        }
      case UPDATE_REQUEST_FAIL:
        return {
          ...state,
          errorUpdatingRequest: payload,
          isUpdatingRequest: false
        }
     default:
      return state
    }
   }


export default requestReducer;