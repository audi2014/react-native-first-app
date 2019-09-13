import React from "react";
import {setProfileToken} from "../storage/profile";

const request = ({method, path, data, headers}) => fetch('http://smktesting.herokuapp.com' + path, {
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
  method: method,
  body: data ? JSON.stringify(data) : undefined,
})
  .then(r => r.json());


const handleSaveToken = async (r) => {
  if(r && r.success && r.token) {
    await setProfileToken(r.token);
  }
  return r;
};

export const login = ({username, password}) => request({
  method: 'POST',
  path: '/api/login/',
  data: {username, password}
})
  .then(handleSaveToken);
export const register = ({username, password}) => request({
  method: 'POST',
  path: '/api/register/',
  data: {username, password}
})
  .then(handleSaveToken);

export const fetchProducts = () => request({
  method: 'GET',
  path: '/api/products/'
});
export const fetchReviewsByProductId = (id) => request({
  method: 'GET',
  path: '/api/reviews/' + id
});
export const postReview = ({id, rate, text,token}) => request({
  method: 'POST',
  path: '/api/reviews/' + id,
  data: {rate, text},
  headers: {
    'Authorization': 'Token ' + token
  }
});

export const makeImageUrl = (fileName) => 'http://smktesting.herokuapp.com/static/' + fileName;