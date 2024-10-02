import { View, TextInput, Text } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useEffect } from "react"

interface IProp {
  placeholder: string;
  label: string;
  password?: boolean;
  error?: string;
  value?: string | number;
  onFocus?: () => void;
  onChangeText: (text: string) => void;
}

export const Input: React.FC<IProp> = ({ placeholder, label, password, onFocus, onChangeText, error, value }) => {

  useEffect(() => {
    console.log(value)
  }, [value])

  const handleFocus = () => {
    const dados = 'Este é o valor enviado';
    if (onFocus) {
      onFocus();
    }
  };

  return (
    <>
      <Text className="self-start text-white text-base py-2 mt-6">{label}</Text>
      <TextInput
        className="w-full rounded-lg p-4 text-lg text-white placeholder-white bg-gray focus:bg-subgrey "
        placeholder={placeholder}
        secureTextEntry={password}
        placeholderTextColor={'#C0C0C0'}
        onFocus={() => { handleFocus() }}
        onChangeText={(text) => onChangeText(text)}
        autoCorrect={false}
        value={value}
      />
      {
        error && (

          <View className="flex-row self-start justify-center items-center pt-1">
            {/* <Icon name='infocirlceo' color={'#dc3545'} size={11} /> */}
            <Text className="inline-block text-danger align-text-middle italic" > {error}</Text>
          </View>
        )
      }
    </>
  )
}