import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importaciones corregidas (usa solo UNA versión)
import Sign from './src/screens/Sign'; // <-- Elige esta O la siguiente, no ambas
// import Sign from './src/Sign';      // <-- Comenta o elimina esta línea

import CreateAccount from './src/screens/CreateAccount';
import Home from './src/screens/Home';
import Recipes from './src/screens/Recipes';
import ShoppingList from './src/screens/ShoppingList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Configuración del menú inferior
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Nevera" 
        component={Home} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Listas Compra" 
        component={ShoppingList} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Recetas" 
        component={Recipes} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Sign'>
        {/* Pantallas de autenticación */}
        <Stack.Screen 
          name='Sign' 
          component={Sign}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='CreateAccount' 
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        
        {/* Pantalla principal con tabs */}
        <Stack.Screen 
          name='MainApp' 
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}