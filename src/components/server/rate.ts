import AsyncStorage from "@react-native-async-storage/async-storage";
import { Merchants} from "../../serverUtils/merchants";
import { IRating, IRatingEdit } from "../types/rating";

async function getRating(movieId: number, userId: number | undefined) {
  const authToken = `Token ${await AsyncStorage.getItem('Authorization')}`

  console.log(authToken)

  return await Merchants.get(`rating_get/?user=${userId}&movie=${movieId}`, {
    headers: {
      'Authorization': authToken
    }
  }).then((response) => {
    return (response.data)
  }).catch((error) => {
    console.log('error', error)
  })
}

async function postRating(data: IRating) {
  const authToken = `Token ${await AsyncStorage.getItem('Authorization')}`

  return await Merchants.post(`rate/`, data,{
    headers: {
      'Authorization': authToken
    }
  }).then((response) => {
    console.log(response)
    return (response.data)
  }).catch((error) => {
    console.log('error', error)
  })
}

async function putRating(data: IRatingEdit, movieId: number, user: number) {
  const authToken = `Token ${await AsyncStorage.getItem('Authorization')}`

  return await Merchants.put(`rate/?movie=${movieId}&user=${user}`, data,{
    headers: {
      'Authorization': authToken
    }
  }).then((response) => {
    console.log(response)
    return (response.data)
  }).catch((error) => {
    console.log('error', error)
  })
}


export { getRating, postRating, putRating }