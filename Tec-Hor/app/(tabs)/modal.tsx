import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View , ScrollView } from 'react-native';
import { styles } from '@/src/style/style';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scroll}>
      <Text style={styles.title}> Instrução </Text>
        <Text style={styles.txt}>
	{'\n'}1.	Abra a câmera nativa do seu celular e tire uma fotografia da planta que deseja monitorar.
	{'\n'}2.	Em seguida, acesse o aplicativo Tec-Hor e entre na aba Uploader.
	{'\n'}3.	Toque no botão “Escolher Imagem” e selecione a foto tirada da planta.
	{'\n'}4.	Conecte o seu celular à entrada USB do sistema Tec-Hor.
	{'\n'}5.	Pronto! Sua estufa estará automatizada e os dados coletados auxiliarão no controle inteligente das plantas.</Text>

<View style={styles.separator}/>

<Text style={styles.title}> Sobre o TH </Text>
  <Text style={styles.txt}>
    {'\n'}O presente trabalho apresenta o Tec-Hor, um sistema voltado para o controle
    inteligente de uma horta estufa. O projeto tem como principal 
    objetivo inserir o desenvolvimento de sistemas na área verde, promovendo uma conexão entre 
    a tecnologia e o cultivo sustentável de plantas. Dessa forma, busca-se responder à 
    problemática “como a tecnologia pode auxiliar no cultivo de plantas”, oferecendo uma
     alternativa acessível e eficiente para aqueles 
    que desejam cultivar, mas não possuem amplo conhecimento técnico ou disponibilidade de 
    tempo para acompanhar todos os cuidados necessários.
    {'\n'}{'\n'}
    O Tec-Hor surge, portanto, como uma ferramenta de incentivo ao cultivo, simplificando 
    processos que antes demandavam maior dedicação e experiência. A automatização de funções 
    básicas da estufa garante praticidade e segurança ao usuário, tornando a atividade mais 
    atrativa e viável para diferentes perfis de pessoas, desde entusiastas iniciantes até 
    indivíduos que buscam apenas um contato mais próximo com a natureza no dia a dia.
</Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
    </View>
  );
}


