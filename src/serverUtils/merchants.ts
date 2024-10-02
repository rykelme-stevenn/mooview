import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const token = auth()
console.log(token)
const MerchantsToken = axios.create({
    baseURL: 'https://mooview.vercel.app/api/'
    // headers: {
        
    //     'Authorization': token ? `Token ${token}` : undefined
    // }
})

const Merchants = axios.create({
    baseURL: 'https://mooview.vercel.app/api/'
})

async function auth() {
    return (await AsyncStorage.getItem('Authorization'))
}
export {MerchantsToken, Merchants}