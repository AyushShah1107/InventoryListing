import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

const API_URL =
  process.env.REACT_APP_API_URL || "https://inventorylisting.onrender.com";

export const loadUser = () => (dispatch) => {
  dispatch({ type: USER_LOADING });

  axios
    .get(`${API_URL}/api/users/user`, { withCredentials: true })
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.message));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login =
  ({ email, password }) =>
  (dispatch) => {
    axios
      .post(
        `${API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.message));
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const logout = () => (dispatch) => {
  axios
    .post(`${API_URL}/api/users/logout`, {}, { withCredentials: true })
    .then(() =>
      dispatch({
        type: LOGOUT_SUCCESS,
      })
    );
};

export const register =
  ({ username, email, password }) =>
  (dispatch) => {
    axios
      .post(
        `${API_URL}/api/users/register`,
        { username, email, password },
        { withCredentials: true }
      )
      .then((res) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.message));
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };
