import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  scroll:{
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "green"
  },
  txt:{
    padding: 10
  },
  planta: {
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: 'bold',
    color: "green",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    height: "80%",
    width: "98%",
    alignItems: 'center',
    
  },
  
   dataPlanta: {
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: 'bold',
    color: "green",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    
  },
  button:{
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'bold',
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
   button2:{
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'bold',
    color: 'green',
    borderColor:'green',
    borderWidth: 1,
    fontSize: 15,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 35,
    width: "80%",
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "green",
    
  },
  image: {
     width: '100%', 
     height: 200, 
     resizeMode: 'cover',
      borderRadius: 8
     },
  loader: { 
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'center' 
    },

});