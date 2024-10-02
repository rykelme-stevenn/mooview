import AsyncStorage from "@react-native-async-storage/async-storage";
import { Merchants, MerchantsToken } from "../../serverUtils/merchants";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/user";
import { RegisterType } from "../types/user";

type LoginType = {
    email: string;
    password: string;
}


async function login(data: LoginType) {
  console.log(data, Merchants)
  return await Merchants.post('account/login/', data)
}

async function registerUser(data: RegisterType) {
  console.log(data, Merchants)
  return await Merchants.post('account/registration/', data)
}

async function getUser(data: string) {

  const authToken = `Token ${await AsyncStorage.getItem('Authorization')}`
  return await Merchants.get(`user_get/?email=${data}`, {
    headers: {
      'Authorization': authToken
    }
  }).then((response) => {
    AsyncStorage.setItem('User', response.data)
    return (response.data)
  }).catch((error) => {
    console.log('error',error, data)
    // AsyncStorage.removeItem('Authorization')
  })
}

export { login, getUser, registerUser }