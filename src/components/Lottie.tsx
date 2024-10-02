import { Image } from "react-native"
import React from "react"

const RegisterLottie = () => {
  return (
    <Image
      source={require("./../../assets/sign-up-form.png")}
      style={{ width: 380, height: 380 }}
    />
  )
}

const LoginLottie = () => {
  return (
    <Image
      source={require("./../../assets/palm-recognition.png")}
      style={{ width: 330, height: 330 }}
    />
  )
}

export { RegisterLottie, LoginLottie }