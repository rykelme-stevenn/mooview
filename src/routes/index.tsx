import { NavigationContainer, TabActions, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { StackRoutes } from "./stack.routes";
import { View } from 'react-native';


export default function Routes() {

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#141414',
    },
  };

  return (
    // <View className="bg-black h-full">
      <NavigationContainer theme={navTheme}>
        <StackRoutes />
      </NavigationContainer>
    // </View>
  )
}