import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';

import CreateAccount from './CreateAccount';

export default function Sign({ navigation })  {
  
  return (

    <View style={styles.container}>
      <Text style={styles.titulo}>Hello</Text>
      <Text style={styles.subTitle}>Sign In to your account</Text>
      <TextInput style={styles.textInput} placeholder='xxxx@email.com'></TextInput>
      <TextInput style={styles.textInput} placeholder='password'
      secureTextEntry={true}></TextInput>
      
      <ButtonGradient></ButtonGradient>
      <ButtonGradient2 navigation={navigation}></ButtonGradient2>
      <StatusBar style="auto" />

    </View>
  );
}

function ButtonGradient() {
  return (
    <TouchableOpacity style={styles.ContainerButton}>
      <LinearGradient
        colors={['#FFA500', '#FF4500']} // Degradado de rojo a naranja
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.textButton}>Sign up</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
function ButtonGradient2({ navigation }) {
 
  return (
    <TouchableOpacity style={styles.ContainerButton} onPress={() => navigation.navigate('CreateAccount')} >
      <LinearGradient
        colors={['#FF4500', '#FF4500']} 
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.textButton}>Create Account</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen   name="CreateAccount"component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  titulo: {
    fontSize: 50,
    color: '#000',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 30,
    color: 'gray'
  },
  textInput: {
    borderWidth: 1,//Poner un borde
    borderColor: 'gray',
    padding: 10,
    paddingStart: 15,//Inicio de las palabras en la celda
    width: '80%',
    marginTop: 20,//Espacio entre bloques
    borderRadius: 30
  },


  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ContainerButton: {

    alignItems: 'center',
    width: 200,
    marginTop: 20


  }
});
