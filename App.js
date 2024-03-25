import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Searchbar from './components/Searchpage'
import Mainmenu  from './components/Mainmenu'
export default function App() {
  return (
    <View style={styles.container}>
      <Mainmenu/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
