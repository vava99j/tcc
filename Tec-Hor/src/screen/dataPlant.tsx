import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { styles } from '@/src/style/style';

export default function dataPlant(txtAM:string , hor:string) {

  return (
    <View>
      <Text>{txtAM}</Text> <Text>{hor}</Text>
    </View>
    
    
  );
}
