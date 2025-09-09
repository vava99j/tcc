import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  containerL: {
    flex: 1,
    
    backgroundColor: 'white'
  },
  scroll:{
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "green"
  },
  txt:{
    padding: 10,
    color: "black"
  },
  txtW:{
    color: "white"
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
   separatorL: {
    marginVertical: 20,
    height: 1,
    width: '10%',
  },
  input: {
    height: 40,
    width: "80%",
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