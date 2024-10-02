import React, { useEffect, useRef, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { Input } from "../components/Input"
import { RegisterLottie } from "../components/Lottie"
import { PrimaryButton } from "../components/PrimaryButton"
import { HeaderBack } from "../components/HeaderBack"
import { SafeAreaView } from "react-native-safe-area-context"
import { useForm, Controller } from 'react-hook-form'
import { getUser, login, registerUser } from "../components/server/user"
import { LoginType, RegisterType } from "../components/types/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../store/reducers/user"
import { useNavigation } from "@react-navigation/native"
import { RootState } from "../store"

export const Register = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const [loading, setLoading] = useState(false)
  const scrollViewRef = useRef();
  const { control, register, handleSubmit, formState: { errors }, setError, getValues } = useForm<RegisterType>();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  // useEffect(() => {
  //   if (!user?.id) {
  //     userGet()
  //   }
  // }, [AsyncStorage.getItem('Authorization')])

  useEffect(() => {
    const interval = setInterval(async () => {
      let auth = await AsyncStorage.getItem('Authorization')
      if (!user?.id && auth) {
        userGet()
      }
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  function scrollAutomatic() {
    if (scrollViewRef?.current) {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }
  }

  async function handleLogin(data: RegisterType) {
    setLoading(true)
    const dataLogin = {
      email: data.email,
      password: data.password1
    }
    await login(dataLogin).then((res: any) => {
      if (res?.data?.key) {
        AsyncStorage.setItem('Authorization', res?.data?.key)
      }
    }).catch((error: any) => {
      console.log('Error login: ', error.message)
      setError('email', { type: 'manual', message: 'E-mail ou senha inválidos' });
    }).finally(() => setLoading(false))
  }

  async function handleRegister(data: RegisterType) {
    setLoading(true)
    await registerUser(data).then((res: any) => {
      setTimeout(() => {
        handleLogin(data)
      }, 2000)
    }).catch((error: any) => {
      console.log('Error login: ', error.message)
      setError('email', { type: 'manual', message: 'E-mail ou senha inválidos' });
    }).finally(() => setLoading(false))
    console.log(data)
  }

  const userGet = async () => {
    const email = getValues().email
    if (email) {
      const userConfig: any = await getUser(email)

      console.log('aqui', userConfig)
      if(userConfig?.id){
        dispatch(setUser({ user: userConfig }))
        navigation.navigate('Home')
      }
    }

  }

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <HeaderBack />
        <View className="h-full items-center justify-center px-6 pt-8 pb-8">
          {/* <ScrollView className="w-full bg-blue"> */}
          <Text className="text-white text-2xl self-start font-bold">Cadastre-se agora e veja e insira filmes gratuitamente</Text>
          <RegisterLottie />
          <Controller
            control={control}
            name="username"
            rules={{
              required: 'Informe o username'
            }}
            render={({ field: { onChange, value } }) => <Input placeholder="Digite seu username"
              label="Username"
              onFocus={scrollAutomatic}
              onChangeText={onChange}
              value={value}
              error={errors?.username?.message} />}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Informe o e-mail',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido"
              }
            }}
            render={({ field: { onChange, value } }) => <Input placeholder="seu.email@email.com.br" label="E-mail" onChangeText={onChange} value={value} error={errors?.email?.message} onFocus={scrollAutomatic} />}
          />


          <Controller
            control={control}
            name="password1"
            rules={{
              required: 'Informe a senha',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                message: "A senha deve ter: \n - Pelo menos 8 caracteres \n - Incluir letras maiúsculas \n - Minúsculas e números \n - Caracter especial(*, /, +, etc.) "
              }
            }}
            render={({ field: { onChange, value } }) => <Input placeholder="********"
              label="Senha"
              password={true}
              onFocus={scrollAutomatic}
              onChangeText={onChange}
              value={value}
              error={errors?.password1?.message} />}
          />

          <Controller
            control={control}
            name="password2"
            rules={{
              required: 'Confirme a senha',
              validate: (value) => value === getValues('password1') || 'As senhas não coincidem'
            }}
            render={({ field: { onChange, value } }) => <Input placeholder="********"
              label="Confirme a senha"
              password={true}
              onFocus={scrollAutomatic}
              onChangeText={onChange}
              value={value}
              error={errors?.password2?.message} />}
          />


          {/* <Input placeholder="********" label="Senha" password={true} onFocus={scrollAutomatic} /> */}
          {/* <Input placeholder="********" label="Repita sua senha" password={true} onFocus={scrollAutomatic} /> */}
          <View className="w-full mt-10">
            <PrimaryButton text="Entrar" click={handleSubmit(handleRegister)} loading={loading} />
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}