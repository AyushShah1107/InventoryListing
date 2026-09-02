import axios from "axios";

import {
  PRODUCTS_LOADING,
  GET_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  CANCEL_EDIT,
  UPDATED_PRODUCT,
  DELETE_PRODUCTS,
} from "../actions/types";
import { returnErrors } from "./errorActions";

const API_URL =
  process.env.REACT_APP_API_URL || "https://inventorylisting.onrender.com";
export const getProducts = () => (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });

  axios
    .get(`${API_URL}/api/products`, { withCredentials: true })
    .then((res) =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(returnErrors(err.message)));
};

export const addProduct = (newProduct) => (dispatch) => {
  axios
    .post(`${API_URL}/api/products/add`, newProduct, { withCredentials: true })
    .then((res) =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(returnErrors(err.message)));
};

export const editProduct = (product) => (dispatch) => {
  dispatch({
    type: EDIT_PRODUCT,
    payload: product,
  });
};

export const cancelEdit = () => (dispatch) => {
  dispatch({
    type: CANCEL_EDIT,
  });
};

export const updateProduct = (updatedProduct) => (dispatch) => {
  console.log(updateProduct);
  axios
    .post(
      `${API_URL}/api/products/update/${updatedProduct._id}`,
      updatedProduct,
      {
        withCredentials: true,
      }
    )
    .then((res) =>
      dispatch({
        type: UPDATED_PRODUCT,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(returnErrors(err.message)));
};

export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`${API_URL}/api/products/${id}`, { withCredentials: true })
    .then((res) =>
      dispatch({
        type: DELETE_PRODUCTS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch(returnErrors(err.message)));
};
