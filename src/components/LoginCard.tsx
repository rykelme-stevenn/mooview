import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';

export const LoginCard = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity className="w-full h-16 flex-row bg-subgrey p-2 rounded-lg absolute self-center bottom-6" onPress={() => navigation.navigate('Login')}>
      <View className="w-11/12">
        <Text className="text-white text-base font-semibold">Faça login para avaliar ou sugerir filmes</Text>
        <Text className="text-white/80 text-sm">Ou cadastre-se para ajudar o repositório</Text>
      </View>
      <View className="justify-center items-start w-1/12">
        <Icon name='right' color={'white'} size={22} />
      </View>
    </TouchableOpacity>
  )
}