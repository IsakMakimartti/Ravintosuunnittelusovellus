import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
export default function Footer() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')}></Image>
      <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')}></Image>
      <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')}></Image>
      <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')}></Image>
      <Image style={styles.image} source={require('../assets/magnifying-glass-16.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width:60,
    height: 60,
    flexBasis: "20%"
  },
  container: {
  flexDirection: "row",
  backgroundColor: "#ccc",
  width: "100%"
  },
});
