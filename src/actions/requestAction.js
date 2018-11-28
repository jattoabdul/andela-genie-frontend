import toastr from 'toastr';
import {
    GET_REQUEST,
    GET_REQUEST_SUCCESS,
    GET_REQUEST_FAIL,
    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_FAIL } from '../constants';


export const setSelectedStatus = (status = 'All') => (dispatch) => {
    localStorage.setItem('status', status);
}

export function getRequest() {
    return {
      type: GET_REQUEST
    };
}

export function getRequestSuccess(requests) {
    return {
        type: GET_REQUEST_SUCCESS,
        payload: requests
    };
}

export function getRequestFail(errorFetchingRequests) {
    return {
        type: GET_REQUEST_FAIL,
        payload: errorFetchingRequests
    };
}

export const fetchAllRequests = () => async(dispatch, getState, { client }) => {
    dispatch(getRequest());
    try {
        const response = await client.get('/');
        dispatch(getRequestSuccess(response.data.payload));
      } catch (error) {
        dispatch(getRequestFail(error));
      }
}

export function updateRequest() {
    return {
      type: UPDATE_REQUEST
    };
  }

export function updateRequestSuccess(request) {
    return {
        type: UPDATE_REQUEST_SUCCESS,
        payload: request
    };
}

export function updateRequestFail(errorAddingRequest) {
    return {
        type: UPDATE_REQUEST_FAIL,
        payload: errorAddingRequest
    };
}


export const handleUpdateRequest = (requestId, status, requestMsg) => async(dispatch, getState, { client }) => {
    dispatch(updateRequest());
    const data = {
      status: parseInt(status, 10),
      msg: requestMsg
    };

    try {
        const response = await client.put(`/${requestId}/`, data);
        if (response.status === 200) {
          toastr.success('Request updated successfully!');
          dispatch(updateRequestSuccess(response.data.payload));
        }
    } catch (error) {
        toastr.error('Request updated failed');
        dispatch(updateRequestFail(error));
      }
}