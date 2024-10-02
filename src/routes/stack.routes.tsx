import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { OpenedMovie } from '../screens/OpenedMovie';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { CreateMovie } from '../screens/CreateMovie';

const Stack = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS 
    }}
    >
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown: false}} name="Movie" component={OpenedMovie} />
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
      <Stack.Screen options={{headerShown: false}} name="CreateMovie" component={CreateMovie} />
    </Stack.Navigator>
  )
}