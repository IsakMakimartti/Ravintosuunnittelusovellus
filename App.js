import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Searchbar from './components/Searchbar'
import Mainmenu  from './components/Mainmenu'
import Footer from './components/Footer'
export default function App() {
  return (
    <View style={styles.container}>
      <Mainmenu/>
      <Footer></Footer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
