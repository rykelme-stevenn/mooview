import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolateColor, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import { LogoMini } from './Logo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface IProps {
  progress: number
}

export const Heading: React.FC<IProps> = ({ progress }) => {
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.user.user)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress,
        [0, 1],
        ['#932192', 'black'],

      ),
      opacity: withTiming(progress === 0 ? 1 : 0.5, { duration: 500 }),

    }
  });

  return (
    <Animated.View style={[animatedStyle]} className="w-full items-end justify-between flex-row h-24 px-4 ">
      <LogoMini />
      <View className="items-center py-5 flex-row justify-center">
        <TouchableOpacity className="mr-5">
          <Icon name='search' color={'white'} size={22} />
        </TouchableOpacity>
        {
          !user?.id ? (
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
              <Icon name='user-circle' color={'white'} size={34} />
            </TouchableOpacity>
          ) : (
            <View className="bg-subgrey p-2 rounded-lg" onTouchEnd={() => navigation.navigate('CreateMovie')}>
              <Text className="text-white font-semibold">{user?.username}</Text>
            </View>
          )
        }
      </View>
    </Animated.View>
  )
}