
import { StyleSheet,Image, Pressable,KeyboardAvoidingView, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Footer() {
  const navigation = useNavigation();
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable style={({pressed}) => ({opacity: pressed ? 0.5 : 1})} onPress={()=> navigation.navigate('Home')}>
      <Image style={styles.image} source={require('../assets/home-icon.png')} ></Image>
      </Pressable>
      <Pressable style={({pressed}) => ({opacity: pressed ? 0.5 : 1})} onPress={()=> navigation.navigate('Calculator')}> 
      <Image style={styles.image} source={require('../assets/calculator-icon.png')}></Image>
      </Pressable>
      <View style={{ borderRadius: 25,borderColor: "#c5ee7d", backgroundColor: "#c5ee7d",borderWidth: 7, }}>
      <Pressable style={({pressed}) => ({opacity: pressed ? 0.5 : 1})} onPress={()=> navigation.navigate('Recipebuilder')}>
      <Image style={styles.buidlerimage} source={require('../assets/plus-icon.png')}></Image>
      </Pressable>
      </View>
      <Pressable style={({pressed}) => ({opacity: pressed ? 0.5 : 1})} onPress={()=> navigation.navigate('Calendar')}>
      <Image style={styles.image} source={require('../assets/caldendar-icon.png')}></Image>
      </Pressable>
      <Pressable style={({pressed}) => ({opacity: pressed ? 0.5 : 1})} onPress={()=> navigation.navigate('Search')}>
      <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')}></Image>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width:55,
    height: 55,
  },
  buidlerimage:{
    width: 65,
    height: 65,
    alignSelf: "center"
  },
  builder: {
    width: 55,
    height: 55,
    marginBottom: 40,
    backgroundColor: "#c5ee7d",
  },
  container: {
  maxHeight: 80,
  alignItems: "center",
  justifyContent: "flex-end",
  justifyContent: "space-between",
  flexDirection: "row",
  backgroundColor: "#c5ee7d",
  width: "100%"
  },
});
