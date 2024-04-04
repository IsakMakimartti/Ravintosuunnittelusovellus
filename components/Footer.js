
import { StyleSheet,Image, Pressable,KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Footer() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable style={styles.image} onPress={()=> navigation.navigate('Home')}>
      <Image style={styles.image} source={require('../assets/home-icon.png')} ></Image>
      </Pressable>
      <Pressable style={styles.image}>
      <Image style={styles.image} source={require('../assets/calculator-icon.png')}></Image>
      </Pressable>
      <Pressable style={styles.image} onPress={()=> navigation.navigate('Recipebuilder')}>
      <Image style={styles.image} source={require('../assets/plus-icon.png')}></Image>
      </Pressable>
      <Pressable style={styles.image}>
      <Image style={styles.image} source={require('../assets/caldendar-icon.png')}></Image>
      </Pressable>
      <Pressable style={styles.image} onPress={()=> navigation.navigate('Search')}>
      <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')}></Image>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width:60,
    height: 60,
  },
  container: {
  minHeight: 80,
  alignItems: "center",
  justifyContent: "flex-end",
  justifyContent: "space-between",
  flexDirection: "row",
  backgroundColor: "#c5ee7d",
  width: "100%"
  },
});
