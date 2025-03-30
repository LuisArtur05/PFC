import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from '../styles/CreateAccountStyle';

export default function CreateAccount({ navigation })  {
  
  return (

    <View style={styles.container}>
      <Text style={styles.titulo}>Create Account</Text>
      
      <Text>{"\n"}</Text>
      <Text style={styles.subTitle}>Username:</Text>
      <TextInput style={styles.textInput} ></TextInput>

      <Text>{"\n"}</Text>
      <Text style={styles.subTitle}>Email:</Text>
      <TextInput style={styles.textInput}></TextInput>

      <Text>{"\n"}</Text>
      <Text style={styles.subTitle}>Password:</Text>
      <TextInput style={styles.textInput} secureTextEntry={true} ></TextInput>

      <Text>{"\n"}</Text>
      <Text style={styles.subTitle}>Confirm Password:</Text>
      <TextInput style={styles.textInput} secureTextEntry={true} ></TextInput>
      <Text>{"\n"}</Text>
      <ButtonGradient></ButtonGradient>
      
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
        <Text style={styles.textButton}>Create</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
