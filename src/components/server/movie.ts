import {Merchants} from "../../serverUtils/merchants"
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getCategories() {
  return await Merchants.get('genre_get').then((res: any) => {
    if (res?.data?.length > 0) {
      return res
    }
    else {
      return null
    }
  }).catch((error: any) => {
    return null
  })
}

async function getOnlyCategories() {
  return await Merchants.get('only_genre_get').then((res: any) => {
    if (res?.data?.length > 0) {
      return res?.data
    }
    else {
      return null
    }
  }).catch((error: any) => {
    return null
  })
} 

async function requireMovie(data: any) {
   const authToken = `Token ${await AsyncStorage.getItem('Authorization')}`

  return await Merchants.post('movie_create/', data, {
    headers: {
      'Authorization': authToken
    }
  }).then((res: any) => {
    console.log('succes',res)
    if (res) {
      return res
    }
  }).catch((error: any) => {
    console.log('error',error)
    return null
  })
}

export { getCategories, getOnlyCategories, requireMovie }