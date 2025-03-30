import { StyleSheet } from 'react-native';

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
  
  export default styles;