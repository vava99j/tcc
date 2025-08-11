import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { styles } from '@/style/style';
import { buscarCuidadosGemini } from '@/api/gemini';

export default function dataPlant() {
  return (
    
      buscarCuidadosGemini('Eucalyptus globulus')
    
    
  );
}
