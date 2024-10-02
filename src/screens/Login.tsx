import React, { useEffect, useRef, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { Input } from "../components/Input"
import { PrimaryButton } from "../components/PrimaryButton"
import { SecondaryButton } from "../components/SecondaryButton"
import { HeaderBack } from "../components/HeaderBack"
import { SafeAreaView } from "react-native-safe-area-context"
import { LoginLottie } from "../components/Lottie"
import { useForm, Controller } from 'react-hook-form'
import { getUser, login } from "../components/server/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { setUser } from "../store/reducers/user"

type FormType = {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors }, setError, getValues } = useForm<FormType>();
  const [loading, setLoading] = useState(false)
  const scrollViewRef = useRef();
  const navigation = useNavigation<any>();

  useEffect(() => {
    user()
  }, [AsyncStorage.getItem('Authorization')])

  async function handleLogin(data: FormType) {
    setLoading(true)
    await login(data).then((res: any) => {
      console.log('res',res)
      if (res?.data?.key) {
        AsyncStorage.setItem('Authorization', res?.data?.key)
      }
    }).catch((error: any) => {
      console.log('Error login: ', error.message)
      setError('email', { type: 'manual', message: 'E-mail ou senha inválidos' });
    }).finally(() => setLoading(false))
  }

  const user = async () => {
    const email = getValues().email
    if(email){
      const userConfig: any = await getUser(email)

      console.log('aqui', userConfig)
      if(userConfig?.id){
        dispatch(setUser({ user: userConfig }))
        navigation.navigate('Home')
      }
      else{
        setError('email', { type: 'manual', message: 'Não foi possível fazer o login' });
      }
    }

  }

  function scrollAutomatic() {
    if (scrollViewRef?.current) {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }
  }

  // async function setUser(){
  //   const userConfig = await AsyncStorage.getItem('User').finally(() => {
  //     if(userConfig?.id){
  //     }
  //   })
  // }


  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        <HeaderBack />
        <View className="items-center px-4">
          <LoginLottie />
          <View className="items-start w-full">
            <Text className="text-white text-3xl font-bold mb-4">Login</Text>
            <Text className="text-white text-xl font-bold">Use o seu e-mail para logar em sua conta</Text>
          </View>

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Informe o e-mail cadastrado',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido"
              }
            }}
            render={({ field: { onChange, value } }) => <Input placeholder="seu.email@email.com.br" label="E-mail" onChangeText={onChange} value={value} error={errors?.email?.message} onFocus={scrollAutomatic} />}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Informe a senha cadastrado'
            }}
            render={({ field: { onChange, value } }) => <Input placeholder="********" label="Senha" password={true} onChangeText={onChange} value={value} error={errors?.password?.message} onFocus={scrollAutomatic} />}
          />
          {/* <TouchableOpacity className="w-full mt-2">
            <Text className="text-white text-sm">Esqueci minha senha ?</Text>
          </TouchableOpacity> */}

          <View className="w-full mt-10 mb-8">
            <PrimaryButton text="Entrar" click={handleSubmit(handleLogin)} loading={loading} />
            <View className="w-full justify-center items-center h-10 my-2">
              <Text className="text-white text-base">Ou</Text>
            </View>
            <SecondaryButton text="Cadastrar-se" click={() => navigation.navigate('Register')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}