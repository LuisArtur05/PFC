import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import Sign from './src/Sign';
import CreateAccount from './src/CreateAccount';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Sign}
          options={{ headerShown: false }}//Oculta el encabezado
        />
        <Stack.Screen name="CreateAccount" component={CreateAccount}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

