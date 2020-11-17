import axios from "axios";
// let token = JSON.parse(localStorage.getItem("Token"))
// let config = {
//   headers: {
//     Authorization: `Bearer ${token}`
//   } 
// }

export const login = (userData) => {
 
  return axios.post("https://hungryherceg.api.veljko.dev/auth", userData)
}

export const register = (data) => {
  
  return axios.post("https://hungryherceg.api.veljko.dev/auth/register", data)
}

export const createRestourant = (data,token)=>{
 

  let config = {
    headers: {
      Authorization: token
    } 
  }

  return axios.post('https://hungryherceg.api.veljko.dev/restaurants',data,config)
}


export const updateRestourant = (restourantID,data,token)=>{
  // let data= {
  //   name:'Batajnicki Restoran',
  //   adress:'Pukovnika Milenka '
  // }
  let config = {
  headers: {
    Authorization: `Bearer ${token}`
  } 
}
  return axios.put(`https://hungryherceg.api.veljko.dev/restaurants/${restourantID}`,data,config)
}


export const getAllRestourants = (token)=>{
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    } 
  }
  
  return axios.get('https://hungryherceg.api.veljko.dev/restaurants',config)
}

// export const getOneRestourant = ()=>{

// }


//
export const getAllPolls = (token)=>{
  let config = {
    headers: {
      Authorization:`Bearer ${token}`
    }
  }
  return axios.get('https://hungryherceg.api.veljko.dev/polls',config)
}

export const createPoll = (token,data)=>{
  let config = {
    headers: {
      Authorization:`Bearer ${token}`
    }
  }
  return axios.post('https://hungryherceg.api.veljko.dev/polls',data,config)
}

export const createVote = (pollID,data)=>{

  return axios.post(`https://hungryherceg.api.veljko.dev/polls/${pollID}/vote`,data)
}

export const getOnePoll = (pollID)=>{
  return axios(`https://hungryherceg.api.veljko.dev/polls/${pollID}`)
}