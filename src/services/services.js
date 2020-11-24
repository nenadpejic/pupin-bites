import axios from "axios";

const baseUrl = "https://hungryherceg.api.veljko.dev";

const getToken = () => {
  const token = localStorage.getItem("Token");
  const data = { headers: { Authorization: `Bearer ${token}` } };
  return data
}

   //Authorization

export const login = (data) => {

  //Data example:
  // let data= {
  //   "username": "john@hungryherceg.com",
  //   "password": "123"
  // }

  return axios.post(`${baseUrl}/auth`, data)
};

export const register = (data) => {

  //Data example:
  // let data= {
  //   "email": "john@hungryherceg.com",
  //   "password": "123",
  //   "firstName": "John",
  //   "lastName": "Smith",
  // }

  return axios.post(`${baseUrl}/auth/register`, data)
};

export const getProfile = () => {

  return axios.get(`${baseUrl}/auth`, getToken())

};

// Restaurants

export const createRestaurant = (data) => {

  //Data example:
  //let data = {
  // "name": "Graficar",
  // "address": "Senjak BB"
  //}

  return axios.post(`${baseUrl}/restaurants`, data, getToken())
};

export const getManyRestaurants = (data) => {

  //Data example:
  //let data = {
  // "name": "" // za search po imenu
  //}

  return axios.put(`${baseUrl}/restaurants`, data, getToken())
};

export const updateRestaurant = (restaurantID, data) => {

  //Data example:
  //let data = {
  // "name": "Graficar",
  // "address": "Senjak BB"
  //}

  return axios.patch(`${baseUrl}/restaurants/${restaurantID}`, data, getToken())
};

export const getAllRestaurants = () => {

  return axios.get(`${baseUrl}/restaurants`, getToken())
};

export const getOneRestaurant = (restaurantID) => {

  return axios.get(`${baseUrl}/restaurants/${restaurantID}`, getToken())
};

// Restaurants => Meals

export const createMeal = (data, restaurantID) => {

  // Data example:
  // let data= {
  //   "name": "Pileci Burito",
  //   "price": 450,
  //   "available": true
  // }

  return axios.post(`${baseUrl}/restaurants/${restaurantID}/meals`, data, getToken())
};

export const getMeals = (restaurantID) => {

  return axios.get(`${baseUrl}/restaurants/${restaurantID}/meals`, getToken())
};

// Polls

export const getManyPolls = (data, numPerPage, pageNum) => {

  // Data example:
  // let data = {
  //  "active": true,
  //  "label": "Hello"
  // } 

  return axios.put(`${baseUrl}/polls?take=${numPerPage}&page=${pageNum}`, data, getToken())
};

export const getAllPolls = () => {

  return axios.get(`${baseUrl}/polls`, getToken())
};

export const createPoll = (data) => {

  // Data example:
  // let data = {
  //  "label": "Radna subota",
  //  "restaurants": ["7e922dbc-e77d-446d-b0ae-f7bbc23d59b1"]
  // }


  return axios.post(`${baseUrl}/polls`, data, getToken())
};

export const createVote = (pollID, data) => {

  // Data example:
  // let data = {
  //  "restaurantId": "7e922dbc-e77d-446d-b0ae-f7bbc23d59b1"
  // }

  return axios.post(`${baseUrl}/polls/${pollID}/vote`, data, getToken())
};

export const getOnePoll = (pollID) => {

  return axios.get(`${baseUrl}/polls/${pollID}`, getToken())
};

export const updatePoll = (pollID, data) => {

  // Data example:
  // let data = {
  //  "active": false 
  // }

  return axios.patch(`${baseUrl}/polls/${pollID}`, data, getToken())
};

// Orders

export const createOrder = (data) => {

  // Data example:
  // let data = {
  //  "restaurantId": "20ce30a6-fe28-4c75-a37a-5499851af079",
  //  "label": "radna subota order"
  // }

  return axios.post(`${baseUrl}/orders`, data, getToken())
};

export const getOneOrder = (orderID) => {

  return axios.get(`${baseUrl}/orders/${orderID}`, getToken())
};

export const getOrderItems = (orderID) => {

  return axios.get(`${baseUrl}/orders/${orderID}/items`, getToken())
};

export const addOrderItem = (data, orderID) => {

  // Data example:
  // let data = {
  //  "consumer": "Veljko",
  //  "payloads": [
  //    {
  //      "quantity": 1,
  //      "mealId": "d53e202a-317c-4bad-99d5-1b7a446f9e26",
  //      "note": "bez luka" 
  //    }
  //   ]
  // }

  return axios.post(`${baseUrl}/orders/${orderID}/items`, data, getToken())
};

export const updateOrder = (data, orderID) => {

  // Data example:
  // let data = {
  //  "active": true,
  //  "label": "Radna Nedelja"
  // }

  return axios.patch(`${baseUrl}/orders/${orderID}`, data, getToken())
};

export const getManyOrders = (data, numPerPage, pageNum) => {

  // Data example:
  // let data = 
  //  {
  //    "active": true
  //  } 

  return axios.put(`${baseUrl}/orders?take=${numPerPage}&page=${pageNum}`, data, getToken())
};

export const getAllOrders = () => {

  return axios.get(`${baseUrl}/orders`, getToken())
};

// Delete requests

export const deleteMeal = (restaurantID, mealID) => {

  return axios.delete(`${baseUrl}/restaurants/${restaurantID}/meals/${mealID}`, getToken())
};

export const deleteRestaurant = (restaurantID) => {

  return axios.delete(`${baseUrl}/restaurants/${restaurantID}`, getToken())
};

const getApiKey = ()=>{
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "5f63daa75313511c55fc97b7",
    }
  };
  return config
}


export const postCheckData = (checkData) => {

  // Data example:
  // {
  // email:"email@something.com",
  // poll:'PollId',
  // date:"22.11.2020"
  //}
 let data = JSON.stringify(checkData)

return axios.post('https://gamestorage-9cd1.restdb.io/rest/pupinbites',data,getApiKey());
};

export const getCheckData = ()=>{
  return axios.get('https://gamestorage-9cd1.restdb.io/rest/pupinbites',getApiKey());
}
