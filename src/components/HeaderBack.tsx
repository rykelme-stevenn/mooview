import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';

export const HeaderBack = () => {

  const navigation = useNavigation<any>();

  return (
    <View className="w-full justify-center h-12 px-5">
      <TouchableOpacity
        onPress = {() => {
          navigation.goBack()
        }}
      >
        <Icon name='arrowleft' color={'white'} size={28} />
      </TouchableOpacity>
    </View>
  )
}