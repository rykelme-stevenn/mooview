import React from 'react';
import Routes from './src/routes';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './src/store/reducers/user';
import { CreateMovie } from './src/screens/CreateMovie';

export default function App() {
  return (
    <>
      <Provider store={store}>
        {/* <CreateMovie /> */}
        <Routes/>
      </Provider>
    </>
  );
}
