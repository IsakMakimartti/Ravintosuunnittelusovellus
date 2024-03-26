import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Mainmenu  from './components/Mainmenu'
import CalorieCalculator from './components/CalorieCalculator';

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Mainmenu/>*/}
      <CalorieCalculator/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    justifyContent: 'center',
  },
});
