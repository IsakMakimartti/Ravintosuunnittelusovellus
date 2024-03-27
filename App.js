import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Searchpage from './components/Searchpage'
import Mainmenu  from './components/Mainmenu'
import RecipePage  from './components/RecipePage'
import Footer from './components/Footer'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
    <Stack.Navigator 
      screenOptions={{
        headerTintColor: 'black',
        headerStyle: {backgroundColor: '#c5ee7d'},
        headerTitleAlign: 'center',
        title: "RSS",
      }}
    >
    <Stack.Screen
          name="Home"
          component={Mainmenu}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipePage}
          options={({ route }) => ({
            title: "Recipe", 
            headerTitle: route.RecipePage, 
          })}
          />
      <Stack.Screen
          name="Search"
          component={Searchpage}
          options={({ route }) => ({
            title: "Search", 
            headerTitle: route.Searchpage, 
          })}
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
  header: {
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#74ff00',
  },
});
