import { StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

export function useThemedStyles() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor:  Colors[theme].background,
    },

    containerL: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },

    scroll: {
      flex: 1,
      backgroundColor:  Colors[theme].background,
      width: "100%",
    },

    title: {
      fontSize: 35,
      fontWeight: "bold",
      color: "green",
    },

    title2: {
      fontSize: 15,
      fontWeight: "bold",
      color: "green",
    },

    txt: {
      flexWrap: 'wrap',
      paddingHorizontal: 10,
      color:  Colors[theme].text,
    },
    txtg: {
      color: "green",
    },
    planta: {
      backgroundColor: Colors[theme].background,
      fontSize: 20,
      fontWeight: "bold",
      color: "green",
      borderColor: "green",
      borderWidth: 1,
      borderRadius: 10,
      height: "80%",
      width: "98%",
      alignItems: "center",
    },

    dataPlanta: {
      backgroundColor:  Colors[theme].background,
      fontSize: 20,
      fontWeight: "bold",
      color: "green",
      borderColor: "green",
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
    },

    dataPlanta1: {
      backgroundColor: Colors[theme].background,
      fontSize: 20,
      fontWeight: "bold",
      color: "green",
      borderColor: "green",
      borderWidth: 1,
      borderRadius: 10,
      alignItems: "center",
      padding: 10,
    },

    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },

    separatorL: {
      marginVertical: 20,
      height: 1,
      width: "10%",
    },

    input: {
      height: 40,
      width: "80%",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "green",
    },

    image: {
      width: "100%",
      height: 200,
      resizeMode: "cover",
      borderRadius: 8,
    },

    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      color:  Colors[theme].text,
    },
  });
}
