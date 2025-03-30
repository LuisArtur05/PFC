import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';

import CreateAccount from './CreateAccount';
import styles from '../styles/SignStyle';
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
