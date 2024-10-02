import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import { Category } from '../components/Category';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setUser } from '../store/reducers/user';
import { RootState } from '../store';

export const Home = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user?.id){
      initialize()
    }
  })
  
  async function initialize(){
    const userCache: any = await AsyncStorage.getItem('User')
    console.log(userCache)
    if(userCache?.id){
      dispatch(setUser({user: userCache}))
    }
  }

  return (
    <>
      <View >
        <Category />
      </View>
    </>
  )
} 