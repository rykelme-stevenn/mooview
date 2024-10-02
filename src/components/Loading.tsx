import React from 'react';
import LottieView from 'lottie-react-native';
import loading from './../../assets/lottie/loading.json'
import { View } from 'react-native';
import login from './../../assets/lottie/loading.json'

export const Loading = () => {
  return (
    <View style={{height: 300, aspectRatio: 1}}>
      <LottieView
        style={{flex: 1}}
        source={require('./../../assets/lottie/Loop Circular Dots.json')}
        autoPlay
        loop
      />
    </View>
  )
}