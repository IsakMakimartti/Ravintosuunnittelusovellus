import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Searchpage from './components/Searchpage'
import Mainmenu  from './components/Mainmenu'
import Footer from './components/Footer'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
          name="Home"
          component={Mainmenu}
        />
      <Stack.Screen
          name="Search"
          component={Searchpage}
        />
      </Stack.Navigator>
         <Footer/>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
});
