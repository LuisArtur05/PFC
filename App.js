import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider,useSQLiteContext } from 'expo-sqlite';
import Sign from './src/Sign';
import CreateAccount from './src/CreateAccount';

const initializeDatabase = async(db) => {
  try{
     await db.execAsync(`PRAGMA journal_mode =WAL;
      CREATE TABLE IF NOT EXISTS users 
      (id INTERGER PRIMARY KEY AUTOINCREMENT ,
      username TEXT,
      password TEXT);`);
      console.log('Database initialized')
      }catch(e){
          console.log('Error initializing the database : ',e);
  }
  
};
const Stack = createNativeStackNavigator(); 
export default function App() {
  return (
    <SQLiteProvider databaseName='AppUssers' onInit={initializeDatabase}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Sign} 
          options={{ headerShown: false }}//Oculta el encabezado
          />
          <Stack.Screen name="CreateAccount" component={CreateAccount}
          options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}

